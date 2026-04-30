import BlogCard from '@/components/module/comon/BlogCard';

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
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#6efd0b]/5 to-transparent dark:from-[#6efd0b]/10"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#6efd0b]/5 to-transparent dark:from-[#6efd0b]/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-[#6efd0b]/10 text-[#6efd0b] rounded-full text-sm font-medium mb-6">
            ব্লগ ও রিসোর্স
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            রাজশাহীর Business Growth-এর
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6efd0b] to-[#2e9e00]">
              {' '}
              টিপস ও ট্রিকস{' '}
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300 mb-10">
            ডিজিটাল মার্কেটিং, ভিডিও প্রোডাকশন এবং রাজশাহীর লোকাল মার্কেট ট্রেন্ড নিয়ে আমাদের টিম অফ এক্সপার্টদের নিয়মিত গাইড ও ইনসাইট। আপনার ব্যবসার ডিজিটাল যাত্রা সহজ করতে আমাদের সাথেই থাকুন।
          </p>
        </div>
      </section>
      
      {/* Blog Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>
    </div>
  );
}
