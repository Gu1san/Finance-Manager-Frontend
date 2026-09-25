import { Home, List, CreditCard, User } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

export default function Sidebar({ active }: { active?: string }) {
  const [hovered, setHovered] = useState<string | null>(null);

  const router = useRouter();
  const pathName = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Extrato', icon: List, path: '/report' },
    { name: 'Perfil', icon: User, path: '/profile' },
  ];

  return (
    <motion.aside
      initial={{ x: 150, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120 }}
      className="fixed md:rounded-r-3xl -left-px top-0 h-screen w-20 md:w-40 bg-black-forest-active shadow-xl border-l  flex flex-col items-center px-2 py-6 z-50"
    >
      <div className="flex flex-col gap-6 mt-10">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathName.startsWith(item.path);
          const isHovered = hovered === item.path;

          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              onMouseEnter={() => setHovered(item.path)}
              onMouseLeave={() => setHovered(null)}
              className={`relative flex items-center md:w-full gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-black-forest-hover text-white'
                  : 'text-cornsilk hover:bg-black-forest-hover'
              }`}
            >
              <Icon size={24} />
              <p className="hidden md:block">{item.name}</p>
              {(isHovered || isActive) && (
                <div className="md:hidden absolute right-14 bg-cornsilk-secondary text-black text-sm px-2 py-3 rounded-md whitespace-nowrap" />
              )}
            </button>
          );
        })}
      </div>
    </motion.aside>
  );
}
