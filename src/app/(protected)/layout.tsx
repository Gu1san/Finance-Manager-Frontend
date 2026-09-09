'use client';

import Sidebar from '@/src/components/SideBar';
import ProtectedRoute from '@/src/components/ProtectedRoute';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex">
        <Sidebar />
        <main className="flex-1 p-6 ml-20">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
