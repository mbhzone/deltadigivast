'use client';

import React from 'react';
import Image from 'next/image';
import {
  Camera,
  Sparkles,
  Calendar,
  Users,
  Star,
  Award,
  Clock,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Package,
  Heart,
  Briefcase,
  PartyPopper,
  ShoppingBag,
  Users2,
  Image as ImageIcon,
  ChevronRight,
  Palette,
  Layers,
  Layout,
} from 'lucide-react';

export default function PhotographyPage() {
  const services = [
    {
      icon: ShoppingBag,
      title: 'Social Media Poster Design', // Fixed: Line break removed
      description:
        'Facebook ও Instagram-এর জন্য scroll-stopping graphic posts। Regular post, promotional offer, event announcement — সব ধরনের social media design',
      features: [
        'Platform optimized sizes',
        'High-engagement visuals',
        'Modern typography',
        'Quick 24h delivery',
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Calendar,
      title: '✏️ Logo Design',
      description:
        'আপনার business-এর জন্য unique এবং professional logo। রাজশাহীর clothing shop থেকে শুরু করে restaurant, NGO পর্যন্ত সব sector-এ logo বানিয়েছি।',
      features: [
        'Unique & original concepts',
        'Vector source files (AI/EPS)',
        'High-resolution PNG/JPG',
        'Brand color palette',
      ],
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Briefcase,
      title: '🖼️ Banner, Poster & Flyer Design',
      description:
        'Eid offer, seasonal promotion, event poster, business banner — print এবং digital দুই ধরনের design',
      features: [
        'Print-ready CMYK files',
        'High-quality graphics',
        'Custom size options',
        'Digital marketing banners',
      ],
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Heart,
      title: '📦 Product & Packaging Design',
      description:
        "আপনার product-এর packaging, label, tag design। Organic food, clothing, gift item — সব ধরনের product packaging",
      features: [
        'Custom label & box design',
        '3D mockup presentation',
        'Die-cut technical files',
        'Premium brand aesthetics',
      ],
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: PartyPopper,
      title: '📊 Facebook Ad Creative',
      description:
        'High-converting ad creative design। Boost করলে result পেতে হলে creative ভালো হতে হবে — এটাই আমরা করি',
      features: [
        'Conversion focused design',
        'Less than 20% text rule',
        'Strong CTA placement',
        'A/B testing variants',
      ],
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: Users2,
      title: 'Brand Identity Design',
      description:
        'শুধুমাত্র লোগো তৈরি নয়, বরং গ্রাহকের মনে ব্র্যান্ডের একটি অনন্য ও স্মরণীয় ছবি তৈরি করে, যা প্রতিযোগীদের থেকে আলাদা করে',
      features: [
        'Complete brand manual',
        'Business card & Letterhead',
        'Typography guidelines',
        'Consistent visual story',
      ],
      color: 'from-indigo-500 to-blue-500',
    },
  ];

  const stats = [
    { label: 'Years Experience', value: '1+', icon: Award },
    { label: 'Happy Clients', value: '80+', icon: Users },
    { label: 'Graphic Designs', value: '500+', icon: Palette },
    { label: 'Logo Designs', value: '40+', icon: Layout },
  ];

  const whyChooseUs = [
    {
      title: 'Creative & Unique Concepts',
      description:
        'আমরা গতানুগতিক ডিজাইন করি না। প্রতিটি প্রজেক্টে আমরা একদম ইউনিক এবং ক্রিয়েটিভ আইডিয়া নিয়ে কাজ করি যা আপনার ব্র্যান্ডকে আলাদা করে',
      icon: Palette,
    },
    {
      title: 'Result-Oriented Design',
      description:
        'আমাদের ডিজাইনগুলো কেবল দেখতে সুন্দর নয়, বরং এগুলো এমনভাবে তৈরি করা যাতে আপনার সেলস এবং ব্র্যান্ড ভ্যালু বৃদ্ধি পায়',
      icon: Award,
    },
    {
      title: 'Fast & Timely Delivery',
      description:
        'আমরা সময়ের মূল্য বুঝি। আপনার ডেডলাইনের কথা মাথায় রেখে আমরা দ্রুততম সময়ে হাই-কোয়ালিটি ডিজাইন ডেলিভারি নিশ্চিত করি',
      icon: Clock,
    },
    {
      title: 'Flexible Revisions',
      description:
        'আপনার শতভাগ সন্তুষ্টি আমাদের লক্ষ্য। আপনি যতক্ষণ না ডিজাইনটি নিয়ে পুরোপুরি খুশি হচ্ছেন, আমরা প্রয়োজনীয় পরিবর্তন করে দেই',
      icon: Package,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-black py-24">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#6efd0b]/5 to-transparent dark:from-[#6efd0b]/10"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#6efd0b]/5 to-transparent dark:from-[#6efd0b]/10"></div>

        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#6efd0b] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#6efd0b]/10 text-[#6efd0b] rounded-full text-sm font-medium mb-6">
            <Palette size={16} />
            Professional Graphics Design
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            আপনার Brand-এর জন্য Creative 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6efd0b] to-[#2e9e00]">
              {' '}
              Graphics Design 
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-400 mb-10">
            Logo থেকে social media post, banner থেকে packaging — আপনার business-এর visual identity 
            আমরাই তৈরি করি। রাজশাহীর সব ধরনের business-এর জন্য।
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-[#6efd0b] text-gray-900 rounded-md font-semibold hover:bg-[#4fd100] transition-all duration-200 transform hover:scale-105 shadow-lg shadow-[#6efd0b]/25 flex items-center gap-2">
              <Palette size={18} />
              Design Project শুরু করুন →
            </button>
            <button className="px-8 py-4 bg-gray-100 dark:bg-black text-gray-700 dark:text-gray-300 rounded-md font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 border border-gray-200 dark:border-gray-700 flex items-center gap-2">
              <ImageIcon size={18} />
              View Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-black py-16 border-y border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#6efd0b]/10 rounded-md mb-3">
                  <stat.icon className="w-5 h-5 text-[#6efd0b]" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#6efd0b]/10 text-[#6efd0b] rounded-full text-sm font-medium mb-4">
              <Sparkles size={16} />
              Our Services
            </span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              কোন ধরনের Design আমরা করি
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-black p-6 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <CheckCircle className="w-4 h-4 text-[#6efd0b]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              What sets our graphics services apart
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-black p-6 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 text-center"
              >
                <div className="w-14 h-14 bg-[#6efd0b]/10 rounded-md flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-[#6efd0b]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Project Brief',
                description: 'শুরুতে আমরা আপনার ব্যবসার লক্ষ্য, টার্গেট অডিয়েন্স এবং ডিজাইনের প্রয়োজনীয়তাগুলো বিস্তারিতভাবে জেনে নেই',
              },
              {
                step: '02',
                title: 'Concept Design',
                description: 'আপনার ব্রিফ অনুযায়ী আমরা কয়েকটি ইউনিক ডিজাইন কনসেপ্ট বা ড্রাফট তৈরি করি এবং আপনার মতামতের জন্য পাঠাই',
              },
              {
                step: '03',
                title: 'Revisions & Finalization',
                description: 'আপনার ফিডব্যাক অনুযায়ী আমরা ডিজাইনটিতে প্রয়োজনীয় পরিবর্তন আনি এবং সেটিকে চূড়ান্ত রূপ দেওয়ার কাজ করি',
              },
              {
                step: '04',
                title: 'Final Delivery',
                description: 'ডিজাইন পছন্দ হলে আমরা সেটির সব ধরণের ফাইল ফরম্যাট (AI, EPS, PNG, PDF) এবং হাই-কোয়ালিটি ভার্সন আপনাকে বুঝিয়ে দেই',
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white dark:bg-black p-6 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-4xl font-bold text-[#6efd0b]/20 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Updated for Graphics */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 rounded-3xl p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Elevate Your Brand?
                </h2>
                <p className="text-lg text-gray-300 mb-8">
                  Let's discuss your design needs. Get in touch with us today for a free consultation.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone className="w-5 h-5 text-[#6efd0b]" />
                    <span>+880 1234 567890</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="w-5 h-5 text-[#6efd0b]" />
                    <span>design@agency.com</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                  />
                  <textarea
                    placeholder="Describe your project"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                  ></textarea>
                  <button className="w-full py-3 px-6 bg-[#6efd0b] text-gray-900 font-semibold rounded-md hover:bg-[#4fd100] transition-all">
                    Get Free Quote
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
