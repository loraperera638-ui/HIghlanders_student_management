'use client';

import { Home, Calendar, Users, Shield, Settings, Mail } from 'lucide-react';
import { redirect } from 'next/navigation';
import { logout } from '@/utils/auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Add authentication check
  // For now, we'll just render the children
  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-primary-navy text-white min-h-full flex-shrink-0">
          <div className="p-4">
            <h1 className="text-2xl font-bold font-athletic mb-8">Admin Panel</h1>
            <nav className="space-y-2">
              {[
                { name: 'Dashboard', href: '/admin', icon: Home },
                { name: 'Classes', href: '/admin/classes', icon: Calendar },
                { name: 'Members', href: '/admin/members', icon: Users },
                { name: 'Masters', href: '/admin/masters', icon: Shield },
                { name: 'Inquiries', href: '/admin/inquiries', icon: Mail },
                { name: 'Settings', href: '/admin/settings', icon: Settings },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-4 py-2 rounded hover:bg-white/10 transition-colors"
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow-sm border-b flex-shrink-0">
            <div className="px-6 py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Highlanders Taekwondo Admin</h2>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">Admin User</span>
                  <button 
                    onClick={logout}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>

          <footer className="bg-gray-800 text-white p-4 text-center flex-shrink-0">
            <p>&copy; 2024 Highlanders Amateur Taekwondo CIC. All rights reserved.</p>
            <p className="text-sm text-gray-400 mt-1">Powered by FlexNode Solutions</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
