import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Filter, Plus } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Task } from '../types';

interface CalendarViewProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export function CalendarView({ tasks, onTaskClick }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // January 2026
  const [view, setView] = useState<'month' | 'week'>('month');

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getTasksForDate = (day: number) => {
    const dateStr = `Jan ${day}`;
    return tasks.filter(task => task.deadline.includes(dateStr));
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="min-h-24 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"></div>
      );
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayTasks = getTasksForDate(day);
      const isToday = day === 6; // Mock today as Jan 6
      
      days.push(
        <div
          key={day}
          className={`min-h-24 border border-gray-200 dark:border-gray-700 p-2 ${
            isToday ? 'bg-indigo-50 dark:bg-indigo-900/20' : 'bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800'
          } transition-colors`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium ${
              isToday ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-gray-100'
            }`}>
              {day}
            </span>
            {isToday && (
              <Badge className="h-5 text-xs bg-indigo-600 dark:bg-indigo-500">Today</Badge>
            )}
          </div>
          <div className="space-y-1">
            {dayTasks.slice(0, 3).map(task => (
              <button
                key={task.id}
                onClick={() => onTaskClick(task)}
                className={`w-full text-left text-xs p-1.5 rounded truncate ${
                  task.priority === 'high'
                    ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                    : task.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                } hover:opacity-80 transition-opacity`}
              >
                {task.title}
              </button>
            ))}
            {dayTasks.length > 3 && (
              <p className="text-xs text-gray-500 dark:text-gray-400 pl-1.5">+{dayTasks.length - 3} more</p>
            )}
          </div>
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Calendar View</h1>
        <p className="text-gray-600 dark:text-gray-400">View all tasks and deadlines in a calendar format</p>
      </div>

      {/* Controls */}
      <Card className="p-4 mb-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={previousMonth}
              className="dark:border-gray-700 dark:text-gray-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 min-w-[200px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={nextMonth}
              className="dark:border-gray-700 dark:text-gray-300"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="dark:border-gray-700 dark:text-gray-300"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <Button
                variant={view === 'month' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('month')}
                className={view === 'month' ? 'bg-white dark:bg-gray-700' : ''}
              >
                Month
              </Button>
              <Button
                variant={view === 'week' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('week')}
                className={view === 'week' ? 'bg-white dark:bg-gray-700' : ''}
              >
                Week
              </Button>
            </div>
            <Button className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              <Plus className="h-4 w-4" />
              Add Event
            </Button>
          </div>
        </div>
      </Card>

      {/* Calendar Grid */}
      <Card className="p-4 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-0 mb-0">
          {dayNames.map(day => (
            <div
              key={day}
              className="text-center font-semibold text-sm text-gray-600 dark:text-gray-400 py-3 border-b border-gray-200 dark:border-gray-700"
            >
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-0">
          {renderCalendarDays()}
        </div>
      </Card>

      {/* Legend */}
      <div className="mt-6 flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">High Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Medium Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Low Priority</span>
        </div>
      </div>
    </div>
  );
}
