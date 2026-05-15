'use client';

import {
  Mail,
  Phone,
  Calendar,
  X,
  Building2,
  Tag,
  Copy,
  CheckCircle,
} from 'lucide-react';
import { useState } from 'react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  from: string;
  source: string;
  date: string;
}

interface Props {
  lead: Lead | null;
  onClose: () => void;
}

export default function LeadViewModal({ lead, onClose }: Props) {
  const [copied, setCopied] = useState<string | null>(null);

  if (!lead) return null;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const getStatusColor = (status: string | undefined) => {
    // Safely handle undefined or null status
    const statusLower = status?.toLowerCase() || '';

    switch (statusLower) {
      case 'new':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400';
      case 'qualified':
        return 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400';
      case 'lost':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-300';
    }
  };

  // Format display values with fallbacks
  const displayName = lead.name || 'Unknown';
  const displayEmail = lead.email || 'No email provided';
  const displayPhone = lead.phone || 'No phone provided';
  const displayCompany = lead.company || 'No company';
  const displayStatus = lead.from || 'unknown';
  const displayDate = lead.date || 'No date';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-md w-full max-w-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative h-20 ">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 bg-white/20 backdrop-blur-sm rounded-lg 
                     hover:bg-white/30 transition-colors"
          >
            <X size={18} className="text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Avatar and Name */}
          <div className="flex items-center gap-4 -mt-8 mb-6">
            <div
              className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 
                          flex items-center justify-center text-white text-xl font-bold
                          border-4 border-white dark:border-gray-900 shadow-lg"
            >
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="pt-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {displayName}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-300 flex items-center gap-1">
                <Building2 size={14} />
                {displayCompany}
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="space-y-3">
            {/* Email */}
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#4fd100]" />
                <span className="text-sm text-gray-700 dark:text-gray-300 break-all">
                  {displayEmail}
                </span>
              </div>
              {lead.email && (
                <button
                  onClick={() => handleCopy(lead.email, 'email')}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg flex-shrink-0"
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
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#4fd100]" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {displayPhone}
                </span>
              </div>
              {lead.phone && (
                <button
                  onClick={() => handleCopy(lead.phone, 'phone')}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg flex-shrink-0"
                >
                  {copied === 'phone' ? (
                    <CheckCircle size={14} className="text-green-500" />
                  ) : (
                    <Copy size={14} className="text-gray-400" />
                  )}
                </button>
              )}
            </div>

            {/* Status and Source */}
            <div className="">
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                  Address
                </p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.from)}`}
                >
                  {displayStatus}
                </span>
              </div>
            </div>
            {/* Message */}
            <div className="">
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                  Message
                </p>
                <span className={`px-3 py-1 rounded-full text-xs font-medium `}>
                  {displayCompany}
                </span>
              </div>
            </div>

            {/* Date */}
            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                Created
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Calendar size={14} className="text-[#4fd100]" />
                {formatDate(displayDate)}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 
                       rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Don't forget to import missing icons
import { Globe, User, Send, Star } from 'lucide-react';
