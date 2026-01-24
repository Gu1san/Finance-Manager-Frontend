"use client";

import { useState } from "react";
import Sidebar from "../components/SideBar";
import Report from "../pages/Report";
import Dashboard from "../pages/Dashboard";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "transactions":
        return <Dashboard />;
      case "report":
        return <Report />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar active={activePage} onNavigate={setActivePage} />
      <main className="flex-1 p-6">{renderPage()}</main>
    </div>
  );
}
