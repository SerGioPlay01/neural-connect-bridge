
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from 'sonner';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-center" />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 page-transition">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
