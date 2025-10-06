import React, { useState } from 'react';

interface ShareLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  link: string;
}

export const ShareLinkModal: React.FC<ShareLinkModalProps> = ({ isOpen, onClose, link }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-slate-800 rounded-lg shadow-2xl p-8 w-full max-w-lg border border-slate-700" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Share File</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
        </div>
        <p className="text-sm text-gray-400 mb-4">Anyone with this link can view the file. This link is for demonstration purposes only.</p>
        <div className="flex items-center gap-2">
            <input
                type="text"
                readOnly
                value={link}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-md text-gray-300 focus:outline-none"
            />
            <button
                onClick={handleCopy}
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 whitespace-nowrap"
            >
                {copied ? 'Copied!' : 'Copy'}
            </button>
        </div>
      </div>
    </div>
  );
};
