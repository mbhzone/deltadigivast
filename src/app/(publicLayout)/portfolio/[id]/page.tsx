// src/app/(publicLayout)/portfolio/[id]/page.tsx
import Image from 'next/image';
import { ExternalLink, Calendar, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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

async function getProject(id: string): Promise<Project | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/portfolio/${id}`,
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

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            প্রজেক্টটি খুঁজে পাওয়া যায়নি
          </h1>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#6efd0b] text-gray-900 rounded-xl hover:bg-[#4fd100] transition-all font-semibold"
          >
            <ArrowLeft size={16} />
            পোর্টফোলিওতে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isVideo =
    project.videoUrl &&
    (project.videoUrl.includes('youtube') ||
      project.videoUrl.includes('youtu.be') ||
      project.videoUrl.includes('vimeo'));

  return (
    <div className="min-h-screen bg-white dark:bg-black py-12 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-[#6efd0b] dark:hover:text-[#6efd0b] transition-colors mb-8 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          সব প্রজেক্ট দেখুন
        </Link>

        {/* Project Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-[#6efd0b] mb-3">
            <Tag size={14} />
            <span className="text-sm font-semibold uppercase tracking-wider">
              {project.category || 'Portfolio'}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {project.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-300">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{formatDate(project.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Project Media Section */}
        {(project.imageUrl || project.videoUrl) && (
          <div className="mb-12 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 flex justify-center shadow-xl">
            {isVideo ? (
              <div className="aspect-video w-full">
                <iframe
                  src={
                    project.videoUrl?.includes('youtu.be')
                      ? `https://www.youtube.com/embed/${project.videoUrl.split('/').pop()}`
                      : project.videoUrl?.includes('youtube')
                        ? project.videoUrl.replace('watch?v=', 'embed/')
                        : project.videoUrl || ''
                  }
                  title={project.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            ) : (
              project.imageUrl && (
                /* Square Ratio (1080x1080 style) applied here */
                <div className="relative aspect-square w-full max-w-[600px] mx-auto">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )
            )}
          </div>
        )}

        {/* Project Description */}
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-l-4 border-[#6efd0b] pl-4">
            প্রজেক্ট সম্পর্কে বিস্তারিত
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-10 pt-10 border-t border-gray-100 dark:border-gray-800">
          <a
            href={project.videoUrl || project.imageUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#6efd0b] text-gray-900 rounded-xl hover:bg-[#4fd100] transition-all font-bold shadow-lg shadow-[#6efd0b]/20"
          >
            <ExternalLink size={18} />
            {isVideo ? 'ভিডিওটি দেখুন' : 'ছবিটি বড় করে দেখুন'}
          </a>
        </div>
      </div>
    </div>
  );
}
