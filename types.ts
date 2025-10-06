export type FileType = 'document' | 'image' | 'video' | 'archive';

export interface FileItem {
  id: number;
  name: string;
  type: FileType;
  size: string;
  shareLink?: string;
}

export interface FolderItem {
    id: number;
    name: string;
}

export interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
  file: FileItem | null;
}
