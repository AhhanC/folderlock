import React, { useRef } from 'react';
import { FileIcon } from './FileIcon';
import { FileItem } from '../types';

interface FolderContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  files: FileItem[];
  onFileUpload: (files: FileList) => void;
  onChangePasswordClick: () => void;
  onFileContextMenu: (event: React.MouseEvent, file: FileItem) => void;
}

export const FolderContentModal: React.FC<FolderContentModalProps> = ({ isOpen, onClose, files, onFileUpload, onChangePasswordClick, onFileContextMenu }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files);
    }
    if(e.target) {
        e.target.value = '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-slate-800 rounded-lg shadow-2xl w-full max-w-2xl h-3/4 flex flex-col border border-slate-700" onClick={(e) => e.stopPropagation()}>
        <header className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
          <h2 className="text-xl font-bold text-white">Top Secret</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl font-bold">&times;</button>
        </header>
        <main className="p-6 overflow-y-auto flex-grow">
          {files.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
              {files.map(file => (
                <div key={file.id} onContextMenu={(e) => onFileContextMenu(e, file)}>
                  <FileIcon name={file.name} type={file.type} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">This folder is empty. Upload some files!</p>
            </div>
          )}
        </main>
        <footer className="p-4 border-t border-slate-700 flex justify-between items-center flex-shrink-0">
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            aria-hidden="true"
          />
          <button
            onClick={handleUploadClick}
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
          >
            Upload Files
          </button>
          <button
            onClick={onChangePasswordClick}
            className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
          >
            Change Password
          </button>
        </footer>
      </div>
    </div>
  );
};
