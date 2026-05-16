/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getStoredToken, getStoredUser } from '@/utils/auth.utils';
import Sidebar from '../../components/module/shared/Sidebar';
import DashboardNavbar from '../../components/module/shared/DashboardNavbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check authentication
  useEffect(() => {
    const t = getStoredToken();
    const u = getStoredUser();

    if (!t || !u) {
      router.replace('/login');
      return;
    }

    Promise.resolve().then(() => {
      setToken(t);
      setUser(u);
      setHydrated(true);
    });
  }, [router]);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSidebarToggle = () => {
    if (isMobile) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="text-center">
          {/* Simple Spinner with your gradient */}
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-800"></div>
            <div
              className="absolute inset-0 rounded-full border-4 border-transparent 
                        border-t-[#6efd0b] border-r-[#8bff3a] animate-spin"
            ></div>
          </div>
        </div>
      </div>
    );
  }

  if (!token || !user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Desktop Sidebar - Always visible */}
      <div
        className={`
        hidden md:block
        ${isSidebarCollapsed ? 'w-20' : 'w-72'}
        transition-all duration-300
      `}
      >
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      {/* Mobile Sidebar - Slide out */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full z-50 md:hidden"
            >
              <Sidebar
                isCollapsed={false}
                isMobile={true}
                onClose={() => setIsMobileSidebarOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {' '}
        {/* min-w-0 prevents flex overflow */}
        {/* Navbar */}
        <DashboardNavbar
          sidebarCollapsed={isSidebarCollapsed}
          onSidebarToggle={handleSidebarToggle}
          isMobile={isMobile}
          user={user}
        />
        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-2 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className=""
            >
              {children}
              <Toaster position="top-right" richColors closeButton />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
