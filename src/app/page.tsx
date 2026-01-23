"use client";

import { useState } from "react";
import Transactions from "../pages/Dashboard";
import Sidebar from "../components/SideBar";
import Report from "../pages/Report";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "transactions":
        return <Transactions />;
      case "report":
        return <Report />;
      /*case "profile":
        return <Profile />;
        */
      default:
        return <Transactions />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar active={activePage} onNavigate={setActivePage} />
      <main className="flex-1 p-6">{renderPage()}</main>
    </div>
  );
}
