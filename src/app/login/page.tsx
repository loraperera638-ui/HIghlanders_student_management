'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Eye, EyeOff, GraduationCap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface LoginFormData {
  email: string;
  password: string;
  role: 'admin' | 'student';
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    role: 'student',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log('Form data being submitted:', formData);

    try {
      // For demo purposes, skip API and use direct authentication
      const validCredentials = {
        admin: { email: 'admin@highlanders.com', password: 'admin123' },
        student: { email: 'student@highlanders.com', password: 'password' },
      };

      const expectedCredentials = validCredentials[formData.role];
      
      if (formData.email === expectedCredentials.email && formData.password === expectedCredentials.password) {
        // Store authentication token
        localStorage.setItem('authToken', 'mock-token-' + Date.now());
        localStorage.setItem('userRole', formData.role);
        
        toast.success(`Welcome back, ${formData.role}!`);
        
        // Redirect based on role
        if (formData.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/student');
        }
      } else {
        toast.error('Invalid credentials. Please check your email and password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (role: 'admin' | 'student') => {
    setFormData(prev => ({
      ...prev,
      role,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-navy via-primary-wave to-primary-sunset flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Role</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleRoleChange('student')}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  formData.role === 'student'
                    ? 'border-primary-sunset bg-primary-sunset/10 text-primary-sunset'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <GraduationCap className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm font-medium">Student</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange('admin')}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  formData.role === 'admin'
                    ? 'border-primary-sunset bg-primary-sunset/10 text-primary-sunset'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <User className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm font-medium">Admin</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-sunset focus:border-transparent"
                  placeholder={formData.role === 'admin' ? 'admin@highlanders.com' : 'student@highlanders.com'}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-sunset focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-sunset border-gray-300 rounded focus:ring-primary-sunset"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary-sunset hover:text-primary-wave transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center mb-2">Demo Credentials:</p>
            <div className="text-xs text-gray-500 space-y-1">
              <p><strong>Student:</strong> student@highlanders.com / password</p>
              <p><strong>Admin:</strong> admin@highlanders.com / admin123</p>
            </div>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-8"
        >
          <a
            href="/"
            className="text-white/80 hover:text-white transition-colors text-sm"
          >
            ← Back to Home
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
