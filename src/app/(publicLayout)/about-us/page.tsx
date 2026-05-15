import React from 'react';
import Image from 'next/image';
import {
  Users,
  Target,
  Award,
  Heart,
  Play,
  Camera,
  Code,
  TrendingUp,
  MapPin,
  Zap,
  CheckCircle,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

type TeamMember = {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  designation: string;
  skills: string;
  experience: number;
};

async function getTeam(): Promise<TeamMember[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
    {
      cache: 'no-store',
    },
  );

  const data = await res.json();

  return data.data;
}

export default async function AboutUs() {
  const team = await getTeam();

  const values = [
    {
      icon: Award,
      title: '🏆 Quality-এ কোনো Compromise নেই',
      description:
        'প্রতিটি video, প্রতিটি graphic, প্রতিটি campaign-এ আমরা সর্বোচ্চ মান বজায় রাখি। এই কারণেই আমরা 100% quality guarantee দিতে পারি।',
    },
    {
      icon: Users,
      title: '🤝 Client Partnership',
      description:
        'আপনার business-এর success মানেই আমাদের success। আমরা vendor না — আমরা আপনার digital partner।',
    },
    {
      icon: MapPin,
      title: '📍 রাজশাহী-First Approach',
      description:
        'রাজশাহীর market, রাজশাহীর মানুষ, রাজশাহীর business culture — এই সব আমরা ভেতর থেকে জানি। এই local knowledge-ই আমাদের সবচেয়ে বড় শক্তি।',
    },
    {
      icon: Zap,
      title: '⚡ Result-Driven কাজ',
      description:
        'সুন্দর কথা বলা সহজ। কিন্তু আমরা result দিয়ে কথা বলি। প্রতিটা project-এ measurable outcome আমাদের লক্ষ্য।',
    },
  ];

  return (
    <div className="min-h-screen transition-colors duration-300 space-y-10 md:space-y-20">
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

        <div className="relative px-4 sm:px-6 lg:px-8 py-10 md:py-28 lg:py-36">
          <div className="text-center">
            {/* Premium Badge with Animation */}
            <div className="inline-flex mb-8 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-[#6efd0b]/20 blur-xl rounded-full group-hover:blur-2xl transition-all duration-500"></div>
                <span className="relative inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-[#6efd0b]/30 rounded-full text-sm font-medium text-[#2e9e00] dark:text-[#6efd0b] shadow-lg">
                  <Sparkles size={14} className="text-[#6efd0b]" />
                  আমাদের সম্পর্কে
                  <ArrowUpRight size={14} className="opacity-70" />
                </span>
              </div>
            </div>
            {/* Premium Responsive Heading */}
            <div className="mb-4 md:mb-8">
              <h1 className="font-bold tracking-tight leading-[1.1] text-center">
                <span className="block text-gray-800 dark:text-gray-100 text-xl sm:text-4xl md:text-5xl lg:text-6xl">
                  রাজশাহীর Business-এর Digital Partner
                </span>

                <span className="block mt-2 text-xl sm:text-5xl md:text-6xl">
                  <span className="bg-gradient-to-r from-[#6efd0b] via-[#8bff3a] to-[#2e9e00] bg-clip-text text-transparent">
                    Delta Digivast
                  </span>
                </span>
              </h1>
            </div>

            {/* Premium Description */}
            <p className="text-gray-600 dark:text-gray-400 text-base text-sm md:text-xl max-w-2xl mx-auto leading-relaxed md:mb-10">
              আমরা শুধু একটা agency না। আমরা রাজশাহীর business owner-দের সেই
              মানুষগুলো যারা আপনার sales বাড়াতে রাতদিন কাজ করি।
            </p>
          </div>
        </div>

        {/* Premium Bottom Decorative Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6efd0b]/30 to-transparent"></div>
      </section>

      {/* About Section / Who We Are */}
      <section className="">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#6efd0b] font-semibold text-sm uppercase tracking-wider">
                আমরা কারা
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-6">
                রাজশাহীর মাটিতে জন্ম, রাজশাহীর
                <span className="text-[#6efd0b]"> Business-এর জন্য কাজ</span>
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Delta Digivast ২০২৫ সালের মে মাসে রাজশাহীতে প্রতিষ্ঠিত হয়েছে।
                আমাদের লক্ষ্য একটাই — রাজশাহীর প্রতিটি ভালো business-কে online-এ
                সেভাবে present করা যেভাবে সে deserve করে।
              </p>

              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                আমাদের কাছে আছে নিজস্ব professional studio, experienced video
                production team, creative graphics designers, এবং certified
                digital marketing specialists। রাজশাহীতে বসে রাজশাহীর
                business-এর জন্য কাজ করি — এটাই আমাদের পরিচয়।
              </p>

              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                আমরা বিশ্বাস করি — ভালো product বা service থাকলেই হয় না, সেটা
                মানুষের কাছে সঠিকভাবে পৌঁছাতে হয়। আমরা সেই সেতুবন্ধনটাই তৈরি
                করি।
              </p>

              {/* Tags/Skills Pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  'Video Production',
                  'Graphics Design',
                  'Facebook Ads',
                  'Social Media Marketing',
                  'Content Strategy',
                  'Brand Building',
                ].map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-full text-gray-700 dark:text-gray-300 transition-all hover:border-[#6efd0b]/50"
                  >
                    <CheckCircle className="w-3 h-3 text-[#6efd0b]" />
                    <span className="text-xs font-semibold">{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000"
                  alt="Delta Digivast Team Rajshahi"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#6efd0b]/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#6efd0b]/10 rounded-full blur-2xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#4fd100]/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className=" border-y border-gray-100 dark:border-gray-800 pt-10 md:pt-20 pb-5 md:pb-10 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-4xl font-bold text-gray-900 dark:text-white">
              আমাদের যে Values আমাদের আলাদা করে
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-4 md:p-6 rounded-xs shadow-lg border border-gray-200 dark:border-gray-900 hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-[#6efd0b]/10 w-10 h-10 md:w-14 md:h-14 rounded-xs flex items-center justify-center mb-3 md:mb-4">
                  <value.icon className="w-5 h-5 md:w-6 md:h-6 text-[#6efd0b]" />
                </div>

                <h3 className="text-sm md:text-lg font-semibold text-gray-900 dark:text-white mb-1 md:mb-2">
                  {value.title}
                </h3>

                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section (API DATA) - SMALLER CARDS */}
      <section className="pb-10 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#6efd0b] font-semibold text-sm uppercase tracking-wider">
              Our People
            </span>

            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
              Meet the Team
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-400">
              The talented people behind our success in Rajshahi
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {team.map((member: TeamMember) => (
              <div
                key={member.id}
                className="group rounded-xs shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50"
              >
                {/* Image container - SAME SIZE, but card padding reduced */}
                <div className="relative overflow-hidden aspect-square flex items-center justify-center ">
                  <div className="relative w-[85%] h-[85%]">
                    <Image
                      src={member.photoUrl}
                      alt={member.name}
                      fill
                      className="object-contain object-center"
                    />
                  </div>
                </div>

                {/* Card content - REDUCED PADDING */}
                <div className="p-3 md:p-4 pt-0 md:pt-0">
                  <h4 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-0.5">
                    {member.name}
                  </h4>

                  <p className="text-[#6efd0b] font-medium mb-1.5 text-xs md:text-sm">
                    {member.designation}
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                    অভিজ্ঞতা: {member.experience} বছর
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                    দক্ষতা: {member.skills}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
