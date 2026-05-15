'use client';

import React from 'react';
import Image from 'next/image';
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
} from 'lucide-react';

export default function VideographyPage() {
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
    { label: 'Projects Completed', value: '100+', icon: Film },
    { label: 'Happy Clients', value: '80+', icon: Users },
    { label: 'Years Experience', value: '1+', icon: Award },
    { label: 'Awards Won', value: '1+', icon: Star },
  ];

  return (
    <div className="min-h-screen  transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden  py-24">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#6efd0b]/5 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#6efd0b]/5 to-transparent"></div>

        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#6efd0b] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#6efd0b]/10 text-[#6efd0b] rounded-full text-sm font-medium mb-6">
                <Camera size={16} />
                Professional Video Production — রাজশাহী
              </span>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                বাস্তবে রূপদিন আপনার
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6efd0b] to-[#2e9e00]">
                  {' '}
                  সপ্নকে
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                একটি ভালো video আপনার business-এর গল্প বদলে দিতে পারে। আমাদের
                নিজস্ব studio বা Outdoor shoot, professional editing এবং result
                driven
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-[#6efd0b] text-gray-900 rounded-xl font-semibold hover:bg-[#4fd100] transition flex items-center gap-2">
                  <Play size={18} />
                  আমাদের Video Portfolio দেখুন
                </button>

                <button className="px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition flex items-center gap-2">
                  <Calendar size={18} />
                  Video Project শুরু করুন →
                </button>
              </div>
            </div>

            {/* Video */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video">
                <Image
                  src="https://images.unsplash.com/photo-1574717024453-354056afaffc?q=80&w=1000"
                  alt="Video"
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <button className="w-20 h-20 bg-[#6efd0b] rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-gray-900 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Premium Bottom Decorative Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6efd0b]/30 to-transparent"></div>
      </section>

      {/* Stats */}
      <section className="py-16 ">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#6efd0b]/10 rounded-xl mb-3">
                  <stat.icon className="w-5 h-5 text-[#6efd0b]" />
                </div>

                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400">
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
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
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
