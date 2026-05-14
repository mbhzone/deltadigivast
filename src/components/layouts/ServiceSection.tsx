import { Code2, Palette, Video, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceSectionProps {
  className?: string;
}

const ServiceSection = ({ className }: ServiceSectionProps) => {
  const services = [
    {
      icon: <Video className="h-6 w-6 text-[#6efd0b]" />,
      title: 'ভিডিও প্রোডাকশন',
      description:
        'আপনার পণ্যের হাই-কোয়ালিটি প্রমোশনাল এবং কমার্শিয়াল ভিডিও তৈরি করি আমরা, যা কাস্টমারকে আকৃষ্ট করবে।',
      items: ['প্রমোশনাল ভিডিও', 'প্রোডাক্ট শোকেস', 'সোশ্যাল মিডিয়া রিলস'],
    },
    {
      icon: <Palette className="h-6 w-6 text-[#6efd0b]" />,
      title: 'গ্রাফিক্স ডিজাইন',
      description:
        'ব্র্যান্ড ভ্যালু বাড়াতে আমরা দিচ্ছি ইউনিক এবং প্রফেশনাল গ্রাফিক্স ডিজাইন সলিউশন।',
      items: ['লোগো ডিজাইন', 'সোশ্যাল মিডিয়া পোস্ট', 'ব্যানার ও প্যাকেজিং'],
    },
    {
      icon: <Target className="h-6 w-6 text-[#6efd0b]" />,
      title: 'ডিজিটাল মার্কেটিং',
      description:
        'সঠিক অডিয়েন্সের কাছে আপনার পণ্য পৌঁছে দিয়ে আমরা আপনার সেলস বৃদ্ধি নিশ্চিত করি।',
      items: [
        'ফেসবুক অ্যাডস',
        'সোশ্যাল মিডিয়া ম্যানেজমেন্ট',
        'টার্গেটেড মার্কেটিং',
      ],
    },
    {
      icon: <Code2 className="h-6 w-6 text-[#6efd0b]" />,
      title: 'ওয়েব ডেভেলপমেন্ট',
      description:
        'আধুনিক প্রযুক্তির মাধ্যমে আমরা তৈরি করি ফাস্ট, রেসপনসিভ এবং এসইও ফ্রেন্ডলি ওয়েবসাইট।',
      items: ['বিজনেস ওয়েবসাইট', 'ই-কমার্স সলিউশন', 'ল্যান্ডিং পেজ ডিজাইন'],
    },
  ];

  return (
    <section className={cn(' ', className)}>
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-gray-900 dark:text-white">
              আমাদের সার্ভিসসমূহ
            </h2>
            <p className="mx-auto max-w-2xl text-lg tracking-tight text-gray-600 dark:text-gray-400 md:text-xl">
              রাজশাহীর local business-এর ডিজিটাল গ্রোথ নিশ্চিত করতে আমরা দিচ্ছি
              আধুনিক ও কার্যকরী সব ডিজিটাল সার্ভিস।
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="group space-y-6 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 transition-all hover:border-[#6efd0b]/50 hover:shadow-lg dark:hover:shadow-[#6efd0b]/5"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-[#6efd0b]/10 p-3 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                </div>
                <p className="leading-relaxed text-gray-600 dark:text-gray-400 text-sm">
                  {service.description}
                </p>
                <div className="space-y-2 pt-2">
                  {service.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-[#6efd0b]" />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { ServiceSection };
