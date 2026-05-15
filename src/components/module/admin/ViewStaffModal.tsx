'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  Phone,
  Briefcase,
  Building2,
  Award,
  Code2,
  Clock,
  Calendar,
  User,
  BadgeCheck,
  MapPin,
  GraduationCap,
  Star,
  ChevronRight,
  Copy,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

interface Staff {
  id?: string;
  employeeId: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  photoUrl?: string;
  role: string;
  designation?: string;
  skills?: string;
  experience?: number;
  department: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE';
  lastLogin?: string;
  location?: string;
  education?: string;
  joinDate?: string;
}

interface ViewStaffModalProps {
  staff: Staff;
  onClose: () => void;
}

export default function ViewStaffModal({
  staff,
  onClose,
}: ViewStaffModalProps) {
  const [copied, setCopied] = React.useState<string | null>(null);
  const [imageError, setImageError] = React.useState(false);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
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

  const skillsArray = staff.skills?.split(',').map(s => s.trim()) || [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.3 }}
          className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header with Gradient */}
          <div className="relative h-32 ">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm 
                       text-white rounded-full hover:bg-white/30 transition-all
                       hover:scale-110 z-10"
            >
              <X size={18} />
            </button>

            {/* Employee ID Badge */}
            <div className="absolute bottom-4 left-6">
              <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-lg text-sm">
                ID: {staff.employeeId}
              </span>
            </div>
          </div>

          {/* Profile Section - Overlapping */}
          <div className="relative -mt-16 px-6">
            <div className="flex items-end gap-6">
              {/* Profile Picture */}
              <div className="relative">
                <div
                  className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 
                              flex items-center justify-center text-white text-3xl font-bold
                              border-4 border-white dark:border-gray-900 shadow-xl overflow-hidden"
                >
                  {staff.photoUrl && !imageError ? (
                    <img
                      src={staff.photoUrl}
                      alt={staff.name}
                      className="w-full h-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    staff.name?.charAt(0).toUpperCase() || 'S'
                  )}
                </div>
                <div
                  className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white 
                              dark:border-gray-900 rounded-full"
                ></div>
              </div>

              {/* Name and Role */}
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {staff.name}
                  </h2>
                  <BadgeCheck size={20} className="text-[#4fd100]" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                  <Briefcase size={14} />
                  {staff.designation || staff.role}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(staff.status)}`}
                  >
                    {staff.status.replace('_', ' ')}
                  </span>
                  {staff.lastLogin && (
                    <span className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1">
                      <Clock size={12} />
                      Last login:{' '}
                      {new Date(staff.lastLogin).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Contact Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Contact Information
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {/* Email */}
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <label className="text-xs text-gray-500 dark:text-gray-300 mb-2 block">
                    Email Address
                  </label>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
                      <Mail size={14} className="text-[#4fd100]" />
                      <span className="truncate">{staff.email}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(staff.email, 'email')}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      {copied === 'email' ? (
                        <CheckCircle size={14} className="text-green-500" />
                      ) : (
                        <Copy size={14} className="text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Phone */}
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <label className="text-xs text-gray-500 dark:text-gray-300 mb-2 block">
                    Phone Number
                  </label>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
                      <Phone size={14} className="text-[#4fd100]" />
                      <span>{staff.phone || 'Not provided'}</span>
                    </div>
                    {staff.phone && (
                      <button
                        onClick={() => handleCopy(staff.phone!, 'phone')}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
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
              </div>
            </div>

            {/* Work Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Work Information
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                    Department
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white flex items-center gap-2">
                    <Building2 size={14} className="text-[#4fd100]" />
                    {staff.department}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                    Role
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white flex items-center gap-2">
                    <Award size={14} className="text-[#4fd100]" />
                    {staff.role}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                    Experience
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white flex items-center gap-2">
                    <Clock size={14} className="text-[#4fd100]" />
                    {staff.experience || 0} years
                  </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                    Join Date
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white flex items-center gap-2">
                    <Calendar size={14} className="text-[#4fd100]" />
                    {staff.joinDate || 'Not specified'}
                  </p>
                </div>
              </div>
            </div>

            {/* Skills */}
            {skillsArray.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Skills & Expertise
                </h3>
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Code2 size={18} className="text-[#4fd100] mt-0.5" />
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2">
                        {skillsArray.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-white dark:bg-gray-900 
                                     border border-gray-200 dark:border-gray-700
                                     rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Information */}
            {(staff.location || staff.education) && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Additional Information
                </h3>
                <div className="space-y-2">
                  {staff.location && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                        Location
                      </p>
                      <p className="text-sm text-gray-900 dark:text-white flex items-center gap-2">
                        <MapPin size={14} className="text-[#4fd100]" />
                        {staff.location}
                      </p>
                    </div>
                  )}
                  {staff.education && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                        Education
                      </p>
                      <p className="text-sm text-gray-900 dark:text-white flex items-center gap-2">
                        <GraduationCap size={14} className="text-[#4fd100]" />
                        {staff.education}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div
            className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800 
                        flex items-center justify-end gap-3"
          >
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300
                       hover:bg-gray-200 dark:hover:bg-gray-700
                       rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
