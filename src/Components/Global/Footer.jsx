import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const Footer = () => {
  const links = ['Home', 'Features', 'Contact'];

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand */}
          <div className="flex items-center mb-6 md:mb-0">
            <div className="bg-white bg-opacity-20 p-2 rounded-xl backdrop-blur-sm hover:bg-opacity-30 transition-all duration-300">
              <div className="h-6 w-6 bg-white rounded text-blue-600 flex items-center justify-center font-bold text-sm">
                N
              </div>
            </div>
            <span className="text-2xl font-bold text-white ml-3">
              NotesApp
            </span>
          </div>
          
          {/* Navigation */}
          <nav className="flex space-x-8">
            {links.map((link) => (
              <a 
                key={link}
                href="#" 
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-white/20 pt-6 mt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 NotesApp. Simple note-taking for everyone.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;