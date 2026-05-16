'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Mail,
  Phone,
  UserCheck,
  Eye,
} from 'lucide-react';
import axios from 'axios';
import ViewStaffModal from '@/components/module/admin/ViewStaffModal';
import Loading from '@/components/module/shared/loading';
import { toast } from 'sonner';

interface Staff {
  id?: string;
  employeeId: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  photoUrl?: string;
  role: string;
  designation?: string;
  skills?: string;
  salary?: number;
  experience?: number;
  department: string;
  joiningDate?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE';
  lastLogin?: string;
}

export default function StaffManagement() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [viewStaff, setViewStaff] = useState<Staff | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [formData, setFormData] = useState<Staff>({
    employeeId: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    photoUrl: '',
    role: '',
    designation: '',
    skills: '',
    salary: 0,
    experience: 0,

    department: '',
    status: 'ACTIVE',
    lastLogin: new Date().toISOString(),
  });

  const token =
    localStorage.getItem('accessToken') ||
    sessionStorage.getItem('accessToken');
  const API = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setIsFetching(true);
      const res = await axios.get(`${API}/api/v1/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStaff(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter staff based on search
  const filteredStaff = staff.filter(
    member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === 'experience' || name === 'salary') {
      setFormData({ ...formData, [name]: value === '' ? 0 : parseInt(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (name === 'joiningDate') {
      setFormData({ ...formData, joiningDate: value });
    }
  };

  // Add or Update Staff
  const handleSubmit = async () => {
    try {
      if (editingStaff) {
        // Update staff
        await axios.put(`${API}/api/v1/users/${editingStaff.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Add new staff
        await axios.post(`${API}/api/v1/users`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchUsers();
      resetForm();
    } catch (err) {
      console.log(err);
      toast.error('Error saving staff');
    }
  };

  // Delete staff
  const handleDeleteStaff = async (id: string) => {
    if (!confirm('Are you sure you want to delete this staff member?')) return;
    try {
      await axios.delete(`${API}/api/v1/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert('Error deleting staff');
    }
  };

  // View staff details (modal)
  const handleViewStaff = async (id: string) => {
    try {
      setIsLoading(true); // Start loading
      const res = await axios.get(`${API}/api/v1/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setViewStaff(res.data.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching staff details');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleEditStaff = (staff: Staff) => {
    setEditingStaff(staff);
    setFormData(staff);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      employeeId: '',
      name: '',
      email: '',
      password: '',
      phone: '',
      photoUrl: '',
      role: '',
      designation: '',
      skills: '',
      salary: 0,
      experience: 0,
      department: '',
      status: 'ACTIVE',
      lastLogin: new Date().toISOString(),
    });
    setEditingStaff(null);
    setShowForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400';
      case 'INACTIVE':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-300';
      case 'ON_LEAVE':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Staff Management
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Total Staff: {staff.length} | Active:{' '}
            {staff.filter(s => s.status === 'ACTIVE').length}
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6efd0b] to-[#4fd100] text-white font-medium rounded-lg hover:opacity-90 transition-opacity w-fit"
        >
          <Plus size={18} />
          Add Staff
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name, email, role, or department..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
          />
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="mb-6 p-6 bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {editingStaff ? 'Edit Staff' : 'Add New Staff'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ... All your inputs same as before ... */}
            <input
              type="text"
              name="employeeId"
              placeholder="Employee ID"
              value={formData.employeeId}
              onChange={handleInputChange}
              className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
            />
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={formData.name}
              onChange={handleInputChange}
              className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
            />
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleInputChange}
              readOnly={!!editingStaff} // <-- Read-only if editing
              className={`px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent ${editingStaff ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            <input
              type="password"
              name="password"
              placeholder="Password *"
              value={formData.password}
              onChange={handleInputChange}
              readOnly={!!editingStaff} // <-- Read-only if editing
              className={`px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent ${editingStaff ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
            />
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={formData.role}
              onChange={handleInputChange}
              className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleInputChange}
              className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
            />
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
            />
            <input
              type="text"
              name="skills"
              placeholder="Skills (comma separated)"
              value={formData.skills}
              onChange={handleInputChange}
              className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
            />
            <input
              type="number"
              name="experience"
              placeholder="Experience (years)"
              value={formData.experience}
              onChange={handleInputChange}
              className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
            />
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate?.slice(0, 10) || ''}
              onChange={handleInputChange}
              className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-800"
            />
            <input
              type="number"
              name="salary"
              placeholder="Salary (BDT)"
              value={formData.salary}
              onChange={handleInputChange}
              className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6efd0b]/50 focus:border-transparent"
            />
          </div>
          <div className="flex items-center justify-end gap-3 mt-4">
            <button
              onClick={resetForm}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-gradient-to-r from-[#6efd0b] to-[#4fd100] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              {editingStaff ? 'Update' : 'Add Staff'}
            </button>
          </div>
        </div>
      )}

      {/* Staff Table */}
      <div className="bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          {isFetching ? (
            <Loading></Loading>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    id
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Salary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Joining Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredStaff.map(member => (
                  <tr
                    key={member.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {member.employeeId}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {member.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 flex flex-col gap-1">
                      <span className="flex items-center gap-2">
                        <Mail size={14} />
                        {member.email}
                      </span>
                      <span className="flex items-center gap-2">
                        <Phone size={14} />
                        {member.phone}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {member.role}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {member.department}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {member.salary ? ` ${member.salary}` : 'N/A'} BDT
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {member.joiningDate
                        ? new Date(member.joiningDate).toLocaleDateString()
                        : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewStaff(member.id!)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/20 rounded-lg"
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleEditStaff(member)}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-500/20 rounded-lg"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteStaff(member.id!)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/20 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!isFetching && filteredStaff.length === 0 && (
            <div className="text-center py-12">
              <UserCheck size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 dark:text-gray-300">
                No staff members found
              </p>
            </div>
          )}
        </div>
      </div>
      {/* View Modal */}
      {isLoading && (
        <div className="fixed inset-0  backdrop-blur-sm flex items-center justify-center z-50">
          <div className=" p-6 rounded-xl flex flex-col items-center">
            <div className="animate-spin border-4 border-t-[#6efd0b] border-gray-200 rounded-full w-12 h-12 mb-4"></div>
          </div>
        </div>
      )}
      {/* View Modal */}
      {viewStaff && (
        <ViewStaffModal staff={viewStaff} onClose={() => setViewStaff(null)} />
      )}
    </div>
  );
}
