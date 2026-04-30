import Link from 'next/image';
import {
  Calendar,
  ArrowLeft,
  Clock,
  Users,
  BookOpen,
  User,
  Tag,
  Star,
  Play,
  Award,
  ChevronRight,
  CheckCircle,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import LinkNext from 'next/link';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  students: number;
  price: number;
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  instructor: string;
  startDate?: string;
  imageUrl?: string;
}

interface Props {
  params: Promise<{ id: string }>;
}

async function getCourses(id: string): Promise<Course | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses/${id}`,
      {
        cache: 'no-store',
      },
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function CoursesDetailPage({ params }: Props) {
  const { id } = await params;
  const course = await getCourses(id);

  if (!course) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">কোর্সটি পাওয়া যায়নি</h1>
          <LinkNext href="/courses" className="text-[#6efd0b] flex items-center gap-2 justify-center">
            <ArrowLeft size={16} /> সব কোর্স দেখুন
          </LinkNext>
        </div>
      </div>
    );
  }

  const formatNumber = (num: number | undefined | null) => {
    if (num === undefined || num === null) return '0';
    return num.toLocaleString();
  };

  const formatDate = (date: string | undefined) => {
    if (!date) return 'শিঘ্রই শুরু হবে';
    try {
      return new Date(date).toLocaleDateString('bn-BD', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Top Navigation */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <LinkNext
          href="/courses"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#6efd0b] transition-colors group text-sm font-medium"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          সব কোর্স দেখুন
        </LinkNext>
      </div>

      {/* Main Content & Sales Funnel Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Left Column: Course Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#6efd0b]/10 text-[#6efd0b] rounded-full text-xs font-bold uppercase tracking-wider">
                  {course.category || 'Professional Course'}
                </span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold">
                  {course.status === 'PUBLISHED' ? '● ভর্তি চলছে' : '● আপকামিং'}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                {course.title}
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed italic border-l-4 border-[#6efd0b] pl-4">
                "{course.description}"
              </p>
            </div>

            {/* Course Features - Sales Booster */}
            <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Zap className="text-[#6efd0b]" size={20} /> এই কোর্সে আপনি যা যা পাবেন:
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'লাইফটাইম এক্সেস',
                  'প্রফেশনাল সার্টিফিকেট',
                  'লাইভ সাপোর্ট সেশন',
                  'প্র্যাকটিক্যাল প্রজেক্ট',
                  'আপডেটেড কারিকুলাম',
                  'ক্যারিয়ার গাইডলাইন',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle className="text-[#6efd0b]" size={18} />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-white dark:bg-black border border-gray-100 dark:border-gray-800 rounded-xl text-center">
                <Clock className="mx-auto mb-2 text-[#6efd0b]" size={20} />
                <p className="text-xs text-gray-500">সময়সীমা</p>
                <p className="font-bold text-gray-900 dark:text-white">{course.duration}</p>
              </div>
              <div className="p-4 bg-white dark:bg-black border border-gray-100 dark:border-gray-800 rounded-xl text-center">
                <Users className="mx-auto mb-2 text-[#6efd0b]" size={20} />
                <p className="text-xs text-gray-500">শিক্ষার্থী</p>
                <p className="font-bold text-gray-900 dark:text-white">{formatNumber(course.students)}+</p>
              </div>
              <div className="p-4 bg-white dark:bg-black border border-gray-100 dark:border-gray-800 rounded-xl text-center">
                <User className="mx-auto mb-2 text-[#6efd0b]" size={20} />
                <p className="text-xs text-gray-500">ইন্সট্রাক্টর</p>
                <p className="font-bold text-gray-900 dark:text-white truncate">{course.instructor}</p>
              </div>
              <div className="p-4 bg-white dark:bg-black border border-gray-100 dark:border-gray-800 rounded-xl text-center">
                <Calendar className="mx-auto mb-2 text-[#6efd0b]" size={20} />
                <p className="text-xs text-gray-500">শুরু হবে</p>
                <p className="font-bold text-gray-900 dark:text-white">{formatDate(course.startDate)}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Image (Sales Card) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white dark:bg-black rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
                <div className="relative aspect-video">
                  {course.imageUrl ? (
                    <Image
                      src={course.imageUrl}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                      <Play size={48} className="text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <div className="w-16 h-16 bg-[#6efd0b] rounded-full flex items-center justify-center shadow-lg">
                      <Play fill="black" size={24} />
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-gray-900 dark:text-white">
                      ৳{course.price || 'Free'}
                    </span>
                    {course.price > 0 && (
                        <span className="text-gray-400 line-through text-lg">৳{course.price + 500}</span>
                    )}
                  </div>

                  <div className="space-y-3">
                    <button 
                      className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                        course.status === 'PUBLISHED'
                        ? 'bg-[#6efd0b] text-gray-900 hover:bg-[#4fd100] shadow-lg shadow-[#6efd0b]/20'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={course.status !== 'PUBLISHED'}
                    >
                      {course.status === 'PUBLISHED' ? 'এনরোল করুন' : 'শিঘ্রই আসছে'}
                      <ChevronRight size={18} />
                    </button>
                    <p className="text-center text-xs text-gray-500">৩ দিনের মানি ব্যাক গ্যারান্টি</p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">কোর্সটি কেন কিনবেন?</p>
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <Award size={14} className="text-[#6efd0b]" /> ইন্ডাস্ট্রি এক্সপার্ট গাইডেন্স
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <BookOpen size={14} className="text-[#6efd0b]" /> হ্যান্ডস-অন প্র্যাকটিক্যাল লার্নিং
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Trust Badges - User Friendly Info */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 dark:bg-white/5 rounded-3xl border border-transparent hover:border-[#6efd0b]/20 transition-all">
                <div className="w-16 h-16 bg-[#6efd0b]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Play size={32} className="text-[#6efd0b]" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">শিখুন নিজের গতিতে</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">যেকোনো সময়, যেকোনো ডিভাইস থেকে ক্লাসগুলো দেখার সুবিধা।</p>
            </div>
            <div className="text-center p-8 bg-gray-50 dark:bg-white/5 rounded-3xl border border-transparent hover:border-[#6efd0b]/20 transition-all">
                <div className="w-16 h-16 bg-[#6efd0b]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Star size={32} className="text-[#6efd0b]" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">সেরা ইন্সট্রাক্টর</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">ইন্ডাস্ট্রিতে কাজ করার বাস্তব অভিজ্ঞতা সম্পন্ন মেন্টরদের গাইডেন্স।</p>
            </div>
            <div className="text-center p-8 bg-gray-50 dark:bg-white/5 rounded-3xl border border-transparent hover:border-[#6efd0b]/20 transition-all">
                <div className="w-16 h-16 bg-[#6efd0b]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Award size={32} className="text-[#6efd0b]" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">সার্টিফিকেট</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">সফলভাবে কোর্স শেষ করার পর প্রফেশনাল সার্টিফিকেট অর্জনের সুযোগ।</p>
            </div>
        </div>
      </div>
    </div>
  );
}
