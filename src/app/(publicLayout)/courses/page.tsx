'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';

const API = process.env.NEXT_PUBLIC_BACKEND_URL;

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

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/v1/courses`);
      setCourses(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Courses
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {courses.length} courses available
        </p>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div
            key={course.id}
            onClick={() => router.push(`/courses/${course.id}`)}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          >
            {/* Course Image */}
            <div className="h-48 bg-gray-200 dark:bg-gray-700">
              {course.imageUrl ? (
                <Image
                  src={course.imageUrl}
                  alt={course.title}
                  width={400}
                  height={192}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No image
                </div>
              )}
            </div>

            {/* Course Content */}
            <div className="p-5">
              {/* Category Badge */}
              <div className="mb-2">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded">
                  {course.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                {course.title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {course.description}
              </p>

              {/* Instructor */}
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-3">
                By {course.instructor}
              </p>

              {/* Course Details */}
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-4">
                <span>📚 {course.duration}</span>
                <span>👥 {course.students} students</span>
              </div>

              {/* Price and Status */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-800">
                <div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {course.price} Tk
                  </span>
                  {course.price > 0 && (
                    <span className="text-sm text-gray-500"> /course</span>
                  )}
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    course.status === 'PUBLISHED'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      : course.status === 'DRAFT'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  {course.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {courses.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-300">
            No courses available
          </p>
        </div>
      )}
    </div>
  );
}
