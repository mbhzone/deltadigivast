'use client';

import React, { useEffect, useState } from 'react';
import { Save, Image as ImageIcon, Upload } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';
import { uploadImage } from '@/utils/uploadImage';
import RootLoading from '@/components/module/shared/loading';
import { toast } from 'sonner';

interface HeroData {
  title: string;
  description: string;
  imageUrl: string | null;
}

const HERO_ID = '3b67800f-77e6-43e6-a132-3b2c230d628e'; // fixed id

export default function HeroManagement() {
  const [heroData, setHeroData] = useState<HeroData>({
    title: '',
    description: '',
    imageUrl: null,
  });
  console.log(heroData);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  // 1️⃣ Fetch hero data on mount
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/hero/${HERO_ID}`,
        );
        const data = res.data;
        const hero = data.data;
        setHeroData({
          title: hero.title,
          description: hero.description,
          imageUrl: hero.imageUrl || null, // ✅ map imageUrl → image
        });
        setImagePreview(hero.imageUrl || null);
      } catch (err) {
        console.error('Failed to fetch hero data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHero();
  }, []);

  // 2️⃣ Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setHeroData(prev => ({ ...prev, [name]: value }));
  };

  // 3️⃣ Handle image upload (ImgBB)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      toast.loading('Uploading image...', { id: 'upload' });

      const url = await uploadImage(file);

      setImagePreview(url);
      setHeroData(prev => ({ ...prev, imageUrl: url }));

      toast.success('Image uploaded successfully!', { id: 'upload' });
    } catch (err) {
      console.error('Image upload failed:', err);
      toast.error('Image upload failed', { id: 'upload' });
    } finally {
      setIsUploading(false);
    }
  };

  // 4️⃣ Handle save (PATCH)
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Get token from localStorage or sessionStorage
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('accessToken') ||
            sessionStorage.getItem('accessToken')
          : null;
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/hero/${HERO_ID}`,
        heroData,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        },
      );

      toast.success('Hero content successfully changed');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update hero');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <RootLoading></RootLoading>;

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Hero Section Management
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          Edit the content of your banner hero section
        </p>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Hero Title
            </label>
            <input
              type="text"
              name="title"
              value={heroData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6efd0b]/50 transition-all duration-200"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Hero Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={heroData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6efd0b]/50 transition-all duration-200"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Hero Image
            </label>
            <div className="flex items-start gap-4">
              <div className="relative w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-800 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-800">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Hero"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="hidden"
                  id="image"
                />
                <label
                  htmlFor="image"
                  className={`inline-flex items-center gap-2 px-4 py-2 
  ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 
  border border-gray-300 dark:border-gray-800 rounded-lg 
  hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200`}
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={18} />
                      Choose Image
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800 flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`inline-flex items-center gap-2 px-6 py-2 font-medium rounded-lg 
    bg-gradient-to-r from-[#6efd0b] to-[#4fd100] text-white 
    hover:opacity-90 transition-opacity duration-200
    ${isSaving ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `}
          >
            {isSaving ? (
              <>
                {/* spinner */}
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
