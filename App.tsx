import React, { useState, useCallback, useEffect } from 'react';
import { FolderIcon } from './components/FolderIcon';
import { FileIcon } from './components/FileIcon';
import { PasswordModal } from './components/PasswordModal';
import { FolderContentModal } from './components/FolderContentModal';
import { NewFolderModal } from './components/NewFolderModal';
import { ChangePasswordModal } from './components/ChangePasswordModal';
import { ContextMenu } from './components/ContextMenu';
import { ShareLinkModal } from './components/ShareLinkModal';
import { FileItem, FolderItem, FileType, ContextMenuState } from './types';
import { DUMMY_FOLDERS, DUMMY_FILES } from './constants';

const App: React.FC = () => {
  // Core state
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [secretFolderFiles, setSecretFolderFiles] = useState<FileItem[]>(DUMMY_FILES);
  const [folders, setFolders] = useState<FolderItem[]>(DUMMY_FOLDERS);
  const [folderPassword, setFolderPassword] = useState<string>('password123');

  // Password modal state
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Folder content modal state
  const [showFolderContent, setShowFolderContent] = useState<boolean>(false);

  // New folder modal state
  const [showNewFolderModal, setShowNewFolderModal] = useState<boolean>(false);
  const [newFolderName, setNewFolderName] = useState<string>('');
  
  // Change password modal state
  const [showChangePasswordModal, setShowChangePasswordModal] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [changePasswordError, setChangePasswordError] = useState<string>('');

  // Context Menu state for file sharing
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({ visible: false, x: 0, y: 0, file: null });
  
  // Share link modal state
  const [showShareLinkModal, setShowShareLinkModal] = useState<boolean>(false);
  const [shareableLink, setShareableLink] = useState<string>('');

  const closeAllModalsAndMenus = () => {
    setShowPasswordModal(false);
    setShowFolderContent(false);
    setShowNewFolderModal(false);
    setShowChangePasswordModal(false);
    setShowShareLinkModal(false);
    setContextMenu({ visible: false, x: 0, y: 0, file: null });
  };
  
  const handleLockedFolderClick = () => {
    if (isLocked) {
      setShowPasswordModal(true);
    } else {
      setShowFolderContent(true);
    }
  };

  const handlePasswordSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === folderPassword) {
      setIsLocked(false);
      setShowPasswordModal(false);
      setShowFolderContent(true);
      setError('');
      setPasswordInput('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  }, [passwordInput, folderPassword]);

  const closePasswordModal = useCallback(() => {
    setShowPasswordModal(false);
    setError('');
    setPasswordInput('');
  }, []);

  const closeFolderContent = useCallback(() => {
    setShowFolderContent(false);
  }, []);
  
  const handleDesktopDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowNewFolderModal(true);
    }
  };

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFolderName.trim() !== '') {
      const newFolder: FolderItem = { id: Date.now(), name: newFolderName.trim() };
      setFolders(prevFolders => [...prevFolders, newFolder]);
      setNewFolderName('');
      setShowNewFolderModal(false);
    }
  };

  const closeNewFolderModal = () => {
    setNewFolderName('');
    setShowNewFolderModal(false);
  };
  
  const getFileTypeFromName = (fileName: string): FileType => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (!extension) return 'document';
    if (['doc', 'docx', 'pdf', 'txt'].includes(extension)) return 'document';
    if (['png', 'jpg', 'jpeg', 'gif', 'svg'].includes(extension)) return 'image';
    if (['mp4', 'mov', 'avi', 'mkv'].includes(extension)) return 'video';
    if (['zip', 'rar', '7z', 'tar'].includes(extension)) return 'archive';
    return 'document';
  };

  const formatFileSize = (bytes: number, decimals = 2) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const handleFileUpload = (uploadedFiles: FileList) => {
    const newFiles: FileItem[] = Array.from(uploadedFiles).map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        type: getFileTypeFromName(file.name),
        size: formatFileSize(file.size),
    }));
    setSecretFolderFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleOpenChangePasswordModal = () => {
    setShowFolderContent(false); // Close content modal for better UX
    setShowChangePasswordModal(true);
  };

  const closeChangePasswordModal = () => {
    setShowChangePasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setChangePasswordError('');
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPassword !== folderPassword) {
      setChangePasswordError('Incorrect current password.');
      return;
    }
    if (newPassword.length < 6) {
      setChangePasswordError('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setChangePasswordError('New passwords do not match.');
      return;
    }
    setFolderPassword(newPassword);
    closeChangePasswordModal();
  };

  const handleFileContextMenu = (e: React.MouseEvent, file: FileItem) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.pageX, y: e.pageY, file: file });
  };

  const closeContextMenu = useCallback(() => {
    setContextMenu(prev => ({ ...prev, visible: false }));
  }, []);

  useEffect(() => {
    window.addEventListener('click', closeContextMenu);
    return () => {
      window.removeEventListener('click', closeContextMenu);
    };
  }, [closeContextMenu]);


  const handleShare = () => {
    if (contextMenu.file) {
      const link = `https://share.example/${contextMenu.file.id}/${encodeURI(contextMenu.file.name)}`;
      setShareableLink(link);
      setShowShareLinkModal(true);
    }
    closeContextMenu();
  };

  const closeShareLinkModal = () => {
    setShowShareLinkModal(false);
    setShareableLink('');
  };

  return (
    <div 
      className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-800 to-gray-900 font-sans text-white"
      onDoubleClick={handleDesktopDoubleClick}
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      <main className="p-8">
        <h1 className="text-2xl font-bold text-gray-200 mb-8">My Desktop</h1>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-8">
          {folders.map((folder) => <FolderIcon key={folder.id} name={folder.name} />)}
          <FolderIcon name="Top Secret" isLocked={isLocked} onClick={handleLockedFolderClick} />
          {DUMMY_FILES.slice(0, 3).map((file) => <FileIcon key={file.id} name={file.name} type={file.type} />)}
        </div>
      </main>
      
      {/* Modals & Context Menus */}
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={closePasswordModal}
        onSubmit={handlePasswordSubmit}
        password={passwordInput}
        setPassword={setPasswordInput}
        error={error}
      />
      
      <FolderContentModal
        isOpen={showFolderContent}
        onClose={closeFolderContent}
        files={secretFolderFiles}
        onFileUpload={handleFileUpload}
        onChangePasswordClick={handleOpenChangePasswordModal}
        onFileContextMenu={handleFileContextMenu}
      />

      <NewFolderModal
        isOpen={showNewFolderModal}
        onClose={closeNewFolderModal}
        onSubmit={handleCreateFolder}
        folderName={newFolderName}
        setFolderName={setNewFolderName}
      />
      
      <ChangePasswordModal
        isOpen={showChangePasswordModal}
        onClose={closeChangePasswordModal}
        onSubmit={handleChangePasswordSubmit}
        currentPassword={currentPassword}
        setCurrentPassword={setCurrentPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmNewPassword={confirmNewPassword}
        setConfirmNewPassword={setConfirmNewPassword}
        error={changePasswordError}
      />

      <ContextMenu
        visible={contextMenu.visible}
        x={contextMenu.x}
        y={contextMenu.y}
        onShare={handleShare}
      />

      <ShareLinkModal
        isOpen={showShareLinkModal}
        onClose={closeShareLinkModal}
        link={shareableLink}
      />

       <footer className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-20 backdrop-blur-sm text-center text-xs text-gray-400">
          <p>React Folder Lock Simulation. Default password is 'password123'.</p>
        </footer>
    </div>
  );
};

export default App;
