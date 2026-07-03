'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import OnboardingModal from './OnboardingModal';
import InquiryModal from './InquiryModal';
import BackToTop from './BackToTop';
import { ModalProvider, useModal } from '@/contexts/ModalContext';
import { InquiryProvider, useInquiry } from '@/contexts/InquiryContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

function AppLayoutContent({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const { isModalOpen, closeModal } = useModal();
  const { isInquiryModalOpen, closeInquiryModal } = useInquiry();

  // Don't show navbar and footer on admin, student, and login dashboard routes
  const shouldShowNavElements = !pathname?.startsWith('/admin') && !pathname?.startsWith('/student') && !pathname?.startsWith('/login');

  return (
    <div className="min-h-screen flex flex-col">
      {shouldShowNavElements && <Navbar />}
      <main className={`${shouldShowNavElements ? 'flex-1' : ''}`}>
        {children}
      </main>
      {shouldShowNavElements && <Footer />}
      {shouldShowNavElements && <OnboardingModal isOpen={isModalOpen} onClose={closeModal} />}
      {shouldShowNavElements && <InquiryModal isOpen={isInquiryModalOpen} onClose={closeInquiryModal} />}
      {shouldShowNavElements && <BackToTop />}
    </div>
  );
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <ModalProvider>
      <InquiryProvider>
        <AppLayoutContent>{children}</AppLayoutContent>
      </InquiryProvider>
    </ModalProvider>
  );
}
