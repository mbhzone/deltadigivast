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
      title: 'Videography',
      description:
        'Professional video production services for commercials, events, corporate shoots, and creative storytelling.',
      href: '/services/videography',
      icon: Video,
      features: [
        'Commercials & Promos',
        'Event Coverage',
        'Corporate Videos',
        'Creative Storytelling',
      ],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600',
      stats: '200+ videos produced',
    },
    {
      title: 'Photography',
      description:
        'High-quality photography services including product, event, corporate, and lifestyle shoots.',
      href: '/services/photography',
      icon: Camera,
      features: [
        'Product Photography',
        'Event Photography',
        'Corporate Headshots',
        'Lifestyle Shoots',
      ],
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      iconColor: 'text-purple-600',
      stats: '5000+ photos delivered',
    },
    {
      title: 'Digital Marketing',
      description:
        'Result-driven digital marketing strategies including SEO, social media marketing, and paid advertising.',
      href: '/services/digital-marketing',
      icon: TrendingUp,
      features: [
        'SEO Optimization',
        'Social Media Marketing',
        'Paid Advertising',
        'Analytics & Reporting',
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
        'Responsive Development',
        'E-Commerce Solutions',
        'CMS Integration',
      ],
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      iconColor: 'text-orange-600',
      stats: '150+ websites launched',
    },
  ];

  const stats = [
    { label: 'Projects Completed', value: '500+', icon: Award },
    { label: 'Happy Clients', value: '300+', icon: Users },
    { label: 'Years Experience', value: '12+', icon: Clock },
    { label: 'Satisfaction Rate', value: '98%', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-black py-20">
        {/* Subtle side gradients */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#6efd0b]/5 to-transparent dark:from-[#6efd0b]/10"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#6efd0b]/5 to-transparent dark:from-[#6efd0b]/10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#6efd0b]/10 text-[#6efd0b] rounded-full text-sm font-medium mb-6">
            <Sparkles size={16} />
            আমাদের Services
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Creative Solutions for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6efd0b] to-[#2e9e00]">
              {' '}
              Your Business
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-400 mb-10">
            We offer comprehensive creative services to help your brand stand
            out, connect with audiences, and achieve your business goals.
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
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Trusted by 300+ clients
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                (4.9/5 from 200+ reviews)
              </span>
            </div>
          </div> */}
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="group block bg-white dark:bg-black rounded-md shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:-translate-y-1"
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

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <CheckCircle className="w-4 h-4 text-[#6efd0b]" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Learn More Link */}
                <div className="flex items-center gap-2 text-[#6efd0b] font-medium group-hover:gap-3 transition-all">
                  <span>Learn More</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 dark:bg-black/50 py-16 border-y border-gray-200 dark:border-gray-700">
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
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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
