import ProjectGrid from '@/components/module/comon/ProjectGrid';
import React from 'react';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string | null;
  videoUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

async function getProjects(): Promise<Project[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/portfolio`,
    {
      cache: 'no-store',
    },
  );
  const data = await res.json();
  return data.data || [];
}

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-[#FAFFF7] dark:bg-gray-950 transition-colors duration-500">
      {/* Hero Section - Premium Design */}
      <section className="relative bg-[#FAFFF7] dark:bg-gray-950 overflow-hidden">
        {/* Premium Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6efd0b]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#6efd0b]/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6efd0b]/[0.02] rounded-full blur-3xl"></div>
        </div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#6efd0b08_1px,transparent_1px),linear-gradient(to_bottom,#6efd0b08_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-28 lg:py-36">
          <div className="text-center ">
            {/* Premium Badge with Animation */}
            <div className="inline-flex mb-8 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-[#6efd0b]/20 blur-xl rounded-full group-hover:blur-2xl transition-all duration-500"></div>
                <span className="relative inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-[#6efd0b]/30 rounded-full text-sm font-medium text-[#2e9e00] dark:text-[#6efd0b] shadow-lg">
                  <Sparkles size={14} className="text-[#6efd0b]" />
                  আমাদের পোর্টফোলিও
                  <ArrowUpRight size={14} className="opacity-70" />
                </span>
              </div>
            </div>

            {/* Premium Heading with Gradient */}
            <div className="mb-4 md:mb-8">
              <h1 className="text-xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight whitespace-nowrap">
                <span className="text-gray-800 dark:text-gray-100">
                  শ্রেষ্ঠ কাজের মাধ্যমে
                </span>{' '}
                <span className="relative inline-block">
                  <span className="relative bg-gradient-to-r from-[#6efd0b] via-[#8bff3a] to-[#2e9e00] bg-clip-text text-transparent font-bold">
                    ব্র্যান্ডের গল্প বলা
                  </span>
                </span>
              </h1>
            </div>

            {/* Premium Description */}
            <p className="text-gray-600 dark:text-gray-400 text-base text-sm md:text-xl max-w-2xl mx-auto leading-relaxed md:mb-10">
              রাজশাহীর বিভিন্ন ব্র্যান্ড এবং ব্যবসার জন্য আমাদের করা ভিডিও
              প্রোডাকশন, গ্রাফিক্স ডিজাইন এবং ওয়েব প্রজেক্টগুলোর একটি সংগ্রহ।
              আমরা শুধু কাজ করি না, আমরা রেজাল্ট তৈরি করি।
            </p>
          </div>
        </div>

        {/* Premium Bottom Decorative Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6efd0b]/30 to-transparent"></div>
      </section>

      {/* Project Grid + Filter (The component that shows images) */}
      <section className="max-w-7xl mx-auto px-3 md:px-0 pb-5 md:pb-24 ">
        <ProjectGrid projects={projects} />
      </section>
    </div>
  );
}
