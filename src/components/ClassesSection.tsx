'use client';

import { motion } from 'framer-motion';
import { Clock, Users, Calendar } from 'lucide-react';
import { Class } from '@/types';

const ClassesSection = () => {
  // Mock data - this will come from the API
  const classes: Class[] = [
    {
      _id: '1',
      name: 'Beginners Taekwondo',
      schedule: {
        days: ['Monday', 'Wednesday', 'Friday'],
        startTime: '18:00',
        endTime: '19:30',
      },
      ageCategory: 'Ages 7-12',
      description: 'Perfect for young beginners to learn the fundamentals of Taekwondo in a fun and safe environment.',
      isVisible: true,
      currentEnrollment: 15,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: '2',
      name: 'Advanced Taekwondo',
      schedule: {
        days: ['Tuesday', 'Thursday'],
        startTime: '19:00',
        endTime: '21:00',
      },
      ageCategory: 'Ages 13+',
      description: 'For experienced practitioners looking to advance their skills and prepare for competitions.',
      isVisible: true,
      currentEnrollment: 12,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: '3',
      name: 'Adult Fitness Taekwondo',
      schedule: {
        days: ['Monday', 'Wednesday', 'Saturday'],
        startTime: '20:00',
        endTime: '21:30',
      },
      ageCategory: 'Ages 18+',
      description: 'Combine martial arts training with fitness for a comprehensive workout experience.',
      isVisible: true,
      currentEnrollment: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return (
    <section id="classes" className="section-gradient py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-athletic">
            Our Classes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the perfect class for your age and skill level. Our expert instructors provide personalized attention to help you achieve your martial arts goals.
          </p>
        </motion.div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((classItem, index) => (
            <motion.div
              key={classItem._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="gradient-border card-hover"
            >
              <div className="gradient-border-inner p-6">
                {/* Class Header */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 font-athletic">
                    {classItem.name}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1 text-primary-sunset" />
                      <span>{classItem.ageCategory}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1 text-primary-wave" />
                      <span>{classItem.currentEnrollment} enrolled</span>
                    </div>
                  </div>
                </div>

                {/* Schedule */}
                <div className="mb-4">
                  <div className="flex items-center text-gray-700 mb-2">
                    <Calendar className="w-5 h-5 mr-2 text-primary-sunset" />
                    <span className="font-medium">Schedule:</span>
                  </div>
                  <div className="text-gray-600">
                    <div>{classItem.schedule.days.join(', ')}</div>
                    <div className="flex items-center mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{classItem.schedule.startTime} - {classItem.schedule.endTime}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {classItem.description}
                </p>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary text-center"
                >
                  Join This Class
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-athletic">
              Not Sure Which Class Is Right for You?
            </h3>
            <p className="text-gray-600 mb-6">
              Our experienced instructors are here to help you find the perfect fit. Contact us for a free consultation and trial class.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary"
            >
              Get Free Consultation
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClassesSection;
