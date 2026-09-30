'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, Monitor } from 'lucide-react';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const options = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Monitor },
  ] as const;

  return (
    <div className="inline-flex items-center gap-1 p-1 bg-[#FAF9FC] dark:bg-[#111116] border border-[#E7E3EC] dark:border-[#23222B] rounded-[10px]">
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = theme === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => setTheme(opt.id)}
            title={`Switch to ${opt.label} theme`}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-[8px] transition-all duration-150 cursor-pointer ${
              isActive
                ? 'bg-[#A78BFA]/15 dark:bg-[#A78BFA]/20 text-[#7C3AED] dark:text-[#C4B5FD] font-bold shadow-subtle'
                : 'text-[#696572] dark:text-[#A7A3B2] hover:text-[#17151C] dark:hover:text-[#F5F3FF] hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#7C3AED] dark:text-[#C4B5FD]' : 'text-current'}`} />
            <span className="hidden sm:inline text-[12px]">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};
