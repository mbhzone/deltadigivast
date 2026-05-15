import { Footer } from '@/components/layouts/footer';
import { Navbar } from '@/components/layouts/navbar';
import React from 'react';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#FAFFF7] dark:bg-gray-950">
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
}
