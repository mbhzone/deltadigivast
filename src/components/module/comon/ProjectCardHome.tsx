'use client';
import React from 'react';
import Image from 'next/image';
import { Layers } from 'lucide-react';
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

type Props = {
  projects: Project[];
};

export default function ProjectCardHome({ projects }: Props) {
  return (
    <section className="container mx-auto px-4 ">
      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pb-3">
        {projects.slice(0, 6).map(project => (
          <div
            key={project.id}
            // href={`/portfolio/${project.id}`}
            className="group block bg-white dark:bg-black rounded-md shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-border"
          >
            <div className="relative h-52 md:h-72 overflow-hidden">
              {project.imageUrl ? (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : project.videoUrl ? (
                <iframe
                  src={
                    project.videoUrl.includes('youtu.be')
                      ? `https://www.youtube.com/embed/${project.videoUrl.split('/').pop()}`
                      : project.videoUrl
                  }
                  title={project.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-300">
                  No Preview
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
