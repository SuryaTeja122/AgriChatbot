import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, MessageSquare, Activity, User } from 'lucide-react';
import { cn } from '../ui/Button';

export default function Sidebar() {
  const { t } = useTranslation();

  const navItems = [
    { name: t('dashboard'), path: '/dashboard', icon: LayoutDashboard },
    { name: t('chat'), path: '/chat', icon: MessageSquare },
    { name: t('disease_detection'), path: '/disease-detection', icon: Activity },
    { name: t('profile'), path: '/profile', icon: User },
  ];

  return (
    <aside className="w-64 hidden md:flex flex-col bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl border-r border-gray-200 dark:border-dark-700 h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-dark-700">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">AgriChatBot</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400 font-medium"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-dark-800 dark:hover:text-gray-100"
                )
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-dark-700">
        <div className="bg-primary-50 dark:bg-primary-500/10 p-4 rounded-xl">
          <p className="text-xs text-primary-600 dark:text-primary-400 font-medium mb-2">Need help?</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Contact support or read our docs.</p>
          <button className="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline">Support Center</button>
        </div>
      </div>
    </aside>
  );
}
