'use client';

import { redirect } from 'next/navigation';
import { logout } from '@/utils/auth';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Add authentication check for student role
  // For now, we'll just render the children
  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-b from-primary-navy to-primary-wave text-white min-h-full flex-shrink-0">
          <div className="p-4">
            <h1 className="text-2xl font-bold font-athletic mb-8">Student Portal</h1>
            <nav className="space-y-2">
              <a href="/student" className="block px-4 py-2 rounded hover:bg-white/10 transition-colors">
                Dashboard
              </a>
              <a href="/student/subscription" className="block px-4 py-2 rounded hover:bg-white/10 transition-colors">
                Subscription
              </a>
              <a href="/student/billing" className="block px-4 py-2 rounded hover:bg-white/10 transition-colors">
                Billing
              </a>
              <a href="/student/profile" className="block px-4 py-2 rounded hover:bg-white/10 transition-colors">
                Profile
              </a>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow-sm border-b flex-shrink-0">
            <div className="px-6 py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Highlanders Taekwondo Student Portal</h2>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">Student Name</span>
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
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 px-6 flex-shrink-0">
        <div className="text-center text-sm">
          © 2026 Highlanders Amateur Taekwondo CIC | Powered by{' '}
          <a 
            href="https://flexnodelive.site" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-sunset hover:text-primary-wave transition-colors"
          >
            FlexNode
          </a>
          {' '} | All rights reserved
        </div>
      </footer>
    </div>
  );
}
