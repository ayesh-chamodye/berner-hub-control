import { supabase } from './client';
import type { Database } from './types';

type Banner = Database['public']['Tables']['ad_banners']['Row'];
type InsertBanner = Database['public']['Tables']['ad_banners']['Insert'];
type UpdateBanner = Database['public']['Tables']['ad_banners']['Update'];

/**
 * Fetch active banners for the current user role
 */
export const getActiveBanners = async (userRole?: string) => {
  const { data, error } = await supabase
    .rpc('get_active_banners', { user_role: userRole })
    .select();

  if (error) throw error;
  return data;
};

/**
 * Create a new banner
 */
export const createBanner = async (banner: InsertBanner) => {
  const { data, error } = await supabase
    .from('ad_banners')
    .insert(banner)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Update an existing banner
 */
export const updateBanner = async (id: number, updates: UpdateBanner) => {
  const { data, error } = await supabase
    .from('ad_banners')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Delete a banner
 */
export const deleteBanner = async (id: number) => {
  const { error } = await supabase
    .from('ad_banners')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

/**
 * Upload a banner image to storage
 */
export const uploadBannerImage = async (file: File) => {
  const timestamp = new Date().getTime();
  const fileExt = file.name.split('.').pop();
  const filePath = `${timestamp}.${fileExt}`;
  const { data, error } = await supabase.storage
    .from('ad-banners')
    .upload(filePath, file);

  if (error) throw error;

  const { data: publicUrl } = supabase.storage
    .from('ad-banners')
    .getPublicUrl(filePath);

  return {
    url: publicUrl.publicUrl,
    path: filePath
  };
};

/**
 * Delete a banner image from storage
 */
export const deleteBannerImage = async (path: string) => {
  const { error } = await supabase.storage
    .from('ad-banners')
    .remove([path]);

  if (error) throw error;
};

/**
 * Increment banner view count
 */
export const incrementBannerView = async (id: number) => {
  const { error } = await supabase.rpc('increment_banner_view', { banner_id: id });
  if (error) throw error;
};

/**
 * Increment banner click count
 */
export const incrementBannerClick = async (id: number) => {
  const { error } = await supabase.rpc('increment_banner_click', { banner_id: id });
  if (error) throw error;
};

/**
 * Get all banners (admin only)
 */
export const getAllBanners = async () => {
  const { data, error } = await supabase
    .from('ad_banners')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data;
};