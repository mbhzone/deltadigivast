/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { userService } from '@/service/user.service';
import { getStoredUser } from '@/utils/auth.utils';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react'; // spinner icon
import { toast, Toaster } from 'sonner';

interface LoginProps {
  onLogin?: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const user = getStoredUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);

      const { accessToken, user } = await userService.login(email, password);

      if (rememberMe) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('user', JSON.stringify(user));
      }

      toast.success('Login successful!'); // ✅ Sonner success toast
      router.replace('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError('Something went wrong. Please try again.');
      toast.error('Login failed! Please check your credentials.'); // ✅ Sonner error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#6efd0b]/20 via-[#8bff3a]/20 to-[#4fd100]/20 dark:from-[#6efd0b]/10 dark:via-[#8bff3a]/10 dark:to-[#4fd100]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#6efd0b]/20 via-[#8bff3a]/20 to-[#4fd100]/20 dark:from-[#6efd0b]/10 dark:via-[#8bff3a]/10 dark:to-[#4fd100]/10 rounded-full blur-3xl" />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-200 dark:border-gray-800">
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#6efd0b] via-[#8bff3a] to-[#4fd100] bg-clip-text text-transparent">
              Delta Digivast Login
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Sign in to continue to your account
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 dark:text-red-400 text-sm bg-red-100 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-700"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6efd0b]/50 transition-all duration-200"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6efd0b]/50 transition-all duration-200"
                placeholder="••••••••"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-[#6efd0b] focus:ring-[#6efd0b]/50 bg-gray-50 dark:bg-gray-700/50"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Remember me
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#6efd0b] via-[#8bff3a] to-[#4fd100] hover:from-[#4fd100] hover:via-[#6efd0b] hover:to-[#8bff3a] text-gray-700  font-semibold text-lg shadow-lg shadow-[#6efd0b]/30 dark:shadow-[#6efd0b]/20 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6efd0b] focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center justify-center space-x-2`}
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              <span>{loading ? 'Signing In...' : 'Sign In'}</span>
            </button>
          </form>
        </div>
      </motion.div>

      {/* Sonner Toast */}
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
};

export default Login;
