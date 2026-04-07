'use client';
import { useState } from 'react';
import { uploadImage } from '@/utils/uploadImage';
import { toast } from 'sonner';
import axios from 'axios';
import { PortfolioItem } from '@/types/portfolio';

interface EditModalProps {
  item: PortfolioItem;
  onClose: () => void;
  onUpdate: (updated: PortfolioItem) => void;
}

export default function EditPortfolioModal({
  item,
  onClose,
  onUpdate,
}: EditModalProps) {
  const [formData, setFormData] = useState<Partial<PortfolioItem>>({
    title: item.title,
    category: item.category,
    type: item.type,
    url: item.url,
    description: item.description,
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/portfolio/${item.id}`;

  const token =
    localStorage.getItem('accessToken') ||
    sessionStorage.getItem('accessToken');

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleUpdate = async () => {
    if (!formData.title) return toast.error('Title is required');
    if (formData.type === 'video content' && !formData.url)
      return toast.error('Video URL is required');
    if (formData.type === 'image' && !formData.url && !file)
      return toast.error('Image required');

    setLoading(true);
    try {
      let imageUrl = formData.url || '';
      if (formData.type === 'image' && file) {
        toast.loading('Uploading image...');
        imageUrl = await uploadImage(file);
        toast.dismiss();
        toast.success('Image uploaded');
      }

      const body = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        imageUrl: formData.type === 'image' ? imageUrl : null,
        videoUrl: formData.type === 'video content' ? formData.url : null,
      };

      const res = await axios.patch(API_BASE, body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onUpdate({
        id: item.id,
        title: res.data.title,
        category: res.data.category,
        type: formData.type!,
        url: formData.type === 'image' ? imageUrl : formData.url!,
        description: formData.description,
      });

      toast.success('Portfolio updated');
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Edit Portfolio Item
        </h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="Graphical Content">Graphical Content</option>
              <option value="Video Content">Video Content</option>
              <option value="Campaign Result">Campaign Result</option>
              <option value="Website">Website</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>

          {formData.type === 'image' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Upload Image
              </label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Video URL
              </label>
              <input
                type="text"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-[#6efd0b] to-[#4fd100] hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
}
