'use client';

import React from 'react';
import Image from 'next/image';
import {
  Code2,
  Layout,
  ShoppingBag,
  Zap,
  Globe,
  Smartphone,
  Search,
  CheckCircle,
  Rocket,
  Users,
  Award,
  Clock,
  Monitor,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import CtaSection from '@/components/module/shared/CtaSection';

export default function WebDevelopmentPage() {
  const services = [
    {
      icon: Layout,
      title: 'Custom Website Design',
      description:
        'আপনার ব্যবসার জন্য একদম ইউনিক এবং আধুনিক ডিজাইন। রাজশাহীর clothing shop, restaurant বা coaching centre — সবার জন্য আমরা দিচ্ছি প্রিমিয়াম লুকিং ওয়েবসাইট।',
      features: [
        'Mobile responsive design',
        'Modern UI/UX elements',
        'Interactive layouts',
        'Brand color integration',
      ],
      color: 'from-blue-500 to-cyan-500',
      stats: 'Custom UX',
    },
    {
      icon: ShoppingBag,
      title: 'E-Commerce Solutions',
      description:
        'অনলাইনে পণ্য বিক্রির জন্য পূর্ণাঙ্গ অনলাইন শপ। ইনভেন্টরি ম্যানেজমেন্ট, অর্ডার ট্র্যাকিং এবং সহজ পেমেন্ট সিস্টেমের সুবিধা।',
      features: [
        'Product management system',
        'Cart & Checkout flow',
        'Payment gateway setup',
        'Sales analytics',
      ],
      color: 'from-purple-500 to-pink-500',
      stats: 'Sales ready',
    },
    {
      icon: Rocket,
      title: 'Landing Page Design',
      description:
        'আপনার নির্দিষ্ট অফার বা সার্ভিসের জন্য হাই-কনভার্টিং ল্যান্ডিং পেজ। যা আপনার অ্যাড ক্যাম্পেইন থেকে আসা ভিজিটরকে কাস্টমারে রূপান্তর করবে।',
      features: [
        'Lead capture forms',
        'Clear call-to-action (CTA)',
        'Fast loading speed',
        'A/B tested layouts',
      ],
      color: 'from-green-500 to-emerald-500',
      stats: 'High conversion',
    },
    {
      icon: Settings,
      title: 'CMS & Website Management',
      description:
        'খুব সহজে ওয়েবসাইট কন্ট্রোল করার জন্য ড্যাশবোর্ড। কোনো কোডিং ছাড়াই আপনি নিজে ছবি বা লেখা পরিবর্তন করতে পারবেন।',
      features: [
        'Easy-to-use Dashboard',
        'Content update training',
        'Technical support',
        'Regular backups',
      ],
      color: 'from-orange-500 to-red-500',
      stats: 'User friendly',
    },
  ];

  const stats = [
    { label: 'Websites Launched', value: '20+', icon: Globe },
    { label: 'Happy Clients', value: '15+', icon: Users },
    { label: 'Responsive Score', value: '100%', icon: Smartphone },
    { label: 'Uptime Support', value: '24/7', icon: Clock },
  ];

  const whyChooseUs = [
    {
      title: 'রাজশাহী ভিত্তিক সার্ভিস',
      description:
        'আমরা সরাসরি রাজশাহীতে বসে সার্ভিস দিই। যেকোনো প্রয়োজনে আপনি আমাদের অফিসে এসে আলোচনা করতে পারবেন।',
      icon: Globe,
    },
    {
      title: 'Super Fast Loading',
      description:
        'আমরা লেটেস্ট টেকনোলজি (Next.js/React) ব্যবহার করি, ফলে আপনার ওয়েবসাইট হবে সুপার ফাস্ট এবং স্মুথ।',
      icon: Zap,
    },
    {
      title: 'SEO Friendly Code',
      description:
        'ওয়েবসাইট তৈরির সময়ই আমরা এসইও অপটিমাইজেশন নিশ্চিত করি যাতে গুগল সার্চে আপনার ব্যবসা আগে থাকে।',
      icon: Search,
    },
    {
      title: 'Affordable Pricing',
      description:
        'রাজশাহীর লোকাল ছোট-বড় সব ব্যবসার কথা মাথায় রেখে আমাদের প্যাকেজগুলো সাজানো হয়েছে।',
      icon: Award,
    },
  ];

  return (
    <div className="min-h-screen  transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#FAFFF7] to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        {/* Premium Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#6efd0b02_25%,transparent_25%,transparent_75%,#6efd0b02_75%,#6efd0b02),linear-gradient(45deg,#6efd0b02_25%,transparent_25%,transparent_75%,#6efd0b02_75%,#6efd0b02)] bg-[size:60px_60px] bg-[position:0_0,30px_30px] opacity-30"></div>

        <div className="container relative mx-auto px-3 md:px-0 py-10 md:py-20 ">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#6efd0b]/10 text-[#6efd0b] rounded-full text-sm font-medium mb-6">
                <Code2 size={16} />
                Web Design & Development — রাজশাহী
              </span>

              <h1 className="text-2xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                আপনার Business-এর জন্য
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6efd0b] to-[#2e9e00]">
                  {' '}
                  আধুনিক ও ফাস্ট ওয়েবসাইট
                </span>
              </h1>

              <p className=" text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                একটি প্রফেশনাল ওয়েবসাইট মানেই কাস্টমারের বিশ্বাস। রাজশাহীর local
                business-এর জন্য আমরা তৈরি করি Mobile-responsive, Fast এবং
                SEO-friendly ওয়েবসাইট।
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href={'/contact'}>
                  <button className="px-4 md:px-8 py-2 mdpy-4 bg-[#6efd0b] text-gray-900 rounded-xs font-bold hover:bg-[#4fd100]  shadow-lg shadow-[#6efd0b]/25 flex items-center gap-2 cursor-pointer">
                    <Monitor size={18} />
                    ওয়েবসাইট প্রজেক্ট শুরু করুন →
                  </button>
                </Link>
              </div>

              <div className="mt-8 text-sm text-gray-500 dark:text-gray-500">
                <span className="bg-[#6efd0b]/20 text-[#6efd0b] px-3 py-1 rounded-full text-xs font-bold mr-2">
                  20+ Website launched In Rajshahi
                </span>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative rounded-xs overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10">
                <Image
                  src="https://i.ibb.co.com/3YGQvmgY/coding-jpg.jpg"
                  alt="Web Development"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#6efd0b]/10 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Premium Bottom Decorative Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6efd0b]/30 to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className=" py-16 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#6efd0b]/10 rounded-xs mb-3">
                  <stat.icon className="w-5 h-5 text-[#6efd0b]" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-10 md:py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              আমরা কোন Web Services দিই
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              ছোট ব্যবসা থেকে বড় এন্টারপ্রাইজ — সবার জন্য কাস্টম ওয়েব সলিউশন
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="group  p-6 rounded-xs shadow-lg border border-gray-200 dark:border-gray-800 hover:border-[#6efd0b]/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xs flex items-center justify-center`}
                  >
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-[#6efd0b]/10 text-[#6efd0b] rounded-full text-xs font-bold">
                    {service.stats}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300  mb-4">
                  {service.description}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {service.features.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-300 "
                    >
                      <CheckCircle className="w-3 h-3 text-[#6efd0b]" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className=" ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            কেন আমরা রাজশাহীর সেরা?
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className=" p-6 rounded-xs shadow-lg border border-gray-200 dark:border-gray-800 text-center hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 bg-[#6efd0b]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-[#6efd0b]" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-300  leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-10 md:py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            আমরা কীভাবে কাজ করি
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'Planning',
                desc: 'আপনার ব্যবসার চাহিদা বুঝে সাইটের ম্যাপ তৈরি করা।',
              },
              {
                step: '02',
                title: 'Design',
                desc: 'মডার্ন এবং ক্লিন ইউজার ইন্টারফেস ডিজাইন।',
              },
              {
                step: '03',
                title: 'Development',
                desc: 'এসইও ফ্রেন্ডলি ক্লিন কোডের মাধ্যমে সাইট তৈরি।',
              },
              {
                step: '04',
                title: 'Delivery',
                desc: 'সাইট লাইভ করা এবং ব্যবহার করার ট্রেনিং প্রদান।',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6  rounded-xs border border-gray-200 dark:border-gray-800 shadow-sm"
              >
                <div className="text-4xl font-bold text-[#6efd0b] mb-2">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA section */}
      <CtaSection></CtaSection>
    </div>
  );
}
