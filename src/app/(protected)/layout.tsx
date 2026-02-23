"use client";

import Sidebar from "@/src/components/SideBar";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
