'use client';
import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Clock,
  Globe,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { Contact2 } from '@/components/layouts/contact2';

export default function ContactPage() {
  return (
    <div className="min-h-screen transition-colors duration-300">
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

        <div className="relative   px-4 sm:px-6 lg:px-8 py-10 md:py-28 lg:py-36">
          <div className="text-center ">
            {/* Premium Badge with Animation */}
            <div className="inline-flex mb-8 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-[#6efd0b]/20 blur-xl rounded-full group-hover:blur-2xl transition-all duration-500"></div>
                <span className="relative inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-[#6efd0b]/30 rounded-full text-sm font-medium text-[#2e9e00] dark:text-[#6efd0b] shadow-lg">
                  <Sparkles size={14} className="text-[#6efd0b]" />
                  Contact Us
                  <ArrowUpRight size={14} className="opacity-70" />
                </span>
              </div>
            </div>
            {/* Premium Responsive Heading */}
            <div className="mb-4 md:mb-8 ">
              <h1 className="font-bold tracking-tight leading-[1.1] text-center ">
                <span className="block text-gray-800 dark:text-gray-100 text-2xl sm:text-4xl md:text-5xl lg:text-6xl ">
                  রাজশাহীতে আপনার Business
                </span>

                <span className="block mt-2 text-2xl sm:text-5xl md:text-6xl ">
                  <span className="bg-gradient-to-r from-[#6efd0b] via-[#8bff3a] to-[#2e9e00] bg-clip-text text-transparent">
                    নিয়ে কথা বলুন
                  </span>
                </span>
              </h1>
            </div>

            {/* Premium Description */}
            <p className="text-gray-600 dark:text-gray-400 text-base text-sm md:text-xl max-w-2xl mx-auto leading-relaxed md:mb-10">
              আপনার project বা প্রশ্ন যাই হোক — আমরা ২৪ ঘন্টার মধ্যে reply করি।
              একটা message থেকে শুরু হোক আপনার ব্যবসার ডিজিটাল যাত্রা।
            </p>
          </div>
        </div>

        {/* Premium Bottom Decorative Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6efd0b]/30 to-transparent"></div>
      </section>

      {/* Info Cards Section (Essential for Local SEO) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 pt-10">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Phone Card */}
          <div className="p-8 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 flex flex-col items-center text-center group hover:border-[#6efd0b]/50 transition-all">
            <div className="w-12 h-12 bg-[#6efd0b]/20 rounded-full flex items-center justify-center mb-4 text-[#6efd0b]">
              <Phone size={24} />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              Phone & WhatsApp
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              +88016 3236 3235
            </p>
          </div>

          {/* Email Card */}
          <div className="p-8 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 flex flex-col items-center text-center group hover:border-[#6efd0b]/50 transition-all">
            <div className="w-12 h-12 bg-[#6efd0b]/20 rounded-full flex items-center justify-center mb-4 text-[#6efd0b]">
              <Mail size={24} />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              Business Email
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              help@deltadigivast.com
            </p>
          </div>

          {/* Address Card */}
          <div className="p-8 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 flex flex-col items-center text-center group hover:border-[#6efd0b]/50 transition-all">
            <div className="w-12 h-12 bg-[#6efd0b]/20 rounded-full flex items-center justify-center mb-4 text-[#6efd0b]">
              <MapPin size={24} />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              Office Address
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              49/2 rajib chattar Old Shimla Boalia Rajshahi
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            আমাদের কাছে Message পাঠান
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            আপনার project-এর details জানান — আমরা সেরা solution নিয়ে reply করব।
          </p>
        </div>
        <Contact2 />
      </section>

      {/* Map Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            আমাদের Office — রাজশাহী
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 flex items-center justify-center gap-2">
            <Clock size={16} /> সরাসরি studio visit করতে চাইলে আগে একটু call
            করুন।
          </p>
        </div>
        <div className="h-[450px] w-full relative">
          <iframe
            className="w-full h-full grayscale dark:invert-[0.9] dark:hue-rotate-180"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634.343884841648!2d88.59972337535492!3d24.36448107825555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbef00693a1097%3A0x67399f928f000000!2s49%2F2%20Rajib%20Chattar%2C%20Rajshahi!5e0!3m2!1sen!2sbd!4v1714512000000!5m2!1sen!2sbd"
            loading="lazy"
            title="Delta Digivast Office Location"
          ></iframe>
        </div>
      </section>

      {/* Footer-like Branding (Optional) */}
      <section className="py-12 bg-gray-50 dark:bg-black border-t border-gray-100 dark:border-gray-800 text-center">
        <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
          <Globe size={14} /> deltadigivast.vercel.app |{' '}
          <Facebook size={14} className="text-blue-600" />{' '}
          facebook.com/deltadigivast
        </p>
      </section>
    </div>
  );
}
