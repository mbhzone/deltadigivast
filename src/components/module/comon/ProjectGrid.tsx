'use client';
import React from 'react';
import Image from 'next/image';
import { Layers } from 'lucide-react';

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

type Props = {
  projects: Project[];
};

const categories = [
  'Video Content',
  'Graphical Content',
  'Campaign Result',
  'Website',
];

export default function ProjectGrid({ projects }: Props) {
  const [filter, setFilter] = React.useState<string>('Video Content');

  const filteredProjects =
    filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <section className="max-w-7xl mx-auto ">
      {/* Filter - Clean One Line */}
      <div className="my-8">
        <div className="flex items-start gap-3 flex-wrap lg:flex-nowrap">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1 pt-2">
            <Layers size={16} />
            Filter:
          </span>

          <div className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-hide">
            <div className="flex gap-2 min-w-max">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap
              ${
                filter === category
                  ? 'bg-[#6efd0b] text-gray-900 shadow-lg shadow-[#6efd0b]/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pb-3">
        {filteredProjects.map(project => (
          // <Link
          //   key={project.id}
          //   href={`/portfolio/${project.id}`}
          //   className="group block bg-white dark:bg-black rounded-md shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-border"
          // >
          <div key={project.id} className="">
            <div className="relative  overflow-hidden">
              {project.imageUrl ? (
                <div className="relative w-full  aspect-square">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : project.videoUrl ? (
                <div className="h-52 md:h-60 ">
                  <iframe
                    src={
                      project.videoUrl.includes('youtu.be')
                        ? `https://www.youtube.com/embed/${project.videoUrl.split('/').pop()}`
                        : project.videoUrl
                    }
                    title={project.title}
                    className="w-full h-full rounded-md "
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-300">
                  No Preview
                </div>
              )}
            </div>
          </div>
          // </Link>
        ))}
      </div>
    </section>
  );
}
