'use client';

import { useState } from 'react';
import { uploadImage } from '@/utils/uploadImage';
import { toast } from 'sonner';
import axios from 'axios';
import {
  ExternalLink,
  Image as ImageIcon,
  Link as LinkIcon,
  Loader2,
  Save,
  Video,
  X,
} from 'lucide-react';
import { PortfolioItem } from '@/types/portfolio';

interface EditModalProps {
  item: PortfolioItem;
  onClose: () => void;
  onUpdate: (updatedItem: PortfolioItem) => void;
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
    websiteLiveLink: item.websiteLiveLink || '',
    description: item.description,
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/portfolio/${item.id}`;

  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('accessToken') ||
        sessionStorage.getItem('accessToken')
      : '';

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpdate = async () => {
    if (!formData.title?.trim()) {
      return toast.error('Title is required');
    }

    if (formData.category === 'Website' && !formData.websiteLiveLink?.trim()) {
      return toast.error('Website Live Link is required');
    }

    if (formData.type === 'video content' && !formData.url?.trim()) {
      return toast.error('Video URL is required');
    }

    if (formData.type === 'image' && !formData.url && !file) {
      return toast.error('Image is required');
    }

    setLoading(true);

    try {
      let imageUrl = formData.url || '';

      // Upload new image if selected
      if (formData.type === 'image' && file) {
        toast.loading('Uploading image...');

        imageUrl = await uploadImage(file);

        toast.dismiss();
        toast.success('Image uploaded successfully');
      }

      const body = {
        title: formData.title,
        category: formData.category,
        description: formData.description || '',

        // Image URL for image type
        imageUrl: formData.type === 'image' ? imageUrl : null,

        // Video URL for video type
        videoUrl: formData.type === 'video content' ? formData.url : null,

        // Website live URL only for Website category
        websiteLiveLink:
          formData.category === 'Website' ? formData.websiteLiveLink : null,
      };

      const res = await axios.patch(API_BASE, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedItem: PortfolioItem = {
        id: item.id,

        title: res.data.title,

        category: res.data.category,

        type: formData.type!,

        url: formData.type === 'image' ? imageUrl : formData.url || '',

        websiteLiveLink:
          res.data.websiteLiveLink ?? body.websiteLiveLink ?? null,

        description: res.data.description || formData.description || '',

        imageUrl: res.data.imageUrl ?? body.imageUrl,

        videoUrl: res.data.videoUrl ?? body.videoUrl,

        createdAt: item.createdAt,

        updatedAt: res.data.updatedAt || item.updatedAt,
      };

      onUpdate(updatedItem);

      toast.success('Portfolio updated successfully');

      onClose();
    } catch (error) {
      console.error(error);

      toast.dismiss();

      toast.error('Failed to update portfolio');
    } finally {
      setLoading(false);
    }
  };

  const isWebsite = formData.category === 'Website';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div
        className="
          w-full max-w-4xl
          max-h-[90vh]
          overflow-y-auto
          rounded-md
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-800
          shadow-2xl
        "
      >
        {/* Header */}
        <div
          className="
            sticky top-0 z-10
            flex items-center justify-between
            px-6 py-5
            bg-white dark:bg-gray-900
            border-b border-gray-200 dark:border-gray-800
          "
        >
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Edit Portfolio
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Update your portfolio project details
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="
              p-2 rounded-lg
              text-gray-500
              hover:text-gray-900
              dark:hover:text-white
              hover:bg-gray-100
              dark:hover:bg-gray-800
              transition-colors
              disabled:opacity-50
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Project Title <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleInputChange}
              placeholder="e.g. Sera Place Website"
              className="
                w-full px-4 py-3 rounded-xl
                bg-gray-50 dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                text-gray-900 dark:text-white
                placeholder-gray-400
                focus:outline-none
                focus:ring-2 focus:ring-[#6efd0b]/40
                focus:border-[#6efd0b]
                transition-all
              "
            />
          </div>

          {/* Category + Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>

              <div className="relative">
                <LinkIcon
                  size={17}
                  className="
                    absolute left-3 top-1/2
                    -translate-y-1/2
                    text-gray-400
                    pointer-events-none
                  "
                />

                <select
                  name="category"
                  value={formData.category || ''}
                  onChange={handleInputChange}
                  className="
                    w-full pl-10 pr-4 py-3 rounded-xl
                    bg-gray-50 dark:bg-gray-800
                    border border-gray-200 dark:border-gray-700
                    text-gray-900 dark:text-white
                    focus:outline-none
                    focus:ring-2 focus:ring-[#6efd0b]/40
                    focus:border-[#6efd0b]
                    transition-all
                  "
                >
                  <option value="Graphical Content">Graphical Content</option>

                  <option value="Video Content">Video Content</option>

                  <option value="Campaign Result">Campaign Result</option>

                  <option value="Website">Website</option>
                </select>
              </div>
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content Type
              </label>

              <div className="relative">
                {formData.type === 'image' ? (
                  <ImageIcon
                    size={17}
                    className="
                      absolute left-3 top-1/2
                      -translate-y-1/2
                      text-gray-400
                      pointer-events-none
                    "
                  />
                ) : (
                  <Video
                    size={17}
                    className="
                      absolute left-3 top-1/2
                      -translate-y-1/2
                      text-gray-400
                      pointer-events-none
                    "
                  />
                )}

                <select
                  name="type"
                  value={formData.type || 'image'}
                  onChange={handleInputChange}
                  className="
                    w-full pl-10 pr-4 py-3 rounded-xl
                    bg-gray-50 dark:bg-gray-800
                    border border-gray-200 dark:border-gray-700
                    text-gray-900 dark:text-white
                    focus:outline-none
                    focus:ring-2 focus:ring-[#6efd0b]/40
                    focus:border-[#6efd0b]
                    transition-all
                  "
                >
                  <option value="image">Image</option>
                  <option value="video content">Video</option>
                </select>
              </div>
            </div>
          </div>

          {/* Website Live Link */}
          {isWebsite && (
            <div
              className="
                p-4 rounded-xl
                bg-[#6efd0b]/5
                border border-[#6efd0b]/30
              "
            >
              <label
                className="
                  block text-sm font-semibold
                  text-gray-800 dark:text-gray-200
                  mb-2
                "
              >
                Website Live Link <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <ExternalLink
                  size={18}
                  className="
                    absolute left-3 top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="url"
                  name="websiteLiveLink"
                  value={formData.websiteLiveLink || ''}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  className="
                    w-full pl-10 pr-4 py-3 rounded-xl
                    bg-white dark:bg-gray-800
                    border border-gray-200 dark:border-gray-700
                    text-gray-900 dark:text-white
                    placeholder-gray-400
                    focus:outline-none
                    focus:ring-2 focus:ring-[#6efd0b]/40
                    focus:border-[#6efd0b]
                    transition-all
                  "
                />
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Enter the live website URL that visitors can open.
              </p>
            </div>
          )}

          {/* Image Upload */}
          {formData.type === 'image' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Update Image
              </label>

              <label
                className="
                  flex items-center gap-3
                  w-full px-4 py-4
                  rounded-xl
                  border-2 border-dashed
                  border-gray-300 dark:border-gray-700
                  bg-gray-50 dark:bg-gray-800
                  hover:border-[#6efd0b]
                  cursor-pointer
                  transition-all
                "
              >
                <ImageIcon size={20} className="text-gray-400 shrink-0" />

                <div className="flex-1 min-w-0">
                  <p
                    className="
                      text-sm font-medium
                      text-gray-700 dark:text-gray-300
                      truncate
                    "
                  >
                    {file
                      ? file.name
                      : isWebsite
                        ? 'Choose a new website image'
                        : 'Choose a new image'}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP</p>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {/* Selected file */}
              {file && (
                <p className="text-xs text-green-600 mt-2">
                  New image selected: {file.name}
                </p>
              )}
            </div>
          )}

          {/* Video URL */}
          {formData.type === 'video content' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Video URL <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <Video
                  size={18}
                  className="
                    absolute left-3 top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="text"
                  name="url"
                  value={formData.url || ''}
                  onChange={handleInputChange}
                  placeholder="https://youtube.com/..."
                  className="
                    w-full pl-10 pr-4 py-3 rounded-xl
                    bg-gray-50 dark:bg-gray-800
                    border border-gray-200 dark:border-gray-700
                    text-gray-900 dark:text-white
                    placeholder-gray-400
                    focus:outline-none
                    focus:ring-2 focus:ring-[#6efd0b]/40
                    focus:border-[#6efd0b]
                    transition-all
                  "
                />
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              rows={4}
              placeholder="Briefly describe this project..."
              className="
                w-full px-4 py-3 rounded-xl
                bg-gray-50 dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                text-gray-900 dark:text-white
                placeholder-gray-400
                resize-none
                focus:outline-none
                focus:ring-2 focus:ring-[#6efd0b]/40
                focus:border-[#6efd0b]
                transition-all
              "
            />
          </div>
        </div>

        {/* Footer */}
        <div
          className="
            sticky bottom-0
            flex items-center justify-end gap-3
            px-6 py-4
            bg-white dark:bg-gray-900
            border-t border-gray-200 dark:border-gray-800
          "
        >
          <button
            onClick={onClose}
            disabled={loading}
            className="
              px-5 py-2.5
              rounded-xl
              text-sm font-medium
              text-gray-700 dark:text-gray-300
              bg-gray-100 dark:bg-gray-800
              hover:bg-gray-200 dark:hover:bg-gray-700
              transition-colors
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="
              inline-flex items-center gap-2
              px-5 py-2.5
              rounded-xl
              text-sm font-semibold
              bg-[#6efd0b]
              text-gray-900
              hover:bg-[#5ee000]
              shadow-lg shadow-[#6efd0b]/20
              transition-all
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save size={17} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
