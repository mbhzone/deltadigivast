'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, HelpCircle } from 'lucide-react';
import { getStoredUser } from '@/utils/auth.utils';
import { dashboardRoutes } from '@/routes/routes';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface SidebarProps {
  isCollapsed: boolean;
  isMobile?: boolean;
  onToggle?: () => void;
  onClose?: () => void;
}

export default function Sidebar({
  isCollapsed,
  isMobile = false,
  onClose,
}: SidebarProps) {
  const user = getStoredUser();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!user || !mounted) return null;

  const routes = dashboardRoutes[user.role] || [];

  const handleLogout = () => {
    // Remove from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    // Remove from sessionStorage
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('user');

    // Optional: clear everything (if needed)
    // localStorage.clear();
    // sessionStorage.clear();

    // Redirect properly (Next.js way)
    window.location.href = '/login';
  };

  return (
    <aside
      className={`
        h-screen bg-white dark:bg-gray-900 
        border-r border-gray-200 dark:border-gray-800
        flex flex-col
        transition-all duration-300
        ${isCollapsed ? 'w-20' : 'w-72'}
        ${isMobile ? 'shadow-2xl' : ''}
        fixed md:static
      `}
    >
      {/* Logo Section */}
      <div
        className={`
        flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-800
        ${isCollapsed ? 'justify-center' : 'justify-between'}
        flex-shrink-0
      `}
      >
        <div
          className={`flex items-center ${isCollapsed ? '' : 'space-x-3'} min-w-0`}
        >
          {/* Logo */}
          <div>
            <Image
              src="/image/logo.png"
              width={24}
              height={24}
              className="max-h-6"
              alt="Delta Digivast"
            />
          </div>

          {/* Brand Name - Hidden when collapsed */}
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="overflow-hidden"
            >
              <h2
                className="text-xl font-bold bg-gradient-to-r from-[#6efd0b] to-[#4fd100] 
                           bg-clip-text text-transparent truncate"
              >
                Delta Digivast
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-300 capitalize truncate">
                {user.role}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 custom-scrollbar">
        <ul className="space-y-1">
          {routes.map(route => {
            const isActive = pathname === route.path;

            return (
              <li key={route.path}>
                <Link
                  href={route.path}
                  onClick={isMobile ? onClose : undefined}
                  className={`
                    flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}
                    px-3 py-3 rounded-xs
                    transition-all duration-200
                    group relative
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-[#6efd0b]/20 via-[#8bff3a]/10 to-transparent dark:from-[#6efd0b]/30 dark:via-[#8bff3a]/20'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 w-1 h-8 bg-gradient-to-b from-[#6efd0b] to-[#4fd100] 
                               rounded-r-full"
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Icon */}
                  <span
                    className={`
    ${
      isActive
        ? 'text-[#4fd100] dark:text-[#6efd0b]'
        : 'text-gray-500 dark:text-gray-300 group-hover:text-[#6efd0b]'
    }
    transition-colors duration-200 flex-shrink-0
  `}
                  >
                    <route.icon size={20} />
                  </span>

                  {/* Label - Hidden when collapsed */}
                  {!isCollapsed && (
                    <span
                      className={`
                      flex-1 text-sm font-medium truncate
                      ${
                        isActive
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-700 dark:text-gray-300'
                      }
                    `}
                    >
                      {route.name}
                    </span>
                  )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div
                      className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white 
                                  text-xs rounded-md opacity-0 invisible group-hover:opacity-100 
                                  group-hover:visible transition-all duration-200 whitespace-nowrap
                                  shadow-lg z-50"
                    >
                      {route.name}
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div
        className={`
        border-t border-gray-200 dark:border-gray-800 p-3
        ${isCollapsed ? 'text-center' : ''}
        flex-shrink-0
      `}
      >
        {/* Help Link */}
        <Link
          href="#"
          onClick={isMobile ? onClose : undefined}
          className={`
            flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}
            px-3 py-3 rounded-xl
            text-gray-700 dark:text-gray-300
            hover:bg-gray-100 dark:hover:bg-gray-800
            transition-all duration-200
            group relative mb-1
          `}
        >
          <HelpCircle
            size={20}
            className="text-gray-500 dark:text-gray-300 
                                         group-hover:text-[#6efd0b] transition-colors flex-shrink-0"
          />
          {!isCollapsed && (
            <span className="text-sm truncate">Help & Support</span>
          )}
          {isCollapsed && (
            <div
              className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white 
                          text-xs rounded-md opacity-0 group-hover:opacity-100 
                          transition-opacity whitespace-nowrap z-50"
            >
              Help & Support
            </div>
          )}
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`
            w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}
            px-3 py-3 rounded-xl
            text-gray-700 dark:text-gray-300
            hover:bg-red-50 dark:hover:bg-red-900/20
            hover:text-red-600 dark:hover:text-red-400
            transition-all duration-200
            group relative
          `}
        >
          <LogOut
            size={20}
            className="group-hover:scale-110 transition-transform flex-shrink-0"
          />
          {!isCollapsed && <span className="text-sm truncate">Logout</span>}
          {isCollapsed && (
            <div
              className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white 
                          text-xs rounded-md opacity-0 group-hover:opacity-100 
                          transition-opacity whitespace-nowrap z-50"
            >
              Logout
            </div>
          )}
        </button>
      </div>

      {/* Version Info */}
      {isCollapsed && (
        <div className="py-2 text-center flex-shrink-0">
          <span className="text-xs text-gray-400 dark:text-gray-600">
            v1.0.0
          </span>
        </div>
      )}
    </aside>
  );
}
