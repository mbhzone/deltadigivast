/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  RefreshCw,
} from 'lucide-react';
import axios from 'axios';

interface Attendance {
  id: string;
  employeeName: string;
  employeeId: string;
  department?: string;
  designation?: string;
  date?: string;
  checkIn?: string;
  checkOut?: string;
}

export default function AttendanceManagement() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const token =
    localStorage.getItem('accessToken') ||
    sessionStorage.getItem('accessToken');

  const API = process.env.NEXT_PUBLIC_BACKEND_URL;

  // ================= HELPER FUNCTIONS =================

  const formatBDTime = (utcTime?: string) => {
    if (!utcTime) return '-';
    return new Date(utcTime).toLocaleTimeString('en-US', {
      timeZone: 'Asia/Dhaka',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatBDDate = (utcTime?: string) => {
    if (!utcTime) return '-';
    return new Date(utcTime).toLocaleDateString('en-US', {
      timeZone: 'Asia/Dhaka',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
  };

  const calculateHours = (checkIn?: string, checkOut?: string) => {
    if (!checkIn || !checkOut) return '-';

    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();

    const hours = Math.floor(diff / (1000 * 60 * 60));

    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  const calculateStatus = (checkIn?: string, checkOut?: string) => {
    if (!checkIn) return 'absent'; // optional, later remove korte paro

    const checkInDate = new Date(checkIn);

    const officeStart = new Date(checkIn);
    officeStart.setHours(9, 0, 0, 0);

    if (!checkOut) return 'working';

    const hours =
      (new Date(checkOut).getTime() - checkInDate.getTime()) / (1000 * 60 * 60);

    const isLate = checkInDate > officeStart;

    // 🔥 MAIN LOGIC
    if (hours >= 8) {
      return isLate ? 'late-present' : 'present';
    }

    if (hours >= 4) return 'half-day';

    return 'incomplete';
  };

  const getStatusBadge = (status: string | undefined) => {
    const badges = {
      present: {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-700 dark:text-green-300',
        icon: CheckCircle,
        label: 'Present',
      },
      incomplete: {
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-700 dark:text-red-300',
        icon: XCircle,
        label: 'Incomplete',
      },
      'late-present': {
        bg: 'bg-yellow-100 dark:bg-yellow-900/30',
        text: 'text-yellow-700 dark:text-yellow-300',
        icon: Clock,
        label: 'Late Present',
      },
      absent: {
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-700 dark:text-red-300',
        icon: XCircle,
        label: 'Absent',
      },
      late: {
        bg: 'bg-yellow-100 dark:bg-yellow-900/30',
        text: 'text-yellow-700 dark:text-yellow-300',
        icon: Clock,
        label: 'Late Present',
      },
      'half-day': {
        bg: 'bg-orange-100 dark:bg-orange-900/30',
        text: 'text-orange-700 dark:text-orange-300',
        icon: Clock,
        label: 'Half Day',
      },
      working: {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-700 dark:text-blue-300',
        icon: Clock,
        label: 'Working',
      },
    };

    const badge = badges[status as keyof typeof badges] || badges.absent;

    const Icon = badge.icon;

    return (
      <span
        className={`flex items-center gap-1.5 px-3 py-1.5 ${badge.bg} ${badge.text} rounded-full text-xs font-medium w-fit`}
      >
        <Icon size={12} />
        {badge.label}
      </span>
    );
  };

  // ================= FETCH =================

  const fetchAttendance = async () => {
    try {
      setIsFetching(true);

      const res = await axios.get(`${API}/api/v1/attendance`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAttendance(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // ================= FILTER =================

  const filteredAttendance = attendance.filter(record => {
    const matchesSearch =
      record.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.designation?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = !dateFilter || record.checkIn?.startsWith(dateFilter);

    return matchesSearch && matchesDate;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8  transition-colors duration-300">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Attendance Management
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Track and manage employee attendance records
          </p>
        </div>

        {/* Filters Card */}
        <div className="bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-800 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by name, ID, department..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {/* Date Filter */}
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  size={18}
                />
                <input
                  type="date"
                  value={dateFilter}
                  onChange={e => setDateFilter(e.target.value)}
                  className="pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              {/* Refresh Button */}
              <button
                onClick={fetchAttendance}
                className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2"
              >
                <RefreshCw
                  size={18}
                  className={isFetching ? 'animate-spin' : ''}
                />
                Refresh
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || dateFilter) && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <Filter size={16} className="text-gray-400 dark:text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Active Filters:
              </span>

              {searchTerm && (
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-xs">
                  Search: {searchTerm}
                </span>
              )}

              {dateFilter && (
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-xs">
                  Date: {new Date(dateFilter).toLocaleDateString()}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Attendance Table */}
        <div className="bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Attendance Records ({filteredAttendance.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            {isFetching ? (
              <div className="flex justify-center items-center py-12">
                <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Designation
                    </th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Check In</th>
                    <th className="px-6 py-4">Check Out</th>
                    <th className="px-6 py-4">Hours</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredAttendance.map((record, index) => (
                    <tr key={record.id || index}>
                      <td className="px-6 py-4">{record.employeeName}</td>

                      <td className="px-6 py-4">{record.employeeId}</td>

                      <td className="px-6 py-4">{record.designation || '-'}</td>

                      <td className="px-6 py-4">
                        {formatBDDate(record.checkIn)}
                      </td>

                      <td className="px-6 py-4">
                        {formatBDTime(record.checkIn)}
                      </td>

                      <td className="px-6 py-4">
                        {record.checkOut
                          ? formatBDTime(record.checkOut)
                          : 'Active'}
                      </td>

                      <td className="px-6 py-4">
                        {calculateHours(record.checkIn, record.checkOut)}
                      </td>

                      <td className="px-6 py-4">
                        {getStatusBadge(
                          calculateStatus(record.checkIn, record.checkOut),
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
