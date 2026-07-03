'use client';

import { useEffect, useState } from 'react';
import { Calendar, CreditCard, User, Trophy, Clock, DollarSign, Activity } from 'lucide-react';

interface StudentStats {
  membershipStatus: 'active' | 'inactive' | 'expired';
  nextPayment: string;
  attendedClasses: number;
  totalClasses: number;
  currentRank: string;
  nextRank: string;
  monthlyFee: number;
}

export default function StudentDashboard() {
  const [stats, setStats] = useState<StudentStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentStats();
  }, []);

  const fetchStudentStats = async () => {
    try {
      // TODO: Implement student stats API
      const mockStats: StudentStats = {
        membershipStatus: 'active',
        nextPayment: '2024-05-01',
        attendedClasses: 24,
        totalClasses: 30,
        currentRank: 'Yellow Belt',
        nextRank: 'Green Belt',
        monthlyFee: 45,
      };
      setStats(mockStats);
    } catch (error) {
      console.error('Error fetching student stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">No data available.</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Student Dashboard</h1>
      
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-primary-sunset to-primary-wave rounded-lg p-6 text-white mb-8">
        <h2 className="text-2xl font-bold mb-2">Welcome back, Student!</h2>
        <p className="text-white/90">Track your progress, manage your subscription, and stay updated with your Taekwondo journey.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              stats.membershipStatus === 'active' ? 'bg-green-100' : 
              stats.membershipStatus === 'expired' ? 'bg-red-100' : 'bg-yellow-100'
            }`}>
              <CreditCard className={`w-6 h-6 ${
                stats.membershipStatus === 'active' ? 'text-green-600' : 
                stats.membershipStatus === 'expired' ? 'text-red-600' : 'text-yellow-600'
              }`} />
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${
              stats.membershipStatus === 'active' ? 'bg-green-100 text-green-800' : 
              stats.membershipStatus === 'expired' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {stats.membershipStatus.charAt(0).toUpperCase() + stats.membershipStatus.slice(1)}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Membership</h3>
          <p className="text-sm text-gray-600">Next payment: {new Date(stats.nextPayment).toLocaleDateString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-gray-600">{stats.attendedClasses}/{stats.totalClasses}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Class Attendance</h3>
          <p className="text-sm text-gray-600">This month</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm text-gray-600">Current</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{stats.currentRank}</h3>
          <p className="text-sm text-gray-600">Next: {stats.nextRank}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-gray-600">Monthly</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">£{stats.monthlyFee}</h3>
          <p className="text-sm text-gray-600">Membership fee</p>
        </div>
      </div>

      {/* Recent Activity & Upcoming Classes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Classes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-primary-sunset" />
            Recent Classes
          </h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Beginners Taekwondo</p>
                  <p className="text-sm text-gray-600">April 1, 2024 - 4:00 PM</p>
                  <p className="text-xs text-gray-500">Attended ✓</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Completed
                </span>
              </div>
            </div>
            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Advanced Taekwondo</p>
                  <p className="text-sm text-gray-600">March 30, 2024 - 6:00 PM</p>
                  <p className="text-xs text-gray-500">Attended ✓</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Completed
                </span>
              </div>
            </div>
            <div className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Adult Fitness Taekwondo</p>
                  <p className="text-sm text-gray-600">March 28, 2024 - 8:00 PM</p>
                  <p className="text-xs text-gray-500">Attended ✓</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Completed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-primary-sunset" />
            Upcoming Classes
          </h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Beginners Taekwondo</p>
                  <p className="text-sm text-gray-600">Today - 4:00 PM</p>
                  <p className="text-xs text-gray-500">Instructor: Master Highland</p>
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
                  <p className="text-sm text-gray-600">Tomorrow - 6:00 PM</p>
                  <p className="text-xs text-gray-500">Instructor: Master Chen</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Tomorrow
                </span>
              </div>
            </div>
            <div className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Adult Fitness Taekwondo</p>
                  <p className="text-sm text-gray-600">Friday - 8:00 PM</p>
                  <p className="text-xs text-gray-500">Instructor: Master Highland</p>
                </div>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                  This Week
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <CreditCard className="w-6 h-6 text-primary-sunset mb-2" />
            <h3 className="font-medium">Manage Subscription</h3>
            <p className="text-sm text-gray-600">Update or change your membership plan</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <User className="w-6 h-6 text-primary-sunset mb-2" />
            <h3 className="font-medium">Update Profile</h3>
            <p className="text-sm text-gray-600">Edit your personal information</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Calendar className="w-6 h-6 text-primary-sunset mb-2" />
            <h3 className="font-medium">View Schedule</h3>
            <p className="text-sm text-gray-600">See your class schedule and attendance</p>
          </button>
        </div>
      </div>
    </div>
  );
}
