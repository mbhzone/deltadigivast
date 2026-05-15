'use client';

import { getStoredUser } from '@/utils/auth.utils';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MoreVertical, Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Loading from '../shared/loading';

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
}

export default function ManagerDashboard() {
  const user = getStoredUser();
  const [staff, setStaff] = useState<Staff[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const token =
    localStorage.getItem('accessToken') ||
    sessionStorage.getItem('accessToken');
  const API = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setIsFetching(true);
      const res = await axios.get(`${API}/api/v1/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStaff(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 ">
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
      border border-gray-200 dark:border-gray-700
    "
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#6efd0b]/20 to-[#4fd100]/20 rounded-full blur-3xl transform translate-x-32 -translate-y-32" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-[#6efd0b]/20 dark:text-[#6efd0b] rounded-full text-xs font-medium">
                MANAGER DASHBOARD
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

      {/* Main Grid */}
      <div className="">
        {/* Team Members */}
        <div className=" bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Employees
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                  {staff.length} total employees
                </p>
              </div>
            </div>

            <div
              className={`overflow-y-auto ${staff.length > 6 ? 'max-h-[520px]' : ''}`}
            >
              {isFetching ? (
                <div className="flex justify-center items-center py-20">
                  <Loading />
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 sticky top-0 z-10">
                    <tr>
                      <th className="text-left px-6 py-3 font-medium">
                        Employee
                      </th>
                      <th className="text-left px-6 py-3 font-medium">
                        Department
                      </th>
                      <th className="text-left px-6 py-3 font-medium">
                        Designation
                      </th>
                      <th className="text-left px-6 py-3 font-medium">
                        Experience
                      </th>
                      <th className="text-left px-6 py-3 font-medium">
                        Status
                      </th>
                      <th className="text-right px-6 py-3 font-medium">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {staff.map(member => (
                      <tr
                        key={member.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Image
                              src={member.photoUrl || '/avatar.png'}
                              alt={member.name}
                              width={40}
                              height={40}
                              className="rounded-full object-cover border"
                            />

                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {member.name}
                              </p>

                              <p className="text-xs text-gray-500 flex items-center gap-1">
                                <Mail size={12} />
                                {member.email}
                              </p>

                              <p className="text-xs text-gray-500 flex items-center gap-1">
                                <Phone size={12} />
                                {member.phone}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {member.department}
                        </td>

                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {member.designation}
                        </td>

                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {member.experience} yrs
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 text-xs rounded-full font-medium ${
                              member.status === 'ACTIVE'
                                ? 'bg-green-100 text-green-600'
                                : member.status === 'ON_LEAVE'
                                  ? 'bg-yellow-100 text-yellow-600'
                                  : 'bg-red-100 text-red-600'
                            }`}
                          >
                            {member.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition">
                            <MoreVertical size={18} className="text-gray-500" />
                          </button>
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
    </div>
  );
}
