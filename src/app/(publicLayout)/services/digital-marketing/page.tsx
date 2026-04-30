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
  MessageSquare,
  ShieldCheck,
  Video,
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
        'Ad creative setup',
        'Conversion tracking',
      ],
      color: 'from-blue-500 to-cyan-500',
      stats: 'High ROI',
    },
    {
      icon: Share2,
      title: '📱 Social Media Marketing',
      description:
        'আপনার Facebook page ও Instagram-এ regular, engaging content। Post scheduling, caption writing, hashtag strategy — সব আমরা handle করি।',
      features: [
        'Regular posting schedule',
        'Caption & hashtag strategy',
        'Engagement growth',
        'Page management',
      ],
      color: 'from-purple-500 to-pink-500',
      stats: 'Organic growth',
    },
    {
      icon: Search,
      title: '🎯 Targeted Audience Research',
      description:
        'রাজশাহীর কোন মানুষ আপনার customer হতে পারে — সেটা research করে বের করি। Age, location, interest — সব analyze করে campaign তৈরি হয়।',
      features: [
        'Detailed market analysis',
        'Competitor research',
        'Interest based targeting',
        'Location specific ads',
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
        'Detailed weekly reports',
        'Budget tracking',
        'ROI analysis',
        'Strategy refinement',
      ],
      color: 'from-orange-500 to-red-500',
      stats: 'Real-time report',
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
        'কাজ ভালো না হলে আমরা ঠিক করে দিই। আপনার সন্তুষ্টিই আমাদের প্রধান লক্ষ্য।',
      icon: ShieldCheck,
    },
    {
      title: 'All-in-One Solution',
      description:
        'Video + Graphics + Ads — সব এক জায়গায়। আলাদা আলাদা vendor-এর দরকার নেই।',
      icon: Video,
    },
    {
      title: 'Direct Communication',
      description:
        'কোনো আড়াল নেই। আপনি সরাসরি আমাদের team-এর সাথে কথা বলতে পারবেন।',
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

              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-[#6efd0b] text-gray-900 rounded-md font-semibold hover:bg-[#4fd100] transition-all duration-200 flex items-center gap-2">
                  <Rocket size={18} />
                  Free Consultation নিন →
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000"
                  alt="Digital Marketing Team"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 dark:bg-black py-16 border-y border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#6efd0b]/10 rounded-md mb-3">
                  <stat.icon className="w-5 h-5 text-[#6efd0b]" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              আমরা কোন Digital Marketing Services দিই
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div key={index} className="p-6 bg-white dark:bg-black rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
                <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-md flex items-center justify-center mb-4`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {service.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-500"><CheckCircle className="w-3 h-3 text-[#6efd0b]" />{f}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">কেন আমরা — অন্য agency কেন না?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="p-6 bg-white dark:bg-black rounded-md shadow-lg text-center">
                <item.icon className="w-10 h-10 text-[#6efd0b] mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">আমরা কীভাবে কাজ করি</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <div key={index} className="p-6 bg-white dark:bg-black rounded-md border border-gray-200 dark:border-gray-700">
                <div className="text-3xl font-bold text-[#6efd0b] mb-2">{item.step}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
