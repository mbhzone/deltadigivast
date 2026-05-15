import BlogCard from '@/components/module/comon/BlogCard';
import { ArrowUpRight, Sparkles } from 'lucide-react';

type Blog = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

async function getBlogs(): Promise<Blog[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blogs`,
    {
      cache: 'no-store',
    },
  );
  const json = await res.json();
  return json.data || [];
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen text-gray-900 dark:text-white transition-colors duration-500">
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
                  ব্লগ ও রিসোর্স
                  <ArrowUpRight size={14} className="opacity-70" />
                </span>
              </div>
            </div>
            {/* Premium Responsive Heading */}
            <div className="mb-4 md:mb-8 ">
              <h1 className="font-bold tracking-tight leading-[1.1] text-center ">
                <span className="block text-gray-800 dark:text-gray-100 text-2xl sm:text-4xl md:text-5xl lg:text-6xl ">
                  রাজশাহীর Business Growth-এর
                </span>

                <span className="block mt-2 text-2xl sm:text-5xl md:text-6xl ">
                  <span className="bg-gradient-to-r from-[#6efd0b] via-[#8bff3a] to-[#2e9e00] bg-clip-text text-transparent">
                    টিপস ও ট্রিকস
                  </span>
                </span>
              </h1>
            </div>

            {/* Premium Description */}
            <p className="text-gray-600 dark:text-gray-300 text-base text-sm md:text-xl max-w-2xl mx-auto leading-relaxed md:mb-10">
              ডিজিটাল মার্কেটিং, ভিডিও প্রোডাকশন এবং রাজশাহীর লোকাল মার্কেট
              ট্রেন্ড নিয়ে আমাদের টিম অফ এক্সপার্টদের নিয়মিত গাইড ও ইনসাইট।
              আপনার ব্যবসার ডিজিটাল যাত্রা সহজ করতে আমাদের সাথেই থাকুন।
            </p>
          </div>
        </div>

        {/* Premium Bottom Decorative Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6efd0b]/30 to-transparent"></div>
      </section>

      {/* Blog Cards Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>
    </div>
  );
}
