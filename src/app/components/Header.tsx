import { useState } from 'react';
import { Search, Bell, User, Command } from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';

interface HeaderProps {
  onNotificationsClick: () => void;
  onSearchClick: () => void;
  unreadCount: number;
}

export function Header({ onNotificationsClick, onSearchClick, unreadCount }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 flex items-center justify-between shadow-sm">
      <div className="flex-1 max-w-xl">
        <button
          onClick={onSearchClick}
          className="w-full"
        >
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
            <div className="h-10 pl-10 pr-20 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center text-gray-500 dark:text-gray-400 text-sm group-hover:border-gray-300 dark:group-hover:border-gray-600 transition-colors cursor-pointer">
              Search tasks, projects, or team members...
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs">⌘</kbd>
              <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs">K</kbd>
            </div>
          </div>
        </button>
      </div>

      <div className="flex items-center gap-4 ml-6">
        <button
          onClick={onNotificationsClick}
          className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
              {unreadCount}
            </Badge>
          )}
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
          <Avatar className="h-9 w-9 bg-gradient-to-br from-indigo-500 to-purple-500 shadow-sm">
            <AvatarFallback className="text-white">
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Hinal Marathe</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}