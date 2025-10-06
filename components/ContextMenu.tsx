import React from 'react';

interface ContextMenuProps {
  visible: boolean;
  x: number;
  y: number;
  onShare: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ visible, x, y, onShare }) => {
  if (!visible) return null;

  return (
    <div
      className="absolute bg-slate-700 border border-slate-600 rounded-md shadow-lg py-1 z-50"
      style={{ top: y, left: x }}
    >
      <ul>
        <li
          onClick={onShare}
          className="px-4 py-2 text-sm text-white hover:bg-cyan-600 cursor-pointer"
        >
          Share
        </li>
      </ul>
    </div>
  );
};
