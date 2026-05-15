/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { getStoredUser } from '@/utils/auth.utils';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import {
  FiLogIn,
  FiLogOut,
  FiClock,
  FiUser,
  FiHash,
  FiBriefcase,
  FiCheckCircle,
} from 'react-icons/fi';

export default function MyAttendance() {
  const user = getStoredUser();
  const token =
    localStorage.getItem('accessToken') ||
    sessionStorage.getItem('accessToken');

  const [attendances, setAttendances] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const API = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ================= GET MY ATTENDANCE =================
  const getMyAttendance = async () => {
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

  // ================= CHECK IN =================
  const handleCheckIn = async () => {
    try {
      setLoading(true);
      const now = new Date();

      const body = {
        employeeName: user?.name,
        employeeId: user?.employeeId,
        designation: user?.designation,
        checkIn: now,
        checkOut: null,
      };

      await axios.post(`${API}/api/v1/attendance`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      toast.success('Successfully checked in!', {
        description: `Checked in at ${now.toLocaleTimeString()}`,
      });
      getMyAttendance();
    } catch (error: any) {
      toast.error('Check-in failed', {
        description: error.response?.data?.message || 'Please try again',
      });
    } finally {
      setLoading(false);
    }
  };

  // ================= CHECK OUT =================
  const handleCheckOut = async () => {
    try {
      setLoading(true);
      const latestRecord = attendances.find(a => !a.checkOut);

      if (!latestRecord) {
        toast.error('No active check-in found!');
        return;
      }

      const now = new Date();
      const body = {
        checkOut: now.toISOString(),
      };

      await axios.patch(`${API}/api/v1/attendance/${latestRecord.id}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('Successfully checked out!', {
        description: `Checked out at ${now.toLocaleTimeString()}`,
      });
      getMyAttendance();
    } catch (error) {
      toast.error('Check-out failed', {
        description: 'Please try again',
      });
    } finally {
      setLoading(false);
    }
  };

  // Check if user is already checked in today
  const isCheckedIn = attendances.some(a => !a.checkOut);

  // Format date
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900  transition-colors duration-300">
      <div className="">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Attendance
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Track your daily attendance and work hours
          </p>
        </div>

        {/* Current Time & Status Card */}
        <div className="bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <FiClock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Current Time
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {currentTime.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true,
                  })}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {currentTime.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-4 md:mt-0">
              <button
                onClick={handleCheckIn}
                disabled={loading || isCheckedIn}
                className={`px-6 py-3 rounded-xl font-medium flex items-center space-x-2 transition-all duration-200 ${
                  isCheckedIn
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/25'
                }`}
              >
                <FiLogIn className="w-5 h-5" />
                <span>Check In</span>
              </button>

              <button
                onClick={handleCheckOut}
                disabled={loading || !isCheckedIn}
                className={`px-6 py-3 rounded-xl font-medium flex items-center space-x-2 transition-all duration-200 ${
                  !isCheckedIn
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/25'
                }`}
              >
                <FiLogOut className="w-5 h-5" />
                <span>Check Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Today's Status (if checked in) */}
        {isCheckedIn && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-8">
            <div className="flex items-center space-x-3">
              <FiCheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <p className="text-green-800 dark:text-green-200">
                You are currently checked in. Don t forget to check out at the
                end of the day!
              </p>
            </div>
          </div>
        )}

        {/* Attendance Records */}
        <div className="bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Attendance History
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
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
                  attendances.map((item: any) => {
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

          {/* Summary Footer */}
          <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">
                Total Records: {attendances.length}
              </span>
              <span className="text-gray-600 dark:text-gray-300">
                Today: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
