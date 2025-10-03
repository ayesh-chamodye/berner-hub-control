import React, { useState } from "react";
import { bannerService } from "../integrations/supabase/client";

const defaultBanner = {
  title: "",
  description: "",
  image_url: "",
  link_url: "",
  link_type: "none",
  action_data: {},
  display_order: 0,
  is_active: true,
  start_date: "",
  end_date: "",
  target_roles: [],
};

export default function BannerUpload() {
  const [banner, setBanner] = useState(defaultBanner);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBanner((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      if (!imageFile) throw new Error("Image file is required");
      
      // Upload the image first
      const { url: imageUrl, path: imagePath } = await bannerService.uploadBannerImage(imageFile);
      
      // Create the banner with the image URL and path
      const newBanner = {
        title: banner.title,
        description: banner.description || null,
        image_url: imageUrl,
        image_path: imagePath,
        storage_bucket: 'ad-banners',
        link_url: banner.link_url || null,
        link_type: banner.link_type as 'external' | 'internal' | 'none',
        action_data: banner.action_data || null,
        display_order: banner.display_order,
        is_active: banner.is_active,
        start_date: banner.start_date || null,
        end_date: banner.end_date || null,
        target_roles: banner.target_roles.length > 0 ? banner.target_roles : null,
        created_by: null
      };
      
      await bannerService.createBanner(newBanner);
      setSuccess("Banner uploaded successfully!");
      setBanner(defaultBanner);
      setImageFile(null);
    } catch (err: any) {
      setError(err.message || "Error uploading banner");
      
      // If there was an error creating the banner, we should clean up the uploaded image
      // TODO: Add cleanup code here if needed
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Upload Ad Banner</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-500 mb-2">{success}</div>}
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={banner.title}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={banner.description}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full mb-2"
        required
      />
      <input
        type="text"
        name="link_url"
        placeholder="Link URL (optional)"
        value={banner.link_url}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />
      <select
        name="link_type"
        value={banner.link_type}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      >
        <option value="none">None</option>
        <option value="internal">Internal</option>
        <option value="external">External</option>
      </select>
      <input
        type="number"
        name="display_order"
        placeholder="Display Order"
        value={banner.display_order}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />
      <label className="flex items-center mb-2">
        <input
          type="checkbox"
          name="is_active"
          checked={banner.is_active}
          onChange={e => setBanner(prev => ({ ...prev, is_active: e.target.checked }))}
          className="mr-2"
        />
        Active
      </label>
      <input
        type="date"
        name="start_date"
        value={banner.start_date}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="date"
        name="end_date"
        value={banner.end_date}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Banner"}
      </button>
    </form>
  );
}
