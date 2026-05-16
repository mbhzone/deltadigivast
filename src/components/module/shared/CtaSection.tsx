import React from 'react';
import Link from 'next/link';
import {
  Phone,
  MessageCircle,
  ArrowRight,
  Clock,
  Shield,
  Award,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const CtaSection = () => {
  const whatsappNumber = '01632363235';
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\s/g, '')}`;

  return (
    <section className="bg-[#FAFFF7] dark:bg-gray-950 pb-10 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium Card */}
        <div className="relative overflow-hidden rounded-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl">
          {/* Subtle Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#6efd0b]/5 to-transparent"></div>

          <div className="relative p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Content */}
              <div className="space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#6efd0b]/10 rounded-full">
                  <Award size={14} className="text-[#6efd0b]" />
                  <span className="text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                    Professional Service
                  </span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                  Let&apos;s Work Together
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6efd0b] to-[#2e9e00] mt-2">
                    On Your Next Project
                  </span>
                </h2>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  আমরা আপনার ব্যবসার জন্য সেরা ভিডিও প্রোডাকশন ও ডিজিটাল
                  মার্কেটিং সলিউশন দিতে প্রস্তুত। ফ্রি কনসালটেশনের জন্য আজই
                  যোগাযোগ করুন।
                </p>

                {/* Trust Features */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#6efd0b]/10 flex items-center justify-center">
                      <Clock size={14} className="text-[#6efd0b]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Quick Response
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Within 1 Hour
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#6efd0b]/10 flex items-center justify-center">
                      <Shield size={14} className="text-[#6efd0b]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        100% Guarantee
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Quality Assured
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Buttons */}
              <div className="space-y-4">
                {/* Phone Number Display */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#6efd0b]/10 flex items-center justify-center">
                      <Phone size={18} className="text-[#6efd0b]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Call or WhatsApp
                      </p>
                      <p className="text-base font-semibold text-gray-900 dark:text-white">
                        {whatsappNumber}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Button */}
                <Link href="/contact" className="block">
                  <button className="group w-full px-6 py-4 bg-gradient-to-r from-[#6efd0b] to-[#4fd100] text-gray-900 font-semibold rounded-md hover:shadow-lg  flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Phone size={18} />
                      Contact Us
                    </span>
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </Link>

                {/* WhatsApp Button */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <button className="group w-full px-6 py-4 bg-[#25D366] text-white font-semibold rounded-md hover:shadow-lg  flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <FaWhatsapp size={18} />
                      WhatsApp
                    </span>
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
