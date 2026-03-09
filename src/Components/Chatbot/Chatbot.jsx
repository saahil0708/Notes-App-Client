import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Fab,
    Paper,
    Typography,
    IconButton,
    TextField,
    Grow,
    Divider
} from '@mui/material';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import { generateChatResponse } from '../../Utils/gemini';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you today?", isBot: true }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        // Add user message
        const userMessage = { text: inputValue, isBot: false };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInputValue('');
        setIsLoading(true);

        try {
            // Call Gemini API
            const responseText = await generateChatResponse(updatedMessages);
            setMessages((prev) => [
                ...prev,
                { text: responseText, isBot: true }
            ]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { text: "Sorry, I'm having trouble connecting to the network right now. Please try again later.", isBot: true }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Grow in={isOpen}>
                <Paper
                    elevation={6}
                    sx={{
                        position: 'fixed',
                        bottom: 80,
                        right: 24,
                        width: 350,
                        height: 500,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        borderRadius: 3,
                        zIndex: 1000,
                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            p: 2,
                            bgcolor: 'primary.main',
                            color: 'primary.contrastText',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Bot size={24} />
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Support Chat
                            </Typography>
                        </Box>
                        <IconButton
                            size="small"
                            onClick={toggleChat}
                            sx={{ color: 'inherit' }}
                        >
                            <X size={20} />
                        </IconButton>
                    </Box>

                    {/* Message Area */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            p: 2,
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            bgcolor: 'background.default'
                        }}
                    >
                        {messages.map((msg, idx) => (
                            <ChatMessage key={idx} message={msg.text} isBot={msg.isBot} />
                        ))}
                        {isLoading && <TypingIndicator />}
                        <div ref={messagesEndRef} />
                    </Box>

                    <Divider />

                    {/* Input Area */}
                    <Box
                        component="form"
                        onSubmit={handleSend}
                        sx={{
                            p: 2,
                            display: 'flex',
                            gap: 1,
                            alignItems: 'flex-end',
                            bgcolor: 'background.paper'
                        }}
                    >
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Type a message..."
                            variant="outlined"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            disabled={isLoading}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                }
                            }}
                        />
                        <IconButton
                            type="submit"
                            color="primary"
                            disabled={!inputValue.trim() || isLoading}
                            sx={{
                                bgcolor: 'primary.main',
                                color: 'white',
                                '&:hover': { bgcolor: 'primary.dark' },
                                '&.Mui-disabled': { bgcolor: 'action.disabledBackground', color: 'action.disabled' }
                            }}
                        >
                            <Send size={20} />
                        </IconButton>
                    </Box>
                </Paper>
            </Grow>

            {/* Floating Action Button */}
            <Fab
                color="primary"
                aria-label="chat"
                onClick={toggleChat}
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    zIndex: 1000,
                }}
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </Fab>
        </>
    );
}
