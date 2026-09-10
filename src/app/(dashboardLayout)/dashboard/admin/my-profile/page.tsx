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
  Loader2,
  BadgeCheck,
  Clock,
  Briefcase,
  Award,
} from 'lucide-react';

const DESIGNATIONS = [
  {
    value: 'GRAPHICS_DESIGNER',
    label: 'Graphics Designer',
  },
  {
    value: 'VIDEO_EDITOR',
    label: 'Video Editor',
  },
  {
    value: 'WEB_DEVELOPER',
    label: 'Web Developer',
  },
  {
    value: 'CINEMATOGRAPHER',
    label: 'Cinematographer',
  },
  {
    value: 'CONTENT_WRITER',
    label: 'Content Writer',
  },
  {
    value: 'VOICE_ARTIST',
    label: 'Voice Artist',
  },
  {
    value: 'DIGITAL_MARKETER',
    label: 'Digital Marketer',
  },
  {
    value: 'CREATIVE_DIRECTOR',
    label: 'Creative Director',
  },
  {
    value: 'FOUNDER_AND_CEO',
    label: 'Founder & CEO',
  },
  {
    value: 'GENERAL_MANAGER',
    label: 'General Manager',
  },
  {
    value: 'FIELD_MARKETING_EXECUTIVE',
    label: 'Field Marketing Executive',
  },
];

const getDesignationLabel = (value?: string) => {
  return (
    DESIGNATIONS.find(designation => designation.value === value)?.label ||
    value ||
    'Not specified'
  );
};

