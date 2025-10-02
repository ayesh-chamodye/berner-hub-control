import { v4 as uuidv4 } from 'uuid';

interface FilePathOptions {
  prefix?: string;
  useTimestamp?: boolean;
  useUuid?: boolean;
}

export const fileUtils = {
  /**
   * Generate a clean filename without spaces and special characters
   */
  sanitizeFileName(fileName: string): string {
    return fileName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9.-]/g, '')
      .replace(/--+/g, '-');
  },

  /**
   * Get file extension from filename or path
   */
  getFileExtension(fileName: string): string {
    return fileName.split('.').pop()?.toLowerCase() || '';
  },

  /**
   * Generate a unique file path for storage
   */
  generateFilePath(file: File, options: FilePathOptions = {}): string {
    const {
      prefix = '',
      useTimestamp = true,
      useUuid = true,
    } = options;

    const timestamp = useTimestamp ? new Date().getTime() : '';
    const uuid = useUuid ? uuidv4().split('-')[0] : '';
    const sanitizedName = this.sanitizeFileName(file.name);
    const ext = this.getFileExtension(file.name);
    
    const parts = [
      prefix,
      timestamp,
      uuid,
      sanitizedName,
    ].filter(Boolean);

    // If the original filename already has an extension, remove it
    const baseName = parts.join('-').replace(new RegExp(`\\.${ext}$`), '');
    
    return `${baseName}.${ext}`;
  },

  /**
   * Validate file type against allowed types
   */
  validateFileType(file: File, allowedTypes: string[]): boolean {
    return allowedTypes.some(type => {
      // Handle mime type patterns (e.g., 'image/*')
      if (type.endsWith('/*')) {
        const baseType = type.split('/')[0];
        return file.type.startsWith(`${baseType}/`);
      }
      return file.type === type;
    });
  },

  /**
   * Format file size in human-readable format
   */
  formatFileSize(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${Math.round(size * 100) / 100} ${units[unitIndex]}`;
  },

  /**
   * Generate organized path structure for file storage
   */
  generateStoragePath(file: File, options: {
    bucket: string;
    prefix?: string;
    yearMonth?: boolean;
    category?: string;
  } = { bucket: 'ad-banners' }): string {
    const parts = [
      options.bucket,
      options.category,
      options.yearMonth ? new Date().toISOString().slice(0, 7) : null, // YYYY-MM
      options.prefix,
      this.generateFilePath(file, { useTimestamp: true, useUuid: true })
    ].filter(Boolean);

    return parts.join('/');
  },

  /**
   * Get image dimensions (if file is an image)
   */
  async getImageDimensions(file: File): Promise<{ width: number; height: number } | null> {
    if (!file.type.startsWith('image/')) return null;

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height
        });
      };
      img.onerror = () => resolve(null);
      img.src = URL.createObjectURL(file);
    });
  }
};