'use client';

import React from 'react';
import Link from 'next/link';
import {
  Video,
  Camera,
  TrendingUp,
  Code2,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Users,
  Award,
  Clock,
  Star,
} from 'lucide-react';

export default function ServicePage() {
  const services = [
    {
      title: 'Promotional Video Production',
      description:
        'রাজশাহীতে নিজস্ব professional studio ও professional ক্যামেরা সেটাপে তৈরি promotional video আপনার product, service বা brand-কে নিয়ে যাবে Next Level-এ ',
      href: '/services/videography',

      icon: Video,
      features: [
        'Promotional & Commercial Video',
        'Product Showcase Video',
        'Educational & Explainer Video',
        'Creative Storytelling',
      ],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600',
      stats: '100+ Videos Produced in Rajshahi',
    },
    {
      title: 'Graphics Design',
      description:
        'Brand-এর visual identity তৈরি থেকে শুরু করে প্রতিদিনের social media post পর্যন্ত — সব ধরনের graphic design service ও রাজশাহীর business-দের জন্য affordable মাসিক package',
      href: '/services/photography',
      icon: Camera,
      features: [
        'Social Media Post Design',
        'Logo Design',
        'Ad Creative ',
        'Monthly Design Package',
      ],
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      iconColor: 'text-purple-600',
      stats: 'মাসিক Package থেকে Single Design',
    },
    {
      title: 'Digital Marketing',
      description:
        'সঠিক মানুষের কাছে সঠিক সময়ে আপনার business পৌঁছে দিন। রাজশাহীর local audience targeting-এ আমরা expert। Boost management থেকে শুরু করে full ad campaign — সব handle করি',
      href: '/services/digital-marketing',
      icon: TrendingUp,
      features: [
        'Facebook Page Boost/Ad Managemen',
        'Social Media Marketing',
        'Funnel Based Marketing',
        'Data Driven Digital Marketing',
      ],
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600',
      stats: '300% avg. ROI',
    },
    {
      title: 'Web Design & Development',
      description:
        'Modern, responsive, and scalable website design and development tailored to your business needs.',
      href: '/services/web-design-development',
      icon: Code2,
      features: [
        'Custom Website Design',
        'Landing Page Design',
        'E-Commerce Solutions',
        'CMS Integration',
      ],
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      iconColor: 'text-orange-600',
      stats: '20+ Website launched In Rajshahi',
    },
  ];

  const stats = [
    { label: 'Projects Completed', value: '100+', icon: Award },
    { label: 'Happy Clients', value: '50+', icon: Users },
    { label: 'Years Experience in Rajshahi', value: '1+', icon: Clock },
    { label: 'Satisfaction Rate', value: '85%', icon: Star },
  ];

  return (
    <div className="min-h-screen  text-gray-900 dark:text-white transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#FAFFF7] to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        {/* Premium Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#6efd0b02_25%,transparent_25%,transparent_75%,#6efd0b02_75%,#6efd0b02),linear-gradient(45deg,#6efd0b02_25%,transparent_25%,transparent_75%,#6efd0b02_75%,#6efd0b02)] bg-[size:60px_60px] bg-[position:0_0,30px_30px] opacity-30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-0 py-10 md:py-20 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#6efd0b]/10 text-[#6efd0b] rounded-full text-sm font-medium mb-6">
            <Sparkles size={16} />
            আমাদের Services
          </span>

          <h1 className="text-2xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            রাজশাহীর Business-এর জন্য যা যা প্রয়োজন
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6efd0b] to-[#2e9e00]">
              {' '}
              সব এক ছাদের নিচে
            </span>
          </h1>

          <p className="max-w-3xl mx-auto  text-gray-600 dark:text-gray-300 ">
            Video Production, Graphics Design, Facebook Ads, Website , Full
            Marketing — রাজশাহীর প্রতিটি business-এর জন্য আ মাদের কাছে আছে সঠিক
            solution
          </p>

          {/* Trust Badges */}
          {/* <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800"
                  ></div>
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Trusted by 300+ clients
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
                (4.9/5 from 200+ reviews)
              </span>
            </div>
          </div> */}
        </div>
        {/* Premium Bottom Decorative Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6efd0b]/30 to-transparent"></div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="group block  rounded-md shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:-translate-y-1"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`w-14 h-14 ${service.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                  </div>
                  <span className="px-3 py-1 bg-[#6efd0b]/10 text-[#6efd0b] rounded-full text-xs font-medium">
                    {service.stats}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#6efd0b] transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                    >
                      <CheckCircle className="w-4 h-4 text-[#6efd0b]" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Learn More Link */}
                <div
                  className="
                  flex items-center gap-2 text-[#6efd0b] font-medium group-hover:gap-3 transition-all"
                >
                  <span>আরো জানুন</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className=" py-16 border-y border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#6efd0b]/10 rounded-xl mb-3">
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
    </div>
  );
}
