import { Home, List, CreditCard, User } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Sidebar({ active }: { active?: string }) {
  const [hovered, setHovered] = useState<string | null>(null);

  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Extrato", icon: List, path: "/report" },
    { name: "Perfil", icon: User, path: "/profile" },
  ];

  return (
    <motion.aside
      initial={{ x: 150, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="fixed left-0 top-0 h-screen w-20 bg-white shadow-xl border-l border-gray-200 flex flex-col items-center py-6 z-50"
    >
      <div className="flex flex-col gap-6 mt-10">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.path;
          const isHovered = hovered === item.path;

          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              onMouseEnter={() => setHovered(item.path)}
              onMouseLeave={() => setHovered(null)}
              className={`relative flex flex-col items-center p-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <Icon size={24} />
              {(isHovered || isActive) && (
                <span className="absolute right-14 bg-gray-800 text-white text-sm px-2 py-1 rounded-md whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </motion.aside>
  );
}
