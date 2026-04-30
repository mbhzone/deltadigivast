'use client';
import React from 'react';
import { Phone, Mail, MapPin, Facebook, MessageSquare, Clock, Globe } from 'lucide-react';
import { Contact2 } from '@/components/layouts/contact2';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-black py-24">
        {/* Subtle side gradients for depth */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#6efd0b]/10 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#6efd0b]/10 to-transparent pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#6efd0b]/10 text-[#6efd0b] rounded-full text-sm font-medium mb-6">
            <MessageSquare size={16} />
            Contact Us
          </span>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            রাজশাহীতে আপনার Business 
            <span className="block text-[#6efd0b]">নিয়ে কথা বলুন</span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
            আপনার project বা প্রশ্ন যাই হোক — আমরা ২৪ ঘন্টার মধ্যে reply করি। একটা message থেকে শুরু হোক আপনার ব্যবসার ডিজিটাল যাত্রা।
          </p>

          {/* Realistic Stats for Trust Building */}
          <div className="flex flex-wrap justify-center gap-12 mt-12 pt-12 border-t border-gray-100 dark:border-gray-800">
            {[
              { label: 'Websites Launched', value: '20+' },
              { label: 'Happy Clients', value: '15+' },
              { label: 'Response Time', value: '< 24h' },
              { label: 'Location', value: 'Rajshahi' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-500 mt-1 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Cards Section (Essential for Local SEO) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Phone Card */}
          <div className="p-8 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 flex flex-col items-center text-center group hover:border-[#6efd0b]/50 transition-all">
            <div className="w-12 h-12 bg-[#6efd0b]/20 rounded-full flex items-center justify-center mb-4 text-[#6efd0b]">
              <Phone size={24} />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Phone & WhatsApp</h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">+88016 3236 3235</p>
          </div>

          {/* Email Card */}
          <div className="p-8 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 flex flex-col items-center text-center group hover:border-[#6efd0b]/50 transition-all">
            <div className="w-12 h-12 bg-[#6efd0b]/20 rounded-full flex items-center justify-center mb-4 text-[#6efd0b]">
              <Mail size={24} />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Business Email</h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">help@deltadigivast.com</p>
          </div>

          {/* Address Card */}
          <div className="p-8 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 flex flex-col items-center text-center group hover:border-[#6efd0b]/50 transition-all">
            <div className="w-12 h-12 bg-[#6efd0b]/20 rounded-full flex items-center justify-center mb-4 text-[#6efd0b]">
              <MapPin size={24} />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Office Address</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              49/2 rajib chattar Old Shimla Boalia Rajshahi
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">আমাদের কাছে Message পাঠান</h2>
          <p className="text-gray-600 dark:text-gray-400">আপনার project-এর details জানান — আমরা সেরা solution নিয়ে reply করব।</p>
        </div>
        <Contact2 />
      </section>

      {/* Map Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">আমাদের Office — রাজশাহী</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 flex items-center justify-center gap-2">
                <Clock size={16} /> সরাসরি studio visit করতে চাইলে আগে একটু call করুন।
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
            <Globe size={14} /> deltadigivast.vercel.app | <Facebook size={14} className="text-blue-600" /> facebook.com/deltadigivast
         </p>
      </section>
    </div>
  );
}