export default function MyProfile() {
  const storedUser = getStoredUser();

  const [user, setUser] = useState(storedUser);
  const [editMode, setEditMode] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-800 border-t-[#6efd0b] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Loading profile...</p>
        </div>
      </div>
    );
  }

  const handleCopy = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);

    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);
    setImageError(false);

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    setUser(storedUser);
    setEditMode(false);
    setImagePreview(null);
    setImageFile(null);
    setImageError(false);
  };

  const handleUpdateProfile = async () => {
    try {
      setSaving(true);

      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('accessToken') ||
            sessionStorage.getItem('accessToken')
          : '';

      let photoUrl = user.photoUrl;

      /*
       * Upload new image if selected
       */
      if (imageFile) {
        setUploading(true);

        photoUrl = await uploadImage(imageFile);

        setUploading(false);
      }

      /*
       * IMPORTANT:
       * Don't send the complete user object.
       *
       * id, createdAt, updatedAt, lastLogin etc.
       * should not be sent as update data.
       */
      const payload = {
        name: user.name?.trim(),
        email: user.email?.trim(),
        phone: user.phone?.trim(),
        photoUrl,
        designation: user.designation,
        skills: user.skills?.trim(),
        experience: Number(user.experience),
        department: user.department?.trim(),
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

      if (!res.ok || !data.success) {
        throw new Error(data?.message || 'Failed to update profile');
      }

      /*
       * Update localStorage
       */
      localStorage.setItem('user', JSON.stringify(data.data));

      /*
       * Update state
       */
      setUser(data.data);

      /*
       * Reset image state
       */
      setImagePreview(null);
      setImageFile(null);
      setImageError(false);

      /*
       * Exit edit mode
       */
      setEditMode(false);

      alert('Profile Updated Successfully');
    } catch (error) {
      console.error('Profile update error:', error);

      alert(
        error instanceof Error ? error.message : 'Failed to update profile',
      );
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20';

      case 'INACTIVE':
        return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';

      case 'ON_LEAVE':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20';

      default:
        return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not available';

    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const skillsArray =
    user.skills
      ?.split(',')
      .map((skill: string) => skill.trim())
      .filter(Boolean) || [];

  const displayImage = imagePreview || user.photoUrl;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#4fd100] mb-1">
              Account
            </p>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              My Profile
            </h1>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage your personal and professional information
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!editMode ? (
              <motion.button
                key="edit"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                onClick={() => setEditMode(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5
                           bg-[#6efd0b] hover:bg-[#5fe600]
                           text-black font-semibold rounded-xl
                           shadow-sm hover:shadow-lg hover:shadow-[#6efd0b]/20
                           transition-all duration-200"
              >
                <Edit size={16} />
                Edit Profile
              </motion.button>
            ) : (
              <motion.div
                key="actions"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-2"
              >
                <button
                  onClick={handleUpdateProfile}
                  disabled={saving || uploading}
                  className="inline-flex items-center gap-2 px-5 py-2.5
                             bg-[#6efd0b] hover:bg-[#5fe600]
                             text-black font-semibold rounded-xl
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all"
                >
                  {saving ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      {uploading ? 'Uploading...' : 'Saving...'}
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Save Changes
                    </>
                  )}
                </button>

                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-2.5
                             bg-white dark:bg-gray-900
                             border border-gray-200 dark:border-gray-800
                             text-gray-700 dark:text-gray-300
                             font-semibold rounded-xl
                             hover:bg-gray-50 dark:hover:bg-gray-800
                             disabled:opacity-50
                             transition-all"
                >
                  <X size={16} />
                  Cancel
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================= PROFILE CARD ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-3xl
                     bg-white dark:bg-gray-900
                     border border-gray-200 dark:border-gray-800
                     shadow-sm"
        >
          {/* ================= COVER ================= */}
          <div className="relative h-32 sm:h-40 bg-gradient-to-br from-[#6efd0b] via-[#61df0b] to-[#37a000]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_40%)]" />

            <div className="absolute top-5 right-5">
              <div className="px-3 py-1.5 rounded-full bg-black/10 backdrop-blur-md text-black text-xs font-semibold">
                {user.employeeId}
              </div>
            </div>

            {editMode && (
              <label
                className="absolute bottom-4 right-4
                           inline-flex items-center gap-2
                           px-3 py-2
                           bg-black/20 hover:bg-black/30
                           backdrop-blur-md
                           rounded-xl cursor-pointer
                           text-white text-xs font-medium
                           transition-colors"
              >
                <Camera size={15} />
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* ================= PROFILE CONTENT ================= */}
          <div className="px-4 sm:px-8 pb-8">
            {/* ================= AVATAR ================= */}
            <div className="relative -mt-14 sm:-mt-16 mb-5 flex justify-center">
              <div className="relative">
                <div
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl
                                overflow-hidden
                                border-4 border-white dark:border-gray-900
                                bg-gray-100 dark:bg-gray-800
                                shadow-xl"
                >
                  {displayImage && !imageError ? (
                    <img
                      src={displayImage}
                      alt={user.name || 'Profile'}
                      className="w-full h-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center
                                    bg-gradient-to-br from-gray-700 to-gray-900
                                    text-white text-4xl font-bold"
                    >
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {editMode && (
                  <label
                    className="absolute -bottom-1 -right-1
                               w-9 h-9 flex items-center justify-center
                               bg-[#6efd0b] hover:bg-[#5fe600]
                               text-black
                               rounded-full
                               border-4 border-white dark:border-gray-900
                               cursor-pointer shadow-lg"
                  >
                    <Camera size={15} />

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {imageFile && editMode && (
              <div className="flex items-center justify-center gap-1.5 mb-4 text-xs text-emerald-600 dark:text-emerald-400">
                <CheckCircle size={13} />
                New profile photo selected
              </div>
            )}

            {/* ================= NAME ================= */}
            <div className="text-center mb-8">
              {editMode ? (
                <div className="max-w-lg mx-auto space-y-3">
                  <input
                    name="name"
                    value={user.name || ''}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 text-center
                               bg-gray-50 dark:bg-gray-800
                               border border-gray-200 dark:border-gray-700
                               rounded-xl
                               text-gray-900 dark:text-white
                               outline-none
                               focus:border-[#6efd0b]
                               focus:ring-2 focus:ring-[#6efd0b]/20"
                  />

                  {/* DESIGNATION SELECT */}
                  <select
                    name="designation"
                    value={user.designation || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-center
                               bg-gray-50 dark:bg-gray-800
                               border border-gray-200 dark:border-gray-700
                               rounded-xl
                               text-gray-900 dark:text-white
                               outline-none
                               focus:border-[#6efd0b]
                               focus:ring-2 focus:ring-[#6efd0b]/20"
                  >
                    <option value="" disabled>
                      Select Designation
                    </option>

                    {DESIGNATIONS.map(designation => (
                      <option key={designation.value} value={designation.value}>
                        {designation.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
                    {user.name}

                    <BadgeCheck size={20} className="text-[#4fd100]" />
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {getDesignationLabel(user.designation)}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(
                        user.status,
                      )}`}
                    >
                      {user.status}
                    </span>

                    <span
                      className="px-3 py-1.5 rounded-full text-xs font-semibold
                                     bg-gray-100 dark:bg-gray-800
                                     border border-gray-200 dark:border-gray-700
                                     text-gray-700 dark:text-gray-300"
                    >
                      {user.role}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* ================= CONTACT ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Email */}
              <div
                className="rounded-2xl border border-gray-200 dark:border-gray-800
                              bg-gray-50/70 dark:bg-gray-800/30 p-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl bg-[#6efd0b]/10
                                  flex items-center justify-center"
                  >
                    <Mail size={17} className="text-[#4fd100]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Email Address
                    </p>

                    {editMode ? (
                      <input
                        name="email"
                        value={user.email || ''}
                        onChange={handleChange}
                        className="w-full bg-transparent
                                   text-sm text-gray-900 dark:text-white
                                   outline-none border-b border-gray-300
                                   dark:border-gray-700
                                   focus:border-[#6efd0b] py-1"
                      />
                    ) : (
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 break-all">
                        {user.email}
                      </p>
                    )}
                  </div>

                  {!editMode && user.email && (
                    <button
                      onClick={() => handleCopy(user.email, 'email')}
                      className="p-2 rounded-lg hover:bg-gray-200
                                 dark:hover:bg-gray-700 transition-colors"
                    >
                      {copied === 'email' ? (
                        <CheckCircle size={15} className="text-green-500" />
                      ) : (
                        <Copy size={15} className="text-gray-400" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div
                className="rounded-2xl border border-gray-200 dark:border-gray-800
                              bg-gray-50/70 dark:bg-gray-800/30 p-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl bg-[#6efd0b]/10
                                  flex items-center justify-center"
                  >
                    <Phone size={17} className="text-[#4fd100]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Phone Number
                    </p>

                    {editMode ? (
                      <input
                        name="phone"
                        value={user.phone || ''}
                        onChange={handleChange}
                        placeholder="Phone number"
                        className="w-full bg-transparent
                                   text-sm text-gray-900 dark:text-white
                                   outline-none border-b border-gray-300
                                   dark:border-gray-700
                                   focus:border-[#6efd0b] py-1"
                      />
                    ) : (
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {user.phone || 'Not provided'}
                      </p>
                    )}
                  </div>

                  {!editMode && user.phone && (
                    <button
                      onClick={() => handleCopy(user.phone, 'phone')}
                      className="p-2 rounded-lg hover:bg-gray-200
                                 dark:hover:bg-gray-700 transition-colors"
                    >
                      {copied === 'phone' ? (
                        <CheckCircle size={15} className="text-green-500" />
                      ) : (
                        <Copy size={15} className="text-gray-400" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* ================= WORK INFORMATION ================= */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase size={17} className="text-[#4fd100]" />

                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Professional Information
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Employee ID */}
                <div
                  className="p-4 rounded-2xl
                                bg-gray-50 dark:bg-gray-800/40
                                border border-gray-200 dark:border-gray-800"
                >
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    Employee ID
                  </p>

                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {user.employeeId || 'N/A'}
                  </p>
                </div>

                {/* Department */}
                <div
                  className="p-4 rounded-2xl
                                bg-gray-50 dark:bg-gray-800/40
                                border border-gray-200 dark:border-gray-800"
                >
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    Department
                  </p>

                  {editMode ? (
                    <input
                      name="department"
                      value={user.department || ''}
                      onChange={handleChange}
                      className="w-full px-2 py-1.5 text-sm
                                 bg-white dark:bg-gray-900
                                 border border-gray-200 dark:border-gray-700
                                 rounded-lg
                                 text-gray-900 dark:text-white
                                 outline-none
                                 focus:border-[#6efd0b]"
                    />
                  ) : (
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {user.department || 'N/A'}
                    </p>
                  )}
                </div>

                {/* Experience */}
                <div
                  className="p-4 rounded-2xl
                                bg-gray-50 dark:bg-gray-800/40
                                border border-gray-200 dark:border-gray-800"
                >
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    Experience
                  </p>

                  {editMode ? (
                    <input
                      name="experience"
                      value={user.experience ?? ''}
                      onChange={handleChange}
                      type="number"
                      min="0"
                      className="w-full px-2 py-1.5 text-sm
                                 bg-white dark:bg-gray-900
                                 border border-gray-200 dark:border-gray-700
                                 rounded-lg
                                 text-gray-900 dark:text-white
                                 outline-none
                                 focus:border-[#6efd0b]"
                    />
                  ) : (
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {user.experience ?? 0} years
                    </p>
                  )}
                </div>

                {/* Joined */}
                <div
                  className="p-4 rounded-2xl
                                bg-gray-50 dark:bg-gray-800/40
                                border border-gray-200 dark:border-gray-800"
                >
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    Joined
                  </p>

                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {formatDate(user.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* ================= SKILLS ================= */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Award size={17} className="text-[#4fd100]" />

                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Skills & Expertise
                </h3>
              </div>

              {editMode ? (
                <input
                  name="skills"
                  value={user.skills || ''}
                  onChange={handleChange}
                  placeholder="React, Node.js, TypeScript"
                  className="w-full px-4 py-3
                             bg-gray-50 dark:bg-gray-800
                             border border-gray-200 dark:border-gray-700
                             rounded-xl
                             text-sm text-gray-900 dark:text-white
                             outline-none
                             focus:border-[#6efd0b]
                             focus:ring-2 focus:ring-[#6efd0b]/20"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {skillsArray.length > 0 ? (
                    skillsArray.map((skill: string, index: number) => (
                      <span
                        key={`${skill}-${index}`}
                        className="px-3 py-1.5
                                     bg-gray-100 dark:bg-gray-800
                                     border border-gray-200 dark:border-gray-700
                                     rounded-lg
                                     text-xs font-medium
                                     text-gray-700 dark:text-gray-300"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No skills added
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* ================= LAST UPDATED ================= */}
            {!editMode && (
              <div className="pt-5 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                  <Clock size={13} />

                  <span>Last updated: {formatDate(user.updatedAt)}</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
