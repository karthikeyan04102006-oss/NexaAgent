'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { HumanApprovalModal } from '@/components/agent/HumanApprovalModal';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (!isAuthenticated && !isLoading) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#F5F4F0] dark:bg-[#121210] text-[#111111] dark:text-[#EAE8E3] font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Global Security Approval Modal */}
      <HumanApprovalModal />
    </div>
  );
};


