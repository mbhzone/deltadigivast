'use client';

import { getStoredUser } from '@/utils/auth.utils';
import { uploadImage } from '@/utils/uploadImage';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  Edit,
  Copy,
  CheckCircle,
  Save,
  X,
  Camera,
  Briefcase,
  Building2,
  Calendar,
  Award,
  MapPin,
  Loader2,
  User,
  BadgeCheck,
  Clock,
  Upload,
} from 'lucide-react';

export default function MyProfile() {
  const storedUser = getStoredUser();

  const [user, setUser] = useState(storedUser);
  const [editMode, setEditMode] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-800 border-t-[#6efd0b] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Loading profile...</p>
        </div>
      </div>
    );
  }

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle image selection with preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('accessToken') ||
            sessionStorage.getItem('accessToken')
          : '';

      let photoUrl = user.photoUrl;

      // Upload image if new image selected
      if (imageFile) {
        setUploading(true);
        photoUrl = await uploadImage(imageFile);
        setUploading(false);
      }

      const payload = {
        ...user,
        photoUrl,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${user.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      if (data.success) {
        // Update localStorage with new user data
        localStorage.setItem('user', JSON.stringify(data.data));

        // Update state with new data
        setUser(data.data);

        // Clear image preview and file
        setImagePreview(null);
        setImageFile(null);

        // Exit edit mode
        setEditMode(false);

        // Show success message (you can replace with toast)
        alert('Profile Updated Successfully');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400';
      case 'INACTIVE':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-300';
      case 'ON_LEAVE':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const skillsArray =
    user.skills?.split(',').map((s: string) => s.trim()) || [];

  // Determine which image to show
  const displayImage = imagePreview || user.photoUrl;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Profile
          </h1>

          <AnimatePresence mode="wait">
            {!editMode ? (
              <motion.button
                key="edit"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={() => setEditMode(true)}
                className="inline-flex items-center gap-2 px-4 py-2 
                         bg-gradient-to-r from-[#6efd0b] to-[#4fd100]
                         text-white font-medium rounded-lg
                         hover:shadow-lg hover:shadow-[#6efd0b]/30
                         transition-all duration-300"
              >
                <Edit size={16} />
                Edit Profile
              </motion.button>
            ) : (
              <motion.div
                key="actions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-2"
              >
                <button
                  onClick={handleUpdateProfile}
                  disabled={uploading}
                  className="inline-flex items-center gap-2 px-4 py-2 
                           bg-green-500 text-white font-medium rounded-lg
                           hover:bg-green-600 transition-colors
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Save
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setEditMode(false);
                    setImagePreview(null);
                    setImageFile(null);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 
                           bg-red-500 text-white font-medium rounded-lg
                           hover:bg-red-600 transition-colors"
                >
                  <X size={16} />
                  Cancel
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
        >
          {/* Cover with gradient */}
          <div className="h-24 bg-gradient-to-r from-[#6efd0b] to-[#4fd100] relative">
            {editMode && (
              <div className="absolute bottom-2 right-2">
                <label className="p-2 bg-white/20 backdrop-blur-sm rounded-lg cursor-pointer hover:bg-white/30 transition-colors">
                  <Camera size={18} className="text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          {/* Profile Content */}
          <div className="px-4 sm:px-6 pb-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center -mt-12 mb-4">
              <div className="relative group">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-900 shadow-xl">
                  {displayImage && !imageError ? (
                    <img
                      src={displayImage}
                      alt={user.name}
                      className="w-full h-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-3xl font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {editMode && (
                  <label
                    className="absolute -bottom-1 -right-1 p-1.5 bg-[#6efd0b] rounded-full 
                                  shadow-lg cursor-pointer hover:bg-[#4fd100] transition-colors"
                  >
                    <Camera size={14} className="text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {imageFile && editMode && (
                <p className="text-xs text-green-500 mt-2 flex items-center gap-1">
                  <CheckCircle size={12} />
                  New image selected
                </p>
              )}
            </div>

            {/* Name and Designation */}
            <div className="text-center mb-6">
              {editMode ? (
                <div className="space-y-2">
                  <input
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-center border border-gray-300 dark:border-gray-800 
                             rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
                    placeholder="Full Name"
                  />
                  <input
                    name="designation"
                    value={user.designation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-center border border-gray-300 dark:border-gray-800 
                             rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
                    placeholder="Designation"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
                    {user.name}
                    <BadgeCheck size={18} className="text-[#4fd100]" />
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {user.designation}
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}
                    >
                      {user.status}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs text-gray-700 dark:text-gray-300">
                      {user.role}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-3 mb-6">
              {/* Email */}
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="flex items-center gap-3 flex-1">
                  <Mail size={16} className="text-[#4fd100] flex-shrink-0" />
                  {editMode ? (
                    <input
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      className="w-full px-2 py-1 border border-gray-300 dark:border-gray-800 
                               rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
                    />
                  ) : (
                    <span className="text-sm text-gray-700 dark:text-gray-300 break-all">
                      {user.email}
                    </span>
                  )}
                </div>
                {!editMode && (
                  <button
                    onClick={() => handleCopy(user.email, 'email')}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                  >
                    {copied === 'email' ? (
                      <CheckCircle size={14} className="text-green-500" />
                    ) : (
                      <Copy size={14} className="text-gray-400" />
                    )}
                  </button>
                )}
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="flex items-center gap-3 flex-1">
                  <Phone size={16} className="text-[#4fd100] flex-shrink-0" />
                  {editMode ? (
                    <input
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                      className="w-full px-2 py-1 border border-gray-300 dark:border-gray-800 
                               rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
                      placeholder="Phone number"
                    />
                  ) : (
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {user.phone || 'Not provided'}
                    </span>
                  )}
                </div>
                {!editMode && user.phone && (
                  <button
                    onClick={() => handleCopy(user.phone, 'phone')}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                  >
                    {copied === 'phone' ? (
                      <CheckCircle size={14} className="text-green-500" />
                    ) : (
                      <Copy size={14} className="text-gray-400" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Work Information Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                  Employee ID
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.employeeId}
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                  Department
                </p>
                {editMode ? (
                  <input
                    name="department"
                    value={user.department}
                    onChange={handleChange}
                    className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-800 
                             rounded bg-white dark:bg-gray-800"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.department}
                  </p>
                )}
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                  Experience
                </p>
                {editMode ? (
                  <input
                    name="experience"
                    value={user.experience}
                    onChange={handleChange}
                    type="number"
                    className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-800 
                             rounded bg-white dark:bg-gray-800"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.experience} years
                  </p>
                )}
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                  Joined
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Skills
              </p>

              {editMode ? (
                <input
                  name="skills"
                  value={user.skills}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-800 
                           rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
                  placeholder="e.g., React, Node.js, TypeScript"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {skillsArray.length > 0 ? (
                    skillsArray.map((skill: string, i: number) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 
                                 border border-gray-200 dark:border-gray-800
                                 rounded-lg text-xs text-gray-700 dark:text-gray-300"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No skills added</p>
                  )}
                </div>
              )}
            </div>

            {/* Last Updated */}
            {!editMode && (
              <div className="mt-4 text-xs text-gray-400 dark:text-gray-600 flex items-center gap-1">
                <Clock size={12} />
                Last updated: {formatDate(user.updatedAt)}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
