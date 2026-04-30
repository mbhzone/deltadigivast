'use client';
import React from 'react';
import Image from 'next/image';
import {
  TrendingUp,
  Search,
  Share2,
  MousePointer,
  BarChart3,
  Target,
  Users,
  Globe,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Sparkles,
  Rocket,
  Award,
  Clock,
  PieChart,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  ChevronRight,
  ShieldCheck,
  Video,
  MessageSquare,
} from 'lucide-react';

export default function MarketingPage() {
  const services = [
    {
      icon: Target,
      title: '📘 Facebook Ads & Boost Management',
      description:
        'শুধু boost দিলেই হয় না — সঠিকভাবে করতে হয়। রাজশাহীর specific audience targeting, সঠিক content, সঠিক budget allocation — এই সব মিলিয়েই real result আসে। আমরা সেটাই করি।',
      features: [
        'Local audience targeting',
        'Budget optimization',
        'Content strategy',
        'Ad performance tracking',
      ],
      color: 'from-blue-500 to-cyan-500',
      stats: 'Real Result',
    },
    {
      icon: Share2,
      title: '📱 Social Media Marketing',
      description:
        'আপনার Facebook page ও Instagram-এ regular, engaging content। Post scheduling, caption writing, hashtag strategy — সব আমরা handle করি।',
      features: [
        'Daily posting schedule',
        'Caption writing',
        'Hashtag strategy',
        'Community management',
      ],
      color: 'from-purple-500 to-pink-500',
      stats: 'Organic Reach',
    },
    {
      icon: Search,
      title: '🎯 Targeted Audience Research',
      description:
        'রাজশাহীর কোন মানুষ আপনার customer হতে পারে — সেটা research করে বের করি। Age, location, interest — সব analyze করে campaign তৈরি হয়।',
      features: [
        'Customer behavior study',
        'Competitor analysis',
        'Interest analysis',
        'Location targeting',
      ],
      color: 'from-green-500 to-emerald-500',
      stats: 'Precision targeting',
    },
    {
      icon: BarChart3,
      title: '📈 Campaign Performance Tracking',
      description:
        'আপনার টাকা কোথায় যাচ্ছে, কত result আসছে — সব আপনি জানবেন। Regular performance report দিই।',
      features: [
        'Weekly performance reports',
        'Budget transparency',
        'ROI measurement',
        'Strategy refinement',
      ],
      color: 'from-orange-500 to-red-500',
      stats: 'Transparency',
    },
  ];

  const stats = [
    { label: 'Campaigns Managed', value: '100+', icon: Rocket },
    { label: 'Happy Clients', value: '80+', icon: Users },
    { label: 'Success Rate', value: '95%', icon: TrendingUp },
    { label: 'Years Experience', value: '1+', icon: Award },
  ];

  const whyChooseUs = [
    {
      title: 'আমরা রাজশাহী-ভিত্তিক',
      description:
        'আমরা রাজশাহীর market চিনি। Dhaka-based agency রাজশাহীর local business culture বোঝে না।',
      icon: MapPin,
    },
    {
      title: '100% Quality Guaranteed',
      description:
        'কাজ ভালো না হলে আমরা ঠিক করে দিই। আপনার সন্তুষ্টি আমাদের দায়িত্ব।',
      icon: ShieldCheck,
    },
    {
      title: 'All-in-One Solution',
      description:
        'Video + Graphics + Ads — সব এক জায়গায়। আলাদা আলাদা vendor-এর দরকার নেই।',
      icon: Video,
    },
    {
      title: 'Direct Communication',
      description:
        'সরাসরি আমাদের team-এর সাথে কথা বলতে পারবেন। কোনো আড়াল নেই।',
      icon: MessageSquare,
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery',
      description: 'আপনার business, target customer, এবং goal বুঝি। রাজশাহীর market-এ আপনার position analyze করি।',
    },
    {
      step: '02',
      title: 'Strategy',
      description: 'আপনার জন্য specific marketing plan তৈরি করি। Platform, audience এবং budget plan করি।',
    },
    {
      step: '03',
      title: 'Execution',
      description: 'Campaign launch করি। Content তৈরি করি। Ads চালাই এবং Page manage করি।',
    },
    {
      step: '04',
      title: 'Report & Optimize',
      description: 'Result দেখি। ভালো কাজ করছে সেটা scale করি। কম result দিচ্ছে সেটা optimize করি।',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#6efd0b]/10 text-[#6efd0b] rounded-full text-sm font-medium mb-6">
                <Sparkles size={16} />
                Digital Marketing Agency — রাজশাহী
              </span>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                রাজশাহীর সঠিক Customer-এর কাছে পৌঁছে দিই আপনার
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6efd0b] to-[#2e9e00]">
                  {' '}
                  Business
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Facebook Ads, Instagram Boost, Social Media Marketing — রাজশাহীর local audience targeting-এ আমরা specialist। সঠিকভাবে করলে result আসেই।
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-[#6efd0b] text-gray-900 rounded-md font-semibold hover:bg-[#4fd100] transition-all duration-200 transform hover:scale-105 shadow-lg shadow-[#6efd0b]/25 flex items-center gap-2">
                  <Rocket size={18} />
                  Free Consultation নিন →
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800"
                      ></div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Trusted by local brands
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000"
                  alt="Digital Marketing Team"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#6efd0b]/20 to-transparent"></div>
              </div>

              {/* Floating Platform Card */}
              <div className="absolute -top-6 -right-6 bg-white dark:bg-black rounded-md shadow-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    <Facebook className="w-6 h-6 text-blue-600" />
                    <Instagram className="w-6 h-6 text-pink-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Social Media
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 dark:bg-black py-16 border-y border-gray-200 dark:border-gray-700">
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#6efd0b]/10 text-[#6efd0b] rounded-full text-sm font-medium mb-4">
              <Target size={16} />
              Our Services
            </span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              আমরা কোন Digital Marketing Services দিই
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              সঠিক পরিকল্পনার মাধ্যমে আপনার ব্যবসার অনলাইন উপস্থিতি বৃদ্ধি করি
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-black rounded-md shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:-translate-y-1 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-md flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="px-3 py-1 bg-[#6efd0b]/10 text-[#6efd0b] rounded-full text-xs font-medium">
                      {service.stats}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <CheckCircle className="w-4 h-4 text-[#6efd0b] flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              কেন আমরা — অন্য agency কেন না?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-black p-6 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-[#6efd0b]/10 rounded-md flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-[#6efd0b]" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              আমরা কীভাবে কাজ করি
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white dark:bg-black p-6 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 h-full">
                  <div className="text-4xl font-bold text-[#6efd0b] mb-2">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
                {index !== process.length - 1 && (
                  <div className="absolute top-1/2 right-[-12px] w-8 h-1 bg-[#6efd0b] transform -translate-y-1/2 hidden md:block"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
