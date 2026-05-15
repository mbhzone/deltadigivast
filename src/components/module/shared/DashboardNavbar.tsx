'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  Search,
  User,
  Moon,
  Sun,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Image from 'next/image';

interface User {
  name?: string;
  role?: string;
  photoUrl?: string;
}

interface DashboardNavbarProps {
  onSidebarToggle?: () => void;
  sidebarCollapsed?: boolean;
  isMobile?: boolean;
  user?: User;
}

export default function DashboardNavbar({
  onSidebarToggle,
  sidebarCollapsed,
  isMobile = false,
  user,
}: DashboardNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      )
        if (
          searchRef.current &&
          !searchRef.current.contains(event.target as Node)
        ) {
          setIsSearchOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  // Format time
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <nav
        className={`
          fixed top-0 right-0 z-30 h-16
          bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl
          border-b border-gray-200 dark:border-gray-800
          flex items-center px-3 sm:px-4 lg:px-6
          transition-all duration-300
          ${isScrolled ? 'shadow-md' : ''}
        `}
        style={{
          left: isMobile ? 0 : sidebarCollapsed ? 80 : 280,
        }}
      >
        {/* Left Section */}
        <div className="flex items-center flex-1 min-w-0">
          {' '}
          {/* min-w-0 prevents overflow */}
          {/* Sidebar Toggle */}
          <button
            onClick={onSidebarToggle}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 
                     text-gray-600 dark:text-gray-300 transition-colors flex-shrink-0 mr-2"
          >
            {isMobile ? (
              <Menu size={20} />
            ) : sidebarCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
          {/* Time Display */}
          <div className=" ">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {formattedTime}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-300">
              {formattedDate}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 
                     text-gray-600 dark:text-gray-300 transition-colors
                     hidden sm:block"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Fullscreen Toggle - Desktop */}
          <button
            onClick={toggleFullscreen}
            className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 
                     text-gray-600 dark:text-gray-300 transition-colors"
          >
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 sm:space-x-3 p-1 pr-2 rounded-lg
                       hover:bg-gray-100 dark:hover:bg-gray-800
                       transition-colors group"
            >
              <div
                className="w-9 h-9 rounded-full overflow-hidden 
                bg-gradient-to-br from-[#6efd0b] via-[#8bff3a] to-[#4fd100]
                flex items-center justify-center
                text-white font-semibold text-sm
                shadow-md"
              >
                {user?.photoUrl ? (
                  <Image
                    src={user.photoUrl}
                    width={36}
                    height={36}
                    alt={user?.name || 'User'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="uppercase">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-left min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[120px]">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-300 capitalize truncate">
                  {user?.role || 'Administrator'}
                </p>
              </div>
              {/* <ChevronDown
                size={16}
                className="text-gray-400 dark:text-gray-600 
                                               hidden sm:block flex-shrink-0"
              /> */}
            </button>

            {/* Profile Dropdown Menu */}
            {/* <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-56
                           bg-white dark:bg-gray-800 rounded-lg shadow-xl
                           border border-gray-200 dark:border-gray-700
                           overflow-hidden z-50"
                >
                  <h1>Hello </h1>
                </motion.div>
              )}
            </AnimatePresence> */}
          </div>
        </div>
      </nav>
    </>
  );
}
