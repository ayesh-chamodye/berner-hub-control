import { supabase } from './client';
import { fileUtils } from '@/lib/fileUtils';

interface UploadOptions {
  bucket?: string;
  prefix?: string;
  category?: string;
  useYearMonth?: boolean;
  maxSizeMB?: number;
  allowedTypes?: string[];
  cacheControl?: string;
}

interface UploadResult {
  path: string;
  url: string;
  size: number;
  mimeType: string;
  metadata?: Record<string, any>;
}

const DEFAULT_OPTIONS: UploadOptions = {
  bucket: 'ad-banners',
  prefix: 'ad_banners',  // This ensures all files go into the ad_banners folder
  useYearMonth: true,
  maxSizeMB: 10,
  allowedTypes: ['image/*'],
  cacheControl: '3600'
};

export const storageService = {
  /**
   * Upload a file to Supabase storage with organized path structure
   */
  async uploadFile(file: File, options: UploadOptions = {}): Promise<UploadResult> {
    const opts = { ...DEFAULT_OPTIONS, ...options };

    // Validate file size
    const maxSize = (opts.maxSizeMB || 10) * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error(`File size exceeds ${opts.maxSizeMB}MB limit`);
    }

    // Validate file type
    if (opts.allowedTypes && !fileUtils.validateFileType(file, opts.allowedTypes)) {
      throw new Error('File type not allowed');
    }

    // Generate storage path
    const path = fileUtils.generateStoragePath(file, {
      bucket: opts.bucket!,
      prefix: opts.prefix,
      category: opts.category,
      yearMonth: opts.useYearMonth
    });

    // Get image dimensions if it's an image
    const dimensions = await fileUtils.getImageDimensions(file);

    // Upload file
    const { data, error } = await supabase.storage
      .from(opts.bucket!)
      .upload(path, file, {
        cacheControl: opts.cacheControl,
        upsert: false,
        contentType: file.type
      });

    if (error) throw error;
    if (!data) throw new Error('Upload failed');

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(opts.bucket!)
      .getPublicUrl(data.path);

    return {
      path: data.path,
      url: publicUrl,
      size: file.size,
      mimeType: file.type,
      metadata: dimensions ? {
        width: dimensions.width,
        height: dimensions.height
      } : undefined
    };
  },

  /**
   * Delete a file from storage
   */
  async deleteFile(path: string, bucket: string = 'ad-banners'): Promise<void> {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;
  },

  /**
   * Get public URL for a file
   */
  getPublicUrl(path: string, bucket: string = 'ad-banners'): string {
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return publicUrl;
  }
};