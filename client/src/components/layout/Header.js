import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Search, Sun, Moon, Languages } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export default function Header({ isDarkMode, toggleDarkMode }) {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-dark-700 sticky top-0 z-10">
      <div className="flex-1 flex items-center max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Search..." className="pl-10 bg-gray-50 dark:bg-dark-800 border-none h-10" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-dark-800 rounded-lg px-2 py-1">
          <Languages className="w-4 h-4 text-gray-500" />
          <select 
            onChange={changeLanguage} 
            value={i18n.language}
            className="bg-transparent border-none text-sm outline-none text-gray-700 dark:text-gray-300 focus:ring-0 cursor-pointer"
          >
            <option value="en">English</option>
            <option value="te">తెలుగు</option>
            <option value="hi">हिन्दी</option>
          </select>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-dark-900"></span>
        </Button>
        <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold border border-primary-200 dark:border-primary-800">
          U
        </div>
      </div>
    </header>
  );
}
