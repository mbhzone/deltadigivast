/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { getStoredUser } from '@/utils/auth.utils';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, Filter, Phone, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  FiBriefcase,
  FiClock,
  FiHash,
  FiLogIn,
  FiLogOut,
  FiUser,
} from 'react-icons/fi';

export default function EmployeeDashboard() {
  const [attendances, setAttendances] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const user = getStoredUser();
  const API = process.env.NEXT_PUBLIC_BACKEND_URL;
  // ================= GET MY ATTENDANCE =================
  const getMyAttendance = async () => {
    const token =
      localStorage.getItem('accessToken') ||
      sessionStorage.getItem('accessToken');
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/v1/attendance/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const records = res?.data?.records || res?.data?.data?.records || [];
      setAttendances(records);
    } catch (error) {
      console.log('Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getMyAttendance();
  }, []);

  // Format date
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section with Welcome and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="
      relative overflow-hidden rounded-md 
      bg-gradient-to-br 
      from-white to-gray-100
      dark:from-gray-800 dark:to-gray-900
      p-6 sm:p-8 flex-1
      shadow-sm dark:shadow-none
      border border-gray-200 dark:border-gray-800
    "
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#6efd0b]/20 to-[#4fd100]/20 rounded-full blur-3xl transform translate-x-32 -translate-y-32" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-[#6efd0b]/20 dark:text-[#6efd0b] rounded-full text-xs font-medium">
                EMPLOY DASHBOARD
              </span>

              <span className="px-3 py-1 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full text-xs">
                {new Date().toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, {user?.name} 👋
            </h1>

            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl">
              Here’s what’s happening in your agency today. Track performance,
              manage leads, and stay on top of your projects.
            </p>
          </div>
        </motion.div>
      </div>
      {/* Main Content */}
      <div className="py-4  space-y-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Schedule and Tasks */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Schedule */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-md  border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    My Attendances{' '}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={'/dashboard/employ/my-attendance'}>
                    {' '}
                    <button className="px-4 py-2 bg-gradient-to-r from-[#6efd0b] to-[#4fd100] text-white dark:text-black rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                      View All Attendances
                    </button>
                  </Link>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-[700px] w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        <div className="flex items-center space-x-1">
                          <FiUser className="w-3 h-3" />
                          <span>Name</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        <div className="flex items-center space-x-1">
                          <FiHash className="w-3 h-3" />
                          <span>ID</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        <div className="flex items-center space-x-1">
                          <FiBriefcase className="w-3 h-3" />
                          <span>Designation</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        <div className="flex items-center space-x-1">
                          <FiLogIn className="w-3 h-3" />
                          <span>Check In</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        <div className="flex items-center space-x-1">
                          <FiLogOut className="w-3 h-3" />
                          <span>Check Out</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        <div className="flex items-center space-x-1">
                          <FiClock className="w-3 h-3" />
                          <span>Duration</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {loading ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center">
                          <div className="flex justify-center">
                            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        </td>
                      </tr>
                    ) : attendances.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-6 py-8 text-center text-gray-500 dark:text-gray-300"
                        >
                          No attendance records found
                        </td>
                      </tr>
                    ) : (
                      attendances.slice(0, 6).map((item: any) => {
                        const checkInTime = new Date(item.checkIn);
                        const checkOutTime = item.checkOut
                          ? new Date(item.checkOut)
                          : null;

                        // Calculate duration
                        let duration = '';
                        if (checkOutTime) {
                          const diffMs =
                            checkOutTime.getTime() - checkInTime.getTime();
                          const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
                          const diffMins = Math.floor(
                            (diffMs % (1000 * 60 * 60)) / (1000 * 60),
                          );
                          duration = `${diffHrs}h ${diffMins}m`;
                        }

                        return (
                          <tr
                            key={item.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {formatDate(item.checkIn)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {item.employeeName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                              {item.employeeId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                              {item.designation}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg">
                                {checkInTime.toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: true,
                                })}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {checkOutTime ? (
                                <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
                                  {checkOutTime.toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true,
                                  })}
                                </span>
                              ) : (
                                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-lg">
                                  Working
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                              {duration || '-'}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Profile, Activity, Achievements */}
          <div className="space-y-6">
            {/* Employee Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800"
            >
              <div className="text-center">
                <div className="relative inline-block">
                  <Image
                    src={user?.photoUrl || '/default-avatar.png'}
                    alt={user?.name || 'User'}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-2xl mx-auto border-4 border-white dark:border-gray-800 shadow-lg"
                  />
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-white dark:border-gray-800 rounded-full" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4">
                  {user.name}
                </h3>
                <p className="text-sm text-[#4fd100] font-medium">
                  {user.role}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                  {user.department}
                </p>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 mt-6 pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {user.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {user.phone}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Joined {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
