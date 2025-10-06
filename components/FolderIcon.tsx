
import React from 'react';

interface FolderIconProps {
  name: string;
  isLocked?: boolean;
  onClick?: () => void;
}

export const FolderIcon: React.FC<FolderIconProps> = ({ name, isLocked = false, onClick }) => {
  return (
    <div
      className="flex flex-col items-center justify-center text-center group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-yellow-500 group-hover:text-yellow-400 transition-colors"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>
        {isLocked && (
          <div className="absolute -top-1 -right-1 bg-gray-700 p-1 rounded-full shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-cyan-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
      <p className="text-xs text-gray-200 group-hover:text-white break-words w-20">{name}</p>
    </div>
  );
};
