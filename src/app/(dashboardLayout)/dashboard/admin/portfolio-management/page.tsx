'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { uploadImage } from '@/utils/uploadImage';
import EditPortfolioModal from '@/components/module/admin/EditPortfolioModal';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioItem } from '@/types/portfolio';
import {
  Plus,
  X,
  Image as ImageIcon,
  Video,
  Link as LinkIcon,
  Edit,
  Trash2,
  Eye,
  Search,
  Grid,
  List,
  Upload,
  Loader2,
  FolderOpen,
  ExternalLink,
  BarChart,
} from 'lucide-react';
import Loading from '@/components/module/shared/loading';

const getYouTubeId = (url: string) => {
  const regExp =
    /(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/)([^?&]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

export default function PortfolioManagement() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [newItem, setNewItem] = useState<Partial<PortfolioItem>>({
    title: '',
    category: 'Graphical Content',
    type: 'image',
    url: '',
    description: '',
  });

  const [editItem, setEditItem] = useState<PortfolioItem | null>(null);

  const API_BASE = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/portfolio`;
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('accessToken') ||
        sessionStorage.getItem('accessToken')
      : '';

  // Fetch portfolio
  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_BASE, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPortfolioItems(
        res.data.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          type: item.imageUrl ? 'image' : 'video content',
          url: item.imageUrl || item.videoUrl,
          description: item.description || '',
        })),
      );
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch portfolio');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  // Filter items with null checks
  const filteredItems = portfolioItems.filter(item => {
    const searchLower = searchTerm.toLowerCase();

    // Safe checks for undefined values
    const titleMatch = item.title?.toLowerCase().includes(searchLower) || false;
    const descriptionMatch =
      item.description?.toLowerCase().includes(searchLower) || false;
    const matchesSearch = searchTerm === '' || titleMatch || descriptionMatch;

    const matchesCategory =
      categoryFilter === 'all' || item.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = async () => {
    if (!newItem.title) return toast.error('Title is required');
    if (newItem.type === 'video content' && !newItem.url)
      return toast.error('Video URL is required');
    if (newItem.type === 'image' && !file)
      return toast.error('Image file is required');

    setLoading(true);
    try {
      let imageUrl = '';
      if (newItem.type === 'image' && file) {
        toast.loading('Uploading image...');
        imageUrl = await uploadImage(file);
        toast.dismiss();
        toast.success('Image uploaded');
      }

      const body = {
        title: newItem.title,
        category: newItem.category,
        description: newItem.description || '',
        imageUrl: newItem.type === 'image' ? imageUrl : null,
        videoUrl: newItem.type === 'video content' ? newItem.url : null,
      };

      const res = await axios.post(API_BASE, body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPortfolioItems(prev => [
        ...prev,
        {
          id: res.data.id,
          title: res.data.title,
          category: res.data.category,
          type: newItem.type!,
          url: newItem.type === 'image' ? imageUrl : newItem.url!,
          description: newItem.description || '',
        },
      ]);

      toast.success('Portfolio added successfully');
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error('Failed to add portfolio');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    setLoading(true);
    try {
      await axios.delete(`${API_BASE}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPortfolioItems(prev => prev.filter(item => item.id !== id));
      toast.success('Item deleted successfully');
    } catch (err) {
      console.error(err);
      toast.error('Delete failed');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNewItem({
      title: '',
      category: 'Graphical Content',
      type: 'image',
      url: '',
      description: '',
    });
    setFile(null);
    setImagePreview(null);
    setIsAdding(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Graphical Content':
        return <ImageIcon size={16} className="text-blue-500" />;
      case 'Video Content':
        return <Video size={16} className="text-red-500" />;
      case 'Campaign Result':
        return <BarChart size={16} className="text-yellow-500" />;
      case 'Website':
        return <LinkIcon size={16} className="text-green-500" />;
      default:
        return null;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Graphical Content':
        return 'bg-blue-100 text-blue-700';
      case 'Video Content':
        return 'bg-red-100 text-red-700';
      case 'Campaign Result':
        return 'bg-yellow-100 text-yellow-700';
      case 'Website':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 ">
      <div className="">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Portfolio Management
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Manage your agency s creative work samples
            </p>
          </div>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="inline-flex items-center gap-2 px-6 py-3
                     bg-gradient-to-r from-[#6efd0b] to-[#4fd100]
                     text-white font-medium rounded-xl
                     hover:shadow-lg hover:shadow-[#6efd0b]/30
                     transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-[#6efd0b]/50"
          >
            {isAdding ? <X size={20} /> : <Plus size={20} />}
            {isAdding ? 'Cancel' : 'Add New Portfolio'}
          </button>
        </div>

        {/* Add Form */}
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
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add New Portfolio Item
                </h2>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column - Form Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={newItem.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl
                                 bg-gray-50 dark:bg-gray-800
                                 border border-gray-300 dark:border-gray-700
                                 text-gray-900 dark:text-white
                                 placeholder-gray-400 dark:placeholder-gray-500
                                 focus:outline-none focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent
                                 transition-all duration-200"
                        placeholder="e.g., Brand Identity Design"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {' '}
                          Category{' '}
                        </label>
                        <select
                          name="category"
                          value={newItem.category}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
                        >
                          <option value="Graphical Content">
                            Graphical Content
                          </option>
                          <option value="Video Content">Video Content</option>
                          <option value="Campaign Result">
                            Campaign Result
                          </option>
                          <option value="Website">Website</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Type
                        </label>

                        <select
                          name="type"
                          value={newItem.type}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl 
      bg-gray-50 dark:bg-gray-800 
      border border-gray-300 dark:border-gray-700 
      text-gray-900 dark:text-white 
      focus:outline-none focus:ring-2 focus:ring-[#6efd0b]/50"
                        >
                          <option value="image">Image</option>
                          <option value="video content">Video</option>
                        </select>
                      </div>
                    </div>

                    {newItem.type === 'video content' ? (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Video URL *
                        </label>
                        <input
                          type="text"
                          name="url"
                          value={newItem.url}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl
                                   bg-gray-50 dark:bg-gray-800
                                   border border-gray-300 dark:border-gray-700
                                   text-gray-900 dark:text-white
                                   placeholder-gray-400 dark:placeholder-gray-500
                                   focus:outline-none focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
                          placeholder="https://youtube.com/..."
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Image *
                        </label>
                        <div className="flex items-center gap-4">
                          <label className="flex-1 cursor-pointer">
                            <div
                              className="flex items-center gap-3 px-4 py-3 rounded-xl
                                          bg-gray-50 dark:bg-gray-800
                                          border border-gray-300 dark:border-gray-700
                                          hover:bg-gray-100 dark:hover:bg-gray-700
                                          transition-colors duration-200"
                            >
                              <Upload size={20} className="text-gray-500" />
                              <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                {file ? file.name : 'Choose image file'}
                              </span>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        rows={3}
                        value={newItem.description}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl
                                 bg-gray-50 dark:bg-gray-800
                                 border border-gray-300 dark:border-gray-700
                                 text-gray-900 dark:text-white
                                 placeholder-gray-400 dark:placeholder-gray-500
                                 focus:outline-none focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
                        placeholder="Brief description of the work..."
                      />
                    </div>
                  </div>

                  {/* Right Column - Preview */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                      Preview
                    </h3>

                    {newItem.type === 'image' && imagePreview && (
                      <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {newItem.type === 'video content' && newItem.url && (
                      <div className="aspect-video rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 bg-gray-900 flex items-center justify-center">
                        <Video size={48} className="text-gray-600" />
                      </div>
                    )}

                    {!imagePreview && !newItem.url && (
                      <div
                        className="aspect-video rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 
                                    flex items-center justify-center bg-gray-100 dark:bg-gray-800"
                      >
                        <FolderOpen size={48} className="text-gray-400" />
                      </div>
                    )}

                    {newItem.title && (
                      <div className="mt-4">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {newItem.title}
                        </p>
                        {newItem.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {newItem.description}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 text-gray-700 dark:text-gray-300
                             hover:bg-gray-100 dark:hover:bg-gray-800
                             rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddItem}
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-6 py-2.5
                             bg-gradient-to-r from-[#6efd0b] to-[#4fd100]
                             text-white font-medium rounded-xl
                             hover:opacity-90 transition-opacity
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Plus size={18} />
                        Add Portfolio
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-md
                       bg-white dark:bg-gray-900
                       border border-gray-300 dark:border-gray-700
                       text-gray-900 dark:text-white
                       placeholder-gray-400 dark:placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="px-4 py-3 rounded-md
                       bg-white dark:bg-gray-900
                       border border-gray-300 dark:border-gray-700
                       text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="Graphical Content">Graphical Content</option>
              <option value="Video Content">Video Content</option>
              <option value="Campaign Result">Campaign Result</option>
              <option value="Website">Website</option>
            </select>

            <div className="flex bg-white dark:bg-gray-900 rounded-md border border-gray-300 dark:border-gray-700 overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#6efd0b]/10 text-[#4fd100]'
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 transition-colors ${
                  viewMode === 'list'
                    ? 'bg-[#6efd0b]/10 text-[#4fd100]'
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-md p-4 border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Items
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {portfolioItems.length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
            <p className="text-sm">Graphical</p>
            {
              portfolioItems.filter(i => i.category === 'Graphical Content')
                .length
            }
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">Video</p>
            {/* Video */}
            <p className="text-2xl font-bold text-red-600">
              {
                portfolioItems.filter(i => i.category === 'Video Content')
                  .length
              }
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">Campaign</p>
            {/* Campaign */}
            <p className="text-2xl font-bold text-yellow-600">
              {
                portfolioItems.filter(i => i.category === 'Campaign Result')
                  .length
              }
            </p>
          </div>
        </div>

        {/* Content */}
        {loading && portfolioItems.length === 0 ? (
          <Loading></Loading>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-800 
                         overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gray-100 dark:bg-gray-800">
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={e => {
                        (e.target as HTMLImageElement).src =
                          'https://via.placeholder.com/400x225?text=Image+Not+Found';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-black">
                      {(() => {
                        const videoId = getYouTubeId(item.url);

                        return videoId ? (
                          <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={item.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <p className="text-gray-400">Invalid Video URL</p>
                        );
                      })()}
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${getCategoryColor(item.category)}`}
                    >
                      {getCategoryIcon(item.category)}
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {item.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {item.type}
                    </span>

                    <div className="flex items-center gap-2">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        title="Preview"
                      >
                        <Eye size={16} />
                      </a>
                      <button
                        onClick={() => setEditItem(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/20 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/20 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-800 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Preview
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredItems.map(item => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.title}
                        </p>
                        {item.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 w-fit ${getCategoryColor(item.category)}`}
                      >
                        {getCategoryIcon(item.category)}
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {item.type}
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-[#6efd0b] hover:text-[#4fd100]"
                      >
                        <ExternalLink size={14} />
                        View
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditItem(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/20 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/20 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <FolderOpen size={40} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No portfolio items found
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm || categoryFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first portfolio item'}
            </p>
            {!searchTerm && categoryFilter === 'all' && (
              <button
                onClick={() => setIsAdding(true)}
                className="inline-flex items-center gap-2 px-6 py-3
                         bg-gradient-to-r from-[#6efd0b] to-[#4fd100]
                         text-white font-medium rounded-xl
                         hover:shadow-lg transition-all"
              >
                <Plus size={20} />
                Add Portfolio Item
              </button>
            )}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editItem && (
        <EditPortfolioModal
          item={editItem}
          onClose={() => setEditItem(null)}
          onUpdate={updatedItem => {
            setPortfolioItems(prev =>
              prev.map(p => (p.id === updatedItem.id ? updatedItem : p)),
            );
            setEditItem(null);
            toast.success('Item updated successfully');
          }}
        />
      )}
    </div>
  );
}
