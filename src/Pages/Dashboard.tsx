import React from "react"
import { useState, useEffect } from "react"
import { Plus, Search, Edit3, Trash2, Save, X, FileText, Calendar } from "lucide-react"
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import LoadingButton, { SaveButton } from '../Utils/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface Note {
  id?: string;
  _id?: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

const NotesSection = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newNote, setNewNote] = useState({ title: "", content: "", tags: [] as string[] }) // Added tags to newNote
  const [tagInput, setTagInput] = useState("") // State for tag input
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const { token } = useAuth();

  // Load notes from backend on mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('https://notes-app-server-un2c.onrender.com/notes', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        const backendNotes = res.data.notes.map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt),
          tags: note.tags || [],
        }));
        setNotes(backendNotes);
      } catch (err: any) {
        setNotes([]);
      }
    };
    if (token) fetchNotes();
  }, [token]);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  const createNote = async () => {
    if (newNote.title.trim() || newNote.content.trim()) {
      setSaving(true);
      try {
        const res = await axios.post('https://notes-app-server-un2c.onrender.com/notes', {
          title: newNote.title || 'Untitled',
          content: newNote.content,
          tags: newNote.tags,
        }, {
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        const note = res.data.note;
        setNotes([{
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt),
        }, ...notes]);
        setNewNote({ title: '', content: '', tags: [] });
        setTagInput('');
        setIsCreating(false);
      } catch (err: any) {
        alert(err.response?.data?.message || 'Failed to add note');
      } finally {
        setSaving(false);
      }
    }
  };

  const updateNote = async (id: string, title: string, content: string) => {
    setEditLoading(true);
    try {
      const res = await axios.put(`https://notes-app-server-un2c.onrender.com/notes/${id}`, {
        title,
        content,
      }, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      const updatedNote = res.data.note;
      setNotes(notes.map((note) =>
        note.id === id || note._id === id
          ? { ...note, ...updatedNote, updatedAt: new Date(updatedNote.updatedAt) }
          : note
      ));
      setEditingId(null);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update note');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    setDeleteLoading(true);
    try {
      await axios.delete(`https://notes-app-server-un2c.onrender.com/notes/${deletingId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setNotes(notes.filter((note) => note.id !== deletingId && note._id !== deletingId));
      setDeletingId(null);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete note');
    } finally {
      setDeleteLoading(false);
    }
  };

  const cancelDelete = () => setDeletingId(null);

  // Add tag to newNote
  const addTag = () => {
    const tag = tagInput.trim()
    if (tag && !newNote.tags.includes(tag)) {
      setNewNote({ ...newNote, tags: [...newNote.tags, tag] })
    }
    setTagInput("")
  }

  // Remove tag from newNote
  const removeTag = (tagToRemove: string) => {
    setNewNote({ ...newNote, tags: newNote.tags.filter((tag) => tag !== tagToRemove) })
  }

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-3xl shadow-2xl overflow-hidden mb-6">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">My Notes</h1>
                <p className="text-white/70">
                  {notes.length} {notes.length === 1 ? "note" : "notes"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-2xl border border-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2 group"
            >
              <Plus size={20} className="group-hover:rotate-90 transition-transform duration-200" />
              <span>New Note</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 z-10">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search notes..."
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Create Note Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-3xl shadow-2xl w-full max-w-2xl">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Create New Note</h2>
                <button
                  onClick={() => {
                    setIsCreating(false)
                    setNewNote({ title: "", content: "", tags: [] })
                    setTagInput("")
                  }}
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  placeholder="Note title..."
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                />
                <textarea
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  placeholder="Write your note here..."
                  rows={8}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 resize-none"
                />
                {/* Tags Input */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addTag()
                        }
                      }}
                      placeholder="Add a tag and press Enter"
                      className="flex-1 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-3 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl border border-white/20 transition-all duration-300"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {newNote.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white/20 text-white px-3 py-1 rounded-xl flex items-center space-x-1 text-sm"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-white/70 hover:text-white"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => {
                    setIsCreating(false)
                    setNewNote({ title: '', content: '', tags: [] })
                    setTagInput('')
                  }}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 transition-all duration-300"
                >
                  Cancel
                </button>
                <SaveButton
                  loading={saving}
                  onClick={createNote}
                >
                  <Save size={18} />
                  <span className="ml-2">Save Note</span>
                </SaveButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.length === 0 ? (
          <div className="col-span-full">
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-3xl shadow-2xl p-12 text-center">
              <FileText className="h-16 w-16 text-white/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {searchTerm ? "No notes found" : "No notes yet"}
              </h3>
              <p className="text-white/70">
                {searchTerm ? "Try adjusting your search terms" : "Create your first note to get started"}
              </p>
            </div>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <NoteCard
              key={note._id || note.id}
              note={note}
              isEditing={editingId === (note._id || note.id)}
              onEdit={() => setEditingId(note._id || note.id || null)}
              onSave={(title, content) => updateNote(note._id || note.id || '', title, content)}
              onCancel={() => setEditingId(null)}
              onDelete={() => handleDelete(note._id || note.id || '')}
              formatDate={formatDate}
              editLoading={editLoading && editingId === (note._id || note.id)}
            />
          ))
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deletingId} onClose={cancelDelete}>
        <DialogTitle>Delete Note</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this note? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} disabled={deleteLoading}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" disabled={deleteLoading}>
            {deleteLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

// Separate NoteCard component for better organization
interface NoteCardProps {
  note: Note
  isEditing: boolean
  onEdit: () => void
  onSave: (title: string, content: string) => void
  onCancel: () => void
  onDelete: () => void
  formatDate: (date: Date) => string
}

const NoteCard = ({ note, isEditing, onEdit, onSave, onCancel, onDelete, formatDate, editLoading }: NoteCardProps & { editLoading?: boolean }) => {
  const [editTitle, setEditTitle] = useState(note.title)
  const [editContent, setEditContent] = useState(note.content)

  const handleSave = () => {
    onSave(editTitle, editContent)
  }

  const handleCancel = () => {
    setEditTitle(note.title)
    setEditContent(note.content)
    onCancel()
  }

  if (isEditing) {
    return (
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-6 space-y-4">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 resize-none"
          />
          {/* Show tags in edit mode (read-only) */}
          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <span key={tag} className="bg-white/20 text-white px-3 py-1 rounded-xl text-sm">{tag}</span>
              ))}
            </div>
          )}
          <button
            onClick={handleCancel}
            className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl border border-white/20 transition-all duration-300"
          >
            <X size={16} />
          </button>
          <SaveButton
            loading={editLoading}
            onClick={handleSave}
          >
            <Save size={16} />
            <span className="ml-2">Save</span>
          </SaveButton>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-3xl shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-white line-clamp-2 flex-1">{note.title}</h3>
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={onEdit}
              className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl border border-white/20 transition-all duration-300"
            >
              <Edit3 size={16} />
            </button>
            <button
              onClick={onDelete}
              className="p-2 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm text-white rounded-xl border border-red-500/20 transition-all duration-300"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <p className="text-white/80 text-sm mb-4 line-clamp-4">{note.content || "No content"}</p>
        {/* Show tags */}
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {note.tags.map((tag) => (
              <span key={tag} className="bg-white/20 text-white px-3 py-1 rounded-xl text-xs">{tag}</span>
            ))}
          </div>
        )}
        <div className="flex items-center text-white/60 text-xs">
          <Calendar size={14} className="mr-2" />
          <span>
            {note.createdAt.getTime() !== note.updatedAt.getTime()
              ? `Updated ${formatDate(note.updatedAt)}`
              : `Created ${formatDate(note.createdAt)}`}
          </span>
        </div>
      </div>
    </div>
  )
}

export default NotesSection
