-- Drop existing storage policies for ad-banners bucket
DROP POLICY IF EXISTS "Public banner images are viewable by everyone" ON storage.objects;
DROP POLICY IF EXISTS "Only admins can upload banner images" ON storage.objects;
DROP POLICY IF EXISTS "Only admins can update banner images" ON storage.objects;
DROP POLICY IF EXISTS "Only admins can delete banner images" ON storage.objects;

-- Create new storage policies that allow authenticated users to manage banners
-- SELECT: Allow authenticated users to view banner images
CREATE POLICY "Authenticated users can view banner images"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'ad-banners');

-- INSERT: Allow authenticated users to upload banner images
CREATE POLICY "Authenticated users can upload banner images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'ad-banners');

-- UPDATE: Allow authenticated users to update banner images
CREATE POLICY "Authenticated users can update banner images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'ad-banners')
WITH CHECK (bucket_id = 'ad-banners');

-- DELETE: Allow authenticated users to delete banner images
CREATE POLICY "Authenticated users can delete banner images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'ad-banners');