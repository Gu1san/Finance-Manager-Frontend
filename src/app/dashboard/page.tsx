"use client";

import Sidebar from "../../components/SideBar";
import Dashboard from "../../pages/Dashboard";
import { useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import Report from "@/src/pages/Report";

export default function DashboardPage() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "report":
        return <Report />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex bg-gray-100">
        <Sidebar active={activePage} onNavigate={setActivePage} />
        <main className="flex-1 p-6">{renderPage()}</main>
      </div>
    </ProtectedRoute>
  );
}
