'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Calendar,
  Tag,
  Loader2,
  Image as ImageIcon,
  X,
  Upload,
  AlertCircle,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { uploadImage } from '@/utils/uploadImage';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '@/components/module/shared/loading';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date?: string;
}

export default function BlogManagement() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const getToken = () => {
    return (
      localStorage.getItem('accessToken') ||
      sessionStorage.getItem('accessToken')
    );
  };

  // GET ALL BLOGS
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/v1/blogs/`);
      setBlogPosts(res.data.data || res.data);
    } catch (error) {
      console.log(error);
      toast.error('Failed to load blogs', {
        style: {
          background: '#FEE2E2',
          color: '#991B1B',
          border: '1px solid #FCA5A5',
        },
        icon: <AlertCircle className="text-red-600" />,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // FILTER
  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // HANDLE IMAGE SELECTION
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      toast.info('📸 Image selected: ' + file.name, {
        style: {
          background: '#FEF3C7',
          color: '#92400E',
          border: '1px solid #FCD34D',
        },
        duration: 2000,
      });
    }
  };

  // CREATE BLOG
  const handleAddPost = async () => {
    if (!newPost.title || !newPost.excerpt) {
      toast.warning('Please fill in all fields', {
        style: {
          background: '#FEF3C7',
          color: '#92400E',
          border: '1px solid #FCD34D',
        },
        icon: <AlertCircle className="text-yellow-600" />,
      });
      return;
    }

    setLoading(true);

    try {
      let imageUrl = '';

      if (imageFile) {
        setUploadingImage(true);
        const uploadToast = toast.loading('🖼️ Uploading image...', {
          style: {
            background: '#FEF3C7',
            color: '#92400E',
          },
        });

        imageUrl = await uploadImage(imageFile);

        toast.dismiss(uploadToast);
        toast.success('✅ Image uploaded successfully!', {
          style: {
            background: 'linear-gradient(to right, #FBBF24, #F59E0B)',
            color: '#000',
            border: 'none',
          },
          icon: '🎨',
          duration: 3000,
        });
        setUploadingImage(false);
      }

      const token = getToken();

      const savingToast = toast.loading('📝 Saving your blog post...', {
        style: {
          background: '#FEF3C7',
          color: '#92400E',
        },
      });

      await axios.post(
        `${API_BASE}/api/v1/blogs`,
        {
          title: newPost.title,
          description: newPost.excerpt,
          imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.dismiss(savingToast);
      toast.success('🎉 Blog post created successfully!', {
        style: {
          background: 'linear-gradient(to right, #FBBF24, #F59E0B)',
          color: '#000',
          border: 'none',
        },
        icon: '✨',
        duration: 4000,
      });

      await fetchBlogs();

      setNewPost({ title: '', excerpt: '' });
      setImageFile(null);
      setImagePreview(null);
      setIsAdding(false);
    } catch (error) {
      console.log(error);
      toast.error('❌ Failed to create blog post', {
        style: {
          background: '#FEE2E2',
          color: '#991B1B',
          border: '1px solid #FCA5A5',
        },
        icon: <AlertCircle className="text-red-600" />,
      });
    } finally {
      setLoading(false);
    }
  };

  // UPDATE BLOG
  const handleUpdatePost = async () => {
    if (!editingPost) return;

    if (!newPost.title || !newPost.excerpt) {
      toast.warning('Please fill in all fields', {
        style: {
          background: '#FEF3C7',
          color: '#92400E',
          border: '1px solid #FCD34D',
        },
        icon: <AlertCircle className="text-yellow-600" />,
      });
      return;
    }

    setLoading(true);

    try {
      const token = getToken();
      let imageUrl = editingPost.imageUrl;

      if (imageFile) {
        setUploadingImage(true);
        const uploadToast = toast.loading('🖼️ Uploading new image...', {
          style: {
            background: '#FEF3C7',
            color: '#92400E',
          },
        });

        imageUrl = await uploadImage(imageFile);

        toast.dismiss(uploadToast);
        toast.success('✅ Image updated successfully!', {
          style: {
            background: 'linear-gradient(to right, #FBBF24, #F59E0B)',
            color: '#000',
            border: 'none',
          },
          icon: '🎨',
          duration: 3000,
        });
        setUploadingImage(false);
      }

      const updatingToast = toast.loading('🔄 Updating blog post...', {
        style: {
          background: '#FEF3C7',
          color: '#92400E',
        },
      });

      await axios.patch(
        `${API_BASE}/api/v1/blogs/${editingPost.id}`,
        {
          title: newPost.title,
          description: newPost.excerpt,
          imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.dismiss(updatingToast);
      toast.success('🎉 Blog post updated successfully!', {
        style: {
          background: 'linear-gradient(to right, #FBBF24, #F59E0B)',
          color: '#000',
          border: 'none',
        },
        icon: '✨',
        duration: 4000,
      });

      await fetchBlogs();

      setEditingPost(null);
      setNewPost({ title: '', excerpt: '' });
      setImageFile(null);
      setImagePreview(null);
      setIsAdding(false);
    } catch (error) {
      console.log(error);
      toast.error('❌ Failed to update blog post', {
        style: {
          background: '#FEE2E2',
          color: '#991B1B',
          border: '1px solid #FCA5A5',
        },
        icon: <AlertCircle className="text-red-600" />,
      });
    } finally {
      setLoading(false);
    }
  };

  // DELETE BLOG
  const handleDeletePost = async (id: string) => {
    toast.custom(
      t => (
        <div className="bg-white dark:bg-gray-900 rounded-md shadow-2xl border border-gray-200 dark:border-gray-800 p-6 max-w-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-100 dark:bg-red-500/20 rounded-full">
              <AlertCircle
                className="text-red-600 dark:text-red-400"
                size={24}
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Delete Blog Post
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                This action cannot be undone.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => toast.dismiss(t)}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t);
                try {
                  const token = getToken();

                  const deletingToast = toast.loading(
                    '🗑️ Deleting blog post...',
                    {
                      style: {
                        background: '#FEF3C7',
                        color: '#92400E',
                      },
                    },
                  );

                  await axios.delete(`${API_BASE}/api/v1/blogs/${id}`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });

                  toast.dismiss(deletingToast);
                  toast.success('✅ Blog post deleted successfully!', {
                    style: {
                      background: 'linear-gradient(to right, #FBBF24, #F59E0B)',
                      color: '#000',
                      border: 'none',
                    },
                    icon: '🗑️',
                    duration: 3000,
                  });

                  await fetchBlogs();
                } catch (error) {
                  console.log(error);
                  toast.error('❌ Failed to delete blog post', {
                    style: {
                      background: '#FEE2E2',
                      color: '#991B1B',
                      border: '1px solid #FCA5A5',
                    },
                  });
                }
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: 'top-center',
      },
    );
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setNewPost({
      title: post.title,
      excerpt: post.description,
    });
    setImagePreview(post.imageUrl);
    setIsAdding(true);

    toast.info('✏️ Editing blog post', {
      style: {
        background: '#FEF3C7',
        color: '#92400E',
        border: '1px solid #FCD34D',
      },
      duration: 2000,
    });
  };

  const resetForm = () => {
    setEditingPost(null);
    setNewPost({ title: '', excerpt: '' });
    setImageFile(null);
    setImagePreview(null);
    setIsAdding(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="">
        {/* Header with Gradient */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <BookOpen className="text-[#6efd0b]" size={32} />
              Blog Management
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Manage your blog posts and content
            </p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setIsAdding(true);
            }}
            className="inline-flex items-center gap-2 px-6 py-3
                     bg-gradient-to-r from-[#6efd0b] to-[#4fd100]
                     text-white font-medium rounded-md
                     hover:shadow-lg hover:shadow-[#6efd0b]/30
                     transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-[#6efd0b]/50"
          >
            <Plus size={20} />
            Add New Post
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search posts by title..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-md
                       bg-white dark:bg-gray-900
                       border border-gray-300 dark:border-gray-800
                       text-gray-900 dark:text-white
                       placeholder-gray-400 dark:placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent
                       transition-all duration-200"
            />
          </div>
        </div>

        {/* Add/Edit Form */}
        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-800 
                       shadow-xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="text-[#FBBF24]" size={20} />
                  {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h2>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column - Form Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        placeholder="Enter blog title"
                        value={newPost.title}
                        onChange={e =>
                          setNewPost({ ...newPost, title: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-md
                                 bg-gray-50 dark:bg-gray-800
                                 border border-gray-300 dark:border-gray-800
                                 text-gray-900 dark:text-white
                                 placeholder-gray-400 dark:placeholder-gray-500
                                 focus:outline-none focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent
                                 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        placeholder="Write your blog description..."
                        rows={4}
                        value={newPost.excerpt}
                        onChange={e =>
                          setNewPost({ ...newPost, excerpt: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-md
                                 bg-gray-50 dark:bg-gray-800
                                 border border-gray-300 dark:border-gray-800
                                 text-gray-900 dark:text-white
                                 placeholder-gray-400 dark:placeholder-gray-500
                                 focus:outline-none focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent
                                 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Featured Image
                      </label>
                      <div className="flex items-center gap-4">
                        <label className="flex-1 cursor-pointer">
                          <div
                            className="flex items-center gap-3 px-4 py-3 rounded-md
                                        bg-gray-50 dark:bg-gray-800
                                        border border-gray-300 dark:border-gray-800
                                        hover:bg-gray-100 dark:hover:bg-gray-700
                                        transition-colors duration-200"
                          >
                            <Upload size={20} className="text-gray-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
                              {imageFile
                                ? imageFile.name
                                : imagePreview
                                  ? 'Change image'
                                  : 'Choose image file'}
                            </span>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="hidden"
                          />
                        </label>
                        {imagePreview && (
                          <button
                            onClick={() => {
                              setImageFile(null);
                              setImagePreview(null);
                            }}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                          >
                            <X size={20} className="text-gray-500" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Preview */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-md p-6">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                      <Eye size={16} />
                      Preview
                    </h3>

                    {/* Image Preview */}
                    {(imagePreview || imageFile) && (
                      <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-800 mb-4">
                        <img
                          src={imagePreview || ''}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Title Preview */}
                    {newPost.title && (
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
                        {newPost.title}
                      </h4>
                    )}

                    {/* Description Preview */}
                    {newPost.excerpt && (
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {newPost.excerpt}
                      </p>
                    )}
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 text-gray-700 dark:text-gray-300
                             hover:bg-gray-100 dark:hover:bg-gray-800
                             rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingPost ? handleUpdatePost : handleAddPost}
                    disabled={loading || uploadingImage}
                    className="inline-flex items-center gap-2 px-6 py-2.5
                             bg-gradient-to-r from-[#6efd0b] to-[#4fd100]
                             text-white font-medium rounded-md
                             hover:opacity-90 transition-opacity
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading || uploadingImage ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        {uploadingImage ? 'Uploading...' : 'Saving...'}
                      </>
                    ) : (
                      <>
                        {editingPost ? <Edit size={18} /> : <Plus size={18} />}
                        {editingPost ? 'Update Post' : 'Create Post'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blog Posts Table */}
        <div className="bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-800 overflow-hidden">
          {loading && blogPosts.length === 0 ? (
            <Loading></Loading>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Title
                      </th>

                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {filteredPosts.map(post => (
                      <motion.tr
                        key={post.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          {post.imageUrl ? (
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
                              <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="w-full h-full object-cover"
                                onError={e => {
                                  (e.target as HTMLImageElement).src =
                                    'https://via.placeholder.com/64x64?text=No+Image';
                                }}
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                              <ImageIcon size={24} className="text-gray-400" />
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {post.title}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-300 mt-1 line-clamp-2">
                            {post.description}
                          </p>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEditPost(post)}
                              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/20 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>

                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/20 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-20">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <BookOpen size={40} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No blog posts found
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {searchTerm
                      ? 'Try adjusting your search term'
                      : 'Get started by creating your first blog post'}
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Summary Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            whileHover={{ y: -2 }}
            className="bg-white dark:bg-gray-900 rounded-md p-6 border border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-md">
                <Calendar
                  className="text-blue-600 dark:text-blue-400"
                  size={24}
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Total Posts
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {blogPosts.length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            className="bg-white dark:bg-gray-900 rounded-md p-6 border border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-500/20 rounded-md">
                <Tag
                  className="text-purple-600 dark:text-purple-400"
                  size={24}
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  With Images
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {blogPosts.filter(p => p.imageUrl).length}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
