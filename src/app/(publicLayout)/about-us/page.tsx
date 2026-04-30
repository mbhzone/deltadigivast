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
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-black pt-5 md:mt-0 md:py-32">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#6efd0b]/5 to-transparent dark:from-[#6efd0b]/10"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#6efd0b]/5 to-transparent dark:from-[#6efd0b]/10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-[#6efd0b]/10 text-[#6efd0b] rounded-full text-sm font-medium mb-6">
            আমাদের সম্পর্কে
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            রাজশাহীর Business-এর Digital Partner — 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6efd0b] to-[#2e9e00]">
               Delta Digivast
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
            আমরা শুধু একটা agency না। আমরা রাজশাহীর business owner-দের সেই মানুষগুলো যারা আপনার sales বাড়াতে রাতদিন কাজ করি।
          </p>
        </div>
      </section>

      {/* About Section / Who We Are */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#6efd0b] font-semibold text-sm uppercase tracking-wider">
                আমরা কারা
              </span>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-6">
                রাজশাহীর মাটিতে জন্ম, রাজশাহীর 
                <span className="text-[#6efd0b]"> Business-এর জন্য কাজ</span>
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Delta Digivast ২০২৫ সালের মে মাসে রাজশাহীতে প্রতিষ্ঠিত হয়েছে। আমাদের লক্ষ্য একটাই — রাজশাহীর প্রতিটি ভালো business-কে online-এ সেভাবে present করা যেভাবে সে deserve করে।
              </p>

              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                আমাদের কাছে আছে নিজস্ব professional studio, experienced video production team, creative graphics designers, এবং certified digital marketing specialists। রাজশাহীতে বসে রাজশাহীর business-এর জন্য কাজ করি — এটাই আমাদের পরিচয়।
              </p>

              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                আমরা বিশ্বাস করি — ভালো product বা service থাকলেই হয় না, সেটা মানুষের কাছে সঠিকভাবে পৌঁছাতে হয়। আমরা সেই সেতুবন্ধনটাই তৈরি করি।
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
      <section className="py-20 bg-gray-50 dark:bg-black border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
               আমাদের যে Values আমাদের আলাদা করে
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white dark:bg-black p-4 md:p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-[#6efd0b]/10 w-10 h-10 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-3 md:mb-4">
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

      {/* Team Section (API DATA) */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4">
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

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 lg:gap-8">
            {team.map((member: TeamMember) => (
              <div
                key={member.id}
                className="group bg-white dark:bg-black rounded-md shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="relative h-40 sm:h-48 md:h-64 overflow-hidden">
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-4 md:p-6">
                  <h4 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h4>

                  <p className="text-[#6efd0b] font-medium mb-2 text-sm md:text-base">
                    {member.designation}
                  </p>

                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-1">
                    অভিজ্ঞতা: {member.experience} বছর
                  </p>

                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
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
