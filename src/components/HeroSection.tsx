'use client';

import { motion } from 'framer-motion';
import { MessageSquare, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
  onMakeInquiry: () => void;
}

const HeroSection = ({ onGetStarted, onMakeInquiry }: HeroSectionProps) => {
  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
          {/* Fallback image */}
          <img
            src="/images/hero-fallback.jpg"
            alt="Taekwondo training"
            className="w-full h-full object-cover"
          />
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center">
          {/* Logo Circle */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-48 h-48 mx-auto mb-8 bg-white/10 backdrop-blur-md rounded-full border-4 border-white/30 flex items-center justify-center shadow-2xl"
          >
            <img 
              src="/images/logo.png" 
              alt="Highlanders Taekwondo Logo" 
              className="w-32 h-32 object-contain"
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-white mb-4 font-athletic text-shadow-lg"
          >
            Highlanders
          </motion.h1>
          
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-3xl md:text-5xl font-bold text-white mb-6 font-athletic text-shadow-lg"
          >
            Amateur Taekwondo CIC
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto px-4 text-shadow"
          >
            Building champions in martial arts and life through discipline, respect, and excellence
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
          >
            <motion.button
              onClick={onGetStarted}
              className="btn-primary text-lg px-12 py-4 flex items-center space-x-3 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>

            <motion.button
              onClick={onMakeInquiry}
              className="bg-white/20 backdrop-blur-md text-white border-2 border-white/30 font-bold py-4 px-8 rounded-full hover:bg-white/30 transition-all duration-300 flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Make an Inquiry</span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
