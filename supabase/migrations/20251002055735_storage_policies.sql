-- Enable RLS on the storage.objects table
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policies for the ad-banners bucket

-- Allow anyone to read public banner images
CREATE POLICY "Public banner images are viewable by everyone"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'ad-banners' AND 
  auth.role() = 'authenticated'
);

-- Only admins can upload banner images
CREATE POLICY "Only admins can upload banner images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'ad-banners' AND
  EXISTS (
    SELECT 1 FROM auth.users u
    INNER JOIN public.users pu ON pu.id::text = u.id
    WHERE u.id = auth.uid() AND pu.role = 'admin'
  )
);

-- Only admins can update banner images
CREATE POLICY "Only admins can update banner images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'ad-banners' AND
  EXISTS (
    SELECT 1 FROM auth.users u
    INNER JOIN public.users pu ON pu.id::text = u.id
    WHERE u.id = auth.uid() AND pu.role = 'admin'
  )
);

-- Only admins can delete banner images
CREATE POLICY "Only admins can delete banner images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'ad-banners' AND
  EXISTS (
    SELECT 1 FROM auth.users u
    INNER JOIN public.users pu ON pu.id::text = u.id
    WHERE u.id = auth.uid() AND pu.role = 'admin'
  )
);