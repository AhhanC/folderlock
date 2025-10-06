import { FolderItem, FileItem } from './types';

export const DUMMY_FOLDERS: FolderItem[] = [
    { id: 1, name: 'Work' },
    { id: 2, name: 'Photos' },
    { id: 3, name: 'Games' },
    { id: 4, name: 'Downloads' },
];

export const DUMMY_FILES: FileItem[] = [
  { id: 1, name: 'Project_Alpha.docx', type: 'document', size: '2.3 MB' },
  { id: 2, name: 'Vacation_01.jpg', type: 'image', size: '4.1 MB' },
  { id: 3, name: 'Company_Meeting.mp4', type: 'video', size: '128 MB' },
  { id: 4, name: 'Annual_Report.docx', type: 'document', size: '5.6 MB' },
  { id: 5, name: 'Assets.zip', type: 'archive', size: '32.5 MB' },
  { id: 6, name: 'Sunset.jpg', type: 'image', size: '6.7 MB' },
  { id: 7, name: 'Tutorial.mp4', type: 'video', size: '256 MB' },
];
