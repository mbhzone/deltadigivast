'use client';

import React from 'react';
import {
  Play,
  Camera,
  Film,
  Video,
  Clapperboard,
  Calendar,
  Users,
  Star,
  Award,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export default function VideographyPage() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const services = [
    {
      icon: Film,
      title: '📣 Promotional & Commercial Video',
      description:
        'আপনার product বা service-এর জন্য high-impact promotional video। Facebook ও Instagram-এ run করার জন্য optimized। রাজশাহীর clothing shop, restaurant, real estate — সব sector-এ কাজ করেছি।',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Video,
      title: '🥭 Product Showcase & Food Video',
      description:
        'আপনার product সুন্দরভাবে present করুন। Organic food, mango, restaurant খাবার, clothing — product video দেখে মানুষ কিনতে উৎসাহিত হয়।',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Camera,
      title: '🎓 Educational & Explainer Video',
      description:
        'Coaching centre, medical institute, school — educational institution-এর জন্য explainer ও promotional video। Enrollment বাড়াতে সাহায্য করে।',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Clapperboard,
      title: '📱 Social Media Reels & Short Video',
      description:
        'Facebook Reel, Instagram Reel — short-form video content যা scroll থামিয়ে দেয়। রাজশাহীর local audience-এর জন্য Bangla-তে তৈরি',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const stats = [
    { label: 'Projects ', value: '100+', icon: Film },
    { label: ' Clients', value: '80+', icon: Users },
    { label: ' Experience', value: '1+', icon: Award },
    { label: 'Awards ', value: '1+', icon: Star },
  ];

  return (
    <div className="min-h-screen  transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-7 md:py-20">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#6efd0b]/5 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#6efd0b]/5 to-transparent"></div>

        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#6efd0b] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-3 lg:px-0">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Premium Badge */}
              <div className="inline-flex mb-2 md:mb-5">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6efd0b]/10 to-transparent border-l-4 border-[#6efd0b] rounded-r-lg text-sm font-medium text-lime-500 dark:text-[#6efd0b]">
                  <Sparkles size={16} />
                  Professional Video Production — রাজশাহী
                </span>
              </div>

              <h1 className="text-2xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                বাস্তবে রূপদিন আপনার
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6efd0b] to-[#2e9e00]">
                  {' '}
                  সপ্নকে
                </span>
              </h1>

              <p className=" text-gray-600 dark:text-gray-400 mb-8">
                একটি ভালো video আপনার business-এর গল্প বদলে দিতে পারে। আমাদের
                নিজস্ব studio বা Outdoor shoot, professional editing এবং result
                driven
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href={'/portfolio'}>
                  <button className="px-8 py-4 bg-[#6efd0b] text-gray-900 rounded-xl font-semibold hover:bg-[#4fd100] transition flex items-center gap-2">
                    <Play size={18} />
                    আমাদের Video Portfolio দেখুন
                  </button>
                </Link>

                <Link href={'/contact'}>
                  <button className="px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition flex items-center gap-2">
                    <Calendar size={18} />
                    Video Project শুরু করুন →
                  </button>
                </Link>
              </div>
            </div>

            <div className="">
              <div className="relative w-full overflow-hidden rounded-sm md:rounded-2xl">
                <video
                  id="heroVideo"
                  src="/videos/hero-video.mp4"
                  poster="https://images.unsplash.com/photo-1536240474400-5ddbcd0a1b56?q=80&w=1000"
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                />
              </div>
            </div>
          </div>
        </div>
        {/* Premium Bottom Decorative Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6efd0b]/30 to-transparent"></div>
      </section>

      {/* Stats - Optimized Colors */}
      <section className="py-12 md:py-16 lg:py-20 bg-[#FAFFF7] dark:bg-gray-950">
        <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-0">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`
            text-center  sm:p-3 md:p-4 transition-all duration-300
            ${index < 3 ? 'border-r border-gray-200 dark:border-gray-800' : ''}
          `}
              >
                {/* Icon with proper light/dark colors */}
                <div className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-[#6efd0b]/10 dark:bg-[#6efd0b]/10 rounded-md sm:rounded-lg mb-1 sm:mb-2 transition-all duration-300 group-hover:scale-110">
                  <stat.icon className="w-10 h-10 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#2e7d00] dark:text-[#6efd0b]" />
                </div>

                {/* Value */}
                <div className="text-sm md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>

                {/* Label - Improved visibility */}
                <div className="text-sm text-gray-600 dark:text-gray-400 leading-tight mt-0.5 sm:mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="pb-10 md:pb-20 ">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              VIDEO SERVICES WE OFFER
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className=" p-6 rounded-xs shadow-xs border border-gray-200 dark:border-gray-800"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <service.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {service.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
