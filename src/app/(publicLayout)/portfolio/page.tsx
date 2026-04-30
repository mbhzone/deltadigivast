import ProjectGrid from '@/components/module/comon/ProjectGrid';
import React from 'react';
import { Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        {/* Background Glowing Effects */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#6efd0b]/5 to-transparent dark:from-[#6efd0b]/10"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#6efd0b]/5 to-transparent dark:from-[#6efd0b]/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#6efd0b]/10 text-[#6efd0b] rounded-full text-sm font-medium mb-6">
            <Sparkles size={16} />
            আমাদের পোর্টফোলিও
          </span>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            শ্রেষ্ঠ কাজের মাধ্যমে
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6efd0b] to-[#2e9e00]">
              {' '}
              ব্র্যান্ডের গল্প বলা{' '}
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
            রাজশাহীর বিভিন্ন ব্র্যান্ড এবং ব্যবসার জন্য আমাদের করা ভিডিও প্রোডাকশন, গ্রাফিক্স ডিজাইন এবং ওয়েব প্রজেক্টগুলোর একটি সংগ্রহ। আমরা শুধু কাজ করি না, আমরা রেজাল্ট তৈরি করি।
          </p>
        </div>
      </section>

      {/* Project Grid + Filter (The component that shows images) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <ProjectGrid projects={projects} />
      </section>
    </div>
  );
}
