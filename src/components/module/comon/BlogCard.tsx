'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';

type Blog = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

interface Props {
  blog: Blog;
}

export default function BlogCard({ blog }: Props) {
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <Link
      href={`/blog/${blog.id}`}
      className="group block  rounded-md shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-900">
        {blog.imageUrl ? (
          <div className="relative w-full max-w-[1080px] aspect-square">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
            No Image
          </div>
        )}

        {/* Date Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-lg">
          <Calendar size={12} />
          {formatDate(blog.createdAt)}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-[#6efd0b] transition-colors line-clamp-2">
          {blog.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {blog.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-500">
            {formatDate(blog.createdAt)}
          </span>

          <span className="flex items-center gap-1 text-sm font-medium text-[#6efd0b] group-hover:gap-2 transition-all">
            Read More
            <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
