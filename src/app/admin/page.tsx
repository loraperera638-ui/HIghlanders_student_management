'use client';

import { useEffect, useState } from 'react';
import { Users, Calendar, DollarSign, TrendingUp } from 'lucide-react';

interface DashboardStats {
  totalMembers: number;
  activeClasses: number;
  pendingApplications: number;
  monthlyRevenue: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalMembers: 0,
    activeClasses: 0,
    pendingApplications: 0,
    monthlyRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        // Mock data for now
        setStats({
          totalMembers: 156,
          activeClasses: 12,
          pendingApplications: 8,
          monthlyRevenue: 15600,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Members',
      value: stats.totalMembers,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12% from last month',
    },
    {
      title: 'Active Classes',
      value: stats.activeClasses,
      icon: Calendar,
      color: 'bg-green-500',
      change: '+2 new this week',
    },
    {
      title: 'Pending Applications',
      value: stats.pendingApplications,
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: 'Needs review',
    },
    {
      title: 'Monthly Revenue',
      value: `£${stats.monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-purple-500',
      change: '+8% from last month',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center text-white`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-sm text-green-600 font-medium">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Applications</h2>
          <div className="space-y-4">
            {/* Mock data */}
            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">John Smith</p>
                  <p className="text-sm text-gray-600">Beginners Taekwondo</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  Pending
                </span>
              </div>
            </div>
            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">Advanced Taekwondo</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  Pending
                </span>
              </div>
            </div>
            <div className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Mike Wilson</p>
                  <p className="text-sm text-gray-600">Adult Fitness Taekwondo</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Approved
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Today's Classes</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Beginners Taekwondo</p>
                  <p className="text-sm text-gray-600">4:00 PM - 5:30 PM</p>
                  <p className="text-xs text-gray-500">15 students enrolled</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Today
                </span>
              </div>
            </div>
            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Advanced Taekwondo</p>
                  <p className="text-sm text-gray-600">6:00 PM - 8:00 PM</p>
                  <p className="text-xs text-gray-500">12 students enrolled</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Today
                </span>
              </div>
            </div>
            <div className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Adult Fitness Taekwondo</p>
                  <p className="text-sm text-gray-600">8:00 PM - 9:30 PM</p>
                  <p className="text-xs text-gray-500">8 students enrolled</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Today
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
