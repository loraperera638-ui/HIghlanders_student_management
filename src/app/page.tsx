'use client';

import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import ClassesSection from '@/components/ClassesSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import { useModal } from '@/contexts/ModalContext';
import { useInquiry } from '@/contexts/InquiryContext';

export default function HomePage() {
  const { openModal } = useModal();
  const { openInquiryModal } = useInquiry();

  const handleGetStarted = () => {
    openModal();
  };

  const handleMakeInquiry = () => {
    openInquiryModal();
  };

  return (
    <>
      <HeroSection onGetStarted={handleGetStarted} onMakeInquiry={handleMakeInquiry} />
      <ClassesSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
