/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { motion } from 'framer-motion';
import {
  Users,
  Briefcase,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  BookOpen,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useEffect, useState } from 'react';
import { getStoredUser } from '@/utils/auth.utils';
import axios from 'axios';

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('week');
  const [statsData, setStatsData] = useState<any>(null);
  const user = getStoredUser();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/stats`,
        );

        setStatsData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);
  const stats = [
    {
      title: 'Total Staff',
      value: statsData?.users || 0,
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-500/10',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Projects',
      value: statsData?.portfolios || 0,
      change: '+8%',
      trend: 'up',
      icon: Briefcase,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-500/10',
      textColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      title: 'blogs',
      value: statsData?.blogs || 0,
      change: '+23%',
      trend: 'up',
      icon: FileText,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-500/10',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Courses',
      value: statsData?.courses || 0,
      change: '+5%',
      trend: 'up',
      icon: BookOpen,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-500/10',
      textColor: 'text-orange-600 dark:text-orange-400',
    },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 42000, expenses: 28000 },
    { month: 'Feb', revenue: 45000, expenses: 30000 },
    { month: 'Mar', revenue: 48000, expenses: 32000 },
    { month: 'Apr', revenue: 52000, expenses: 35000 },
    { month: 'May', revenue: 49000, expenses: 33000 },
    { month: 'Jun', revenue: 56000, expenses: 38000 },
  ];

  const teamPerformance = [
    { name: 'Design', value: 85, color: '#6efd0b' },
    { name: 'Development', value: 92, color: '#4fd100' },
    { name: 'Marketing', value: 78, color: '#8bff3a' },
    { name: 'Sales', value: 70, color: '#2b9600' },
  ];

  return (
    <div className="space-y-6">
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
              <span className="px-3 py-1 bg-[#6efd0b]/20 dark:text-[#6efd0b]  rounded-full text-xs font-medium">
                ADMIN DASHBOARD
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

      {/* Stats Cards with Improved Design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-2 md:gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight;
          const trendColor =
            stat.trend === 'up' ? 'text-green-500' : 'text-red-500';

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative bg-white dark:bg-gray-900 rounded-md p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${stat.color}`}
              />

              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`${stat.textColor}`} size={24} />
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-50 dark:bg-green-500/10' : 'bg-red-50 dark:bg-red-500/10'}`}
                  >
                    <TrendIcon size={16} className={trendColor} />
                    <span className={`text-xs font-medium ${trendColor}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>

                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">
                  {stat.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>

                {/* Mini Chart Indicator */}
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-1 flex-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                      style={{ width: `${Math.random() * 40 + 60}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">vs last month</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-md p-6 border border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Revenue Overview
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Monthly revenue vs expenses
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={timeRange}
                onChange={e => setTimeRange(e.target.value)}
                className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6efd0b]/50"
              >
                <option value="week">Last 7 days</option>
                <option value="month">Last 30 days</option>
                <option value="quarter">Last quarter</option>
                <option value="year">This year</option>
              </select>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <Download size={18} className="text-gray-500" />
              </button>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#6efd0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6efd0b" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="expensesGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  opacity={0.1}
                />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#F9FAFB',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6efd0b"
                  fill="url(#revenueGradient)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#ef4444"
                  fill="url(#expensesGradient)"
                  strokeWidth={2}
                />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Team Performance Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-md p-6 border border-gray-200 dark:border-gray-800"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Team Performance
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
            Efficiency by department
          </p>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={teamPerformance}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {teamPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#F9FAFB',
                  }}
                />
              </RePieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 space-y-2">
            {teamPerformance.map((dept, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: dept.color }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {dept.name}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {dept.value}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
