'use client';

import React from 'react';
import {
  Sparkles,
  Calendar,
  Users,
  Award,
  Clock,
  Phone,
  Mail,
  CheckCircle,
  Package,
  Heart,
  Briefcase,
  PartyPopper,
  ShoppingBag,
  Users2,
  Image as ImageIcon,
  Palette,
  Layout,
  ArrowUpRight,
} from 'lucide-react';
import CtaSection from '@/components/module/shared/CtaSection';

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
        'আপনার product-এর packaging, label, tag design। Organic food, clothing, gift item — সব ধরনের product packaging',
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
    <div className="min-h-screen  transition-colors duration-300">
      {/* Hero Section  */}
      <section className="relative bg-[#FAFFF7] dark:bg-gray-950 overflow-hidden ">
        {/* Premium Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6efd0b]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#6efd0b]/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6efd0b]/[0.02] rounded-full blur-3xl"></div>
        </div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#6efd0b08_1px,transparent_1px),linear-gradient(to_bottom,#6efd0b08_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="relative px-4 sm:px-6 lg:px-8 py-10 md:py-28 lg:py-36">
          <div className="text-center">
            {/* Premium Badge with Animation */}
            <div className="inline-flex mb-8 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-[#6efd0b]/20 blur-xl rounded-full group-hover:blur-2xl transition-all duration-500"></div>
                <span className="relative inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-[#6efd0b]/30 rounded-full text-sm font-medium text-[#2e9e00] dark:text-[#6efd0b] shadow-lg">
                  <Sparkles size={14} className="text-[#6efd0b]" />
                  Professional Graphics Design
                  <ArrowUpRight size={14} className="opacity-70" />
                </span>
              </div>
            </div>
            {/* Premium Responsive Heading */}
            <div className="mb-4 md:mb-8">
              <h1 className="font-bold tracking-tight leading-[1.1] text-center">
                <span className="block text-gray-800 dark:text-gray-100 text-xl sm:text-4xl md:text-5xl lg:text-6xl">
                  আপনার Brand-এর জন্য Creative
                </span>

                <span className="block mt-2 text-xl sm:text-5xl md:text-6xl">
                  <span className="bg-gradient-to-r from-[#6efd0b] via-[#8bff3a] to-[#2e9e00] bg-clip-text text-transparent">
                    Graphics Design
                  </span>
                </span>
              </h1>
            </div>

            {/* Premium Description */}
            <p className="text-gray-600 dark:text-gray-300 text-base text-sm md:text-xl max-w-2xl mx-auto leading-relaxed md:mb-10">
              Logo থেকে social media post, banner থেকে packaging — আপনার
              business-এর visual identity আমরাই তৈরি করি। রাজশাহীর সব ধরনের
              business-এর জন্য।
            </p>
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
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#6efd0b]/10 rounded-md mb-3">
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
                className="group  p-6 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-300 dark:border-gray-800 hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
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
      <section className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              What sets our graphics services apart
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className=" p-6 rounded-xs shadow-lg border border-gray-200 dark:border-gray-800 text-center"
              >
                <div className="w-14 h-14 bg-[#6efd0b]/10 rounded-md flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-[#6efd0b]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-10 md:py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'Project Brief',
                description:
                  'শুরুতে আমরা আপনার ব্যবসার লক্ষ্য, টার্গেট অডিয়েন্স এবং ডিজাইনের প্রয়োজনীয়তাগুলো বিস্তারিতভাবে জেনে নেই',
              },
              {
                step: '02',
                title: 'Concept Design',
                description:
                  'আপনার ব্রিফ অনুযায়ী আমরা কয়েকটি ইউনিক ডিজাইন কনসেপ্ট বা ড্রাফট তৈরি করি এবং আপনার মতামতের জন্য পাঠাই',
              },
              {
                step: '03',
                title: 'Revisions & Finalization',
                description:
                  'আপনার ফিডব্যাক অনুযায়ী আমরা ডিজাইনটিতে প্রয়োজনীয় পরিবর্তন আনি এবং সেটিকে চূড়ান্ত রূপ দেওয়ার কাজ করি',
              },
              {
                step: '04',
                title: 'Final Delivery',
                description:
                  'ডিজাইন পছন্দ হলে আমরা সেটির সব ধরণের ফাইল ফরম্যাট (AI, EPS, PNG, PDF) এবং হাই-কোয়ালিটি ভার্সন আপনাকে বুঝিয়ে দেই',
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className=" p-6 rounded-xs shadow-lg border border-gray-200 dark:border-gray-800">
                  <div className="text-4xl font-bold text-[#6efd0b] mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
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
