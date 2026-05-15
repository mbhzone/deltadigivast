'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Clock,
  Users,
  DollarSign,
} from 'lucide-react';
import { uploadImage } from '@/utils/uploadImage';
import Image from 'next/image';
import Loading from '@/components/module/shared/loading';

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

const API = process.env.NEXT_PUBLIC_BACKEND_URL;
const getToken = () => {
  return (
    localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
  );
};

export default function CoursesManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAdding, setIsAdding] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);

  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    category: '',
    duration: '',
    price: 0,
    instructor: '',
    status: 'DRAFT' as 'PUBLISHED' | 'DRAFT' | 'ARCHIVED',
    imageFile: null as File | null,
    imageUrl: '',
  });

  // Load courses from API
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

  // Call fetchCourses on mount
  useState(() => {
    fetchCourses();
  });

  // Filtered courses
  // const categories = ['all', ...new Set(courses.map(c => c.category))];
  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === 'all' || course.category === categoryFilter;
    const matchesStatus =
      statusFilter === 'all' || course.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Add or update course
  const handleSaveCourse = async () => {
    try {
      if (!newCourse.title || !newCourse.instructor) {
        toast.error('Title and Instructor are required');
        return;
      }

      setLoading(true);
      let imageUrl = newCourse.imageUrl;

      // Upload image if selected
      if (newCourse.imageFile) {
        imageUrl = await uploadImage(newCourse.imageFile);
      }

      const body = {
        title: newCourse.title,
        description: newCourse.description,
        category: newCourse.category,
        duration: newCourse.duration,
        instructor: newCourse.instructor,
        price: newCourse.price,
        status: newCourse.status,
        imageUrl,
      };

      const token = getToken();

      if (editingCourse) {
        // Update
        const res = await axios.patch(
          `${API}/api/v1/courses/${editingCourse.id}`,
          body,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        toast.success('Course updated successfully');
      } else {
        // Create
        const res = await axios.post(`${API}/api/v1/courses`, body, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Course added successfully');
      }

      // Reset form
      setEditingCourse(null);
      setNewCourse({
        title: '',
        description: '',
        category: '',
        duration: '',
        price: 0,
        instructor: '',
        status: 'DRAFT',
        imageFile: null,
        imageUrl: '',
      });
      setIsAdding(false);

      // Refresh courses
      fetchCourses();
    } catch (error) {
      console.error(error);
      toast.error('Failed to save course');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setNewCourse({
      title: course.title,
      description: course.description,
      category: course.category,
      duration: course.duration,
      price: course.price,
      instructor: course.instructor,
      status: course.status,
      imageFile: null,
      imageUrl: course.imageUrl || '',
    });
    setIsAdding(true);
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      setLoading(true);
      const token = getToken();
      await axios.delete(`${API}/api/v1/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Course deleted successfully');
      fetchCourses();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete course');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400';
      case 'DRAFT':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400';
      case 'ARCHIVED':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Courses Management
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Total Courses: {courses.length} | Published:{' '}
            {courses.filter(c => c.status === 'PUBLISHED').length} | Drafts:{' '}
            {courses.filter(c => c.status === 'DRAFT').length}
          </p>
        </div>
        <button
          onClick={() => {
            setEditingCourse(null);
            setNewCourse({
              title: '',
              description: '',
              category: '',
              duration: '',
              price: 0,
              instructor: '',
              status: 'DRAFT',
              imageFile: null,
              imageUrl: '',
            });
            setIsAdding(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6efd0b] to-[#4fd100] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          Add New Course
        </button>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
          />
        </div>
        {/* <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
          <option value="ARCHIVED">Archived</option>
        </select> */}
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="mb-6 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {editingCourse ? 'Edit Course' : 'Add New Course'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={newCourse.title}
                onChange={e =>
                  setNewCourse({ ...newCourse, title: e.target.value })
                }
                placeholder="Course title"
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Image
              </label>
              <input
                type="file"
                onChange={e =>
                  setNewCourse({
                    ...newCourse,
                    imageFile: e.target.files ? e.target.files[0] : null,
                  })
                }
                className="w-full text-sm text-gray-900 dark:text-white"
              />
            </div>

            {/* Other fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <input
                type="text"
                value={newCourse.category}
                onChange={e =>
                  setNewCourse({ ...newCourse, category: e.target.value })
                }
                placeholder="Category"
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Instructor
              </label>
              <input
                type="text"
                value={newCourse.instructor}
                onChange={e =>
                  setNewCourse({ ...newCourse, instructor: e.target.value })
                }
                placeholder="Instructor"
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duration
              </label>
              <input
                type="text"
                value={newCourse.duration}
                onChange={e =>
                  setNewCourse({ ...newCourse, duration: e.target.value })
                }
                placeholder="8 weeks"
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price
              </label>
              <input
                type="number"
                value={newCourse.price}
                onChange={e =>
                  setNewCourse({ ...newCourse, price: Number(e.target.value) })
                }
                placeholder="0"
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={newCourse.status}
                onChange={e =>
                  setNewCourse({
                    ...newCourse,
                    status: e.target.value as
                      | 'PUBLISHED'
                      | 'DRAFT'
                      | 'ARCHIVED',
                  })
                }
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={newCourse.description}
                onChange={e =>
                  setNewCourse({ ...newCourse, description: e.target.value })
                }
                rows={3}
                placeholder="Course description"
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-4">
            <button
              onClick={() => {
                setIsAdding(false);
                setEditingCourse(null);
              }}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveCourse}
              className="px-4 py-2 bg-gradient-to-r from-[#6efd0b] to-[#4fd100] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              disabled={loading}
            >
              {loading
                ? editingCourse
                  ? 'Updating...'
                  : 'Saving...'
                : editingCourse
                  ? 'Update Course'
                  : 'Add Course'}
            </button>
          </div>
        </div>
      )}

      {/* Courses Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <Loading></Loading>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Thumbnail
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Instructor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredCourses.map(course => (
                  <tr
                    key={course.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Image
                        src={course.imageUrl || '/default-image.png'}
                        alt={course.title || 'Course image'}
                        width={80}
                        height={80}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {course.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                          {course.description}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">{course.category}</td>
                    <td className="px-6 py-4">{course.instructor}</td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <Clock size={16} /> {course.duration}
                      <Users size={16} /> {course.students || 0}
                      <DollarSign size={16} /> ${course.price}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${getStatusColor(
                          course.status,
                        )}`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditCourse(course)}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredCourses.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-center text-gray-500 dark:text-gray-300"
                    >
                      No courses found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
