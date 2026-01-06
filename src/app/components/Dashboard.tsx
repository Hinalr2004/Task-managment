import { CheckCircle2, Clock, AlertCircle, ListTodo, TrendingUp, Calendar } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

interface DashboardProps {
  onNavigateToTasks: () => void;
}

export function Dashboard({ onNavigateToTasks }: DashboardProps) {
  const stats = [
    {
      label: 'Total Tasks',
      value: '48',
      icon: ListTodo,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      change: '+12%',
    },
    {
      label: 'Completed Tasks',
      value: '32',
      icon: CheckCircle2,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      change: '+8%',
    },
    {
      label: 'Pending Tasks',
      value: '12',
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      change: '-5%',
    },
    {
      label: 'Upcoming Deadlines',
      value: '4',
      icon: AlertCircle,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      change: '+2',
    },
  ];

  const projects = [
    { name: 'Website Redesign', progress: 75, tasks: 24, color: 'bg-indigo-600' },
    { name: 'Mobile App Development', progress: 45, tasks: 18, color: 'bg-purple-600' },
    { name: 'Marketing Campaign', progress: 90, tasks: 12, color: 'bg-green-600' },
    { name: 'Product Launch', progress: 30, tasks: 16, color: 'bg-blue-600' },
  ];

  const upcomingTasks = [
    { title: 'Design Review Meeting', date: 'Jan 7, 2026', priority: 'high' },
    { title: 'Submit Quarterly Report', date: 'Jan 8, 2026', priority: 'high' },
    { title: 'Client Presentation', date: 'Jan 9, 2026', priority: 'medium' },
    { title: 'Team Retrospective', date: 'Jan 10, 2026', priority: 'low' },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-950 min-h-full">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Welcome back, Hinal! 👋</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Here's what's happening with your projects today.</p>
        </div>
        <div className="text-right text-sm text-gray-500 dark:text-gray-400">
          <p>Today</p>
          <p className="font-medium text-gray-900 dark:text-gray-100">Tuesday, January 6, 2026</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="p-5 hover:shadow-lg transition-shadow duration-200 cursor-pointer border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-400" />
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">{stat.change}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">vs last week</span>
                  </div>
                </div>
                <div className={`${stat.bgColor} dark:${stat.bgColor.replace('50', '900/30')} p-3 rounded-xl shadow-sm`}>
                  <Icon className={`h-6 w-6 ${stat.textColor} dark:${stat.textColor.replace('600', '400')}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects List */}
        <Card className="lg:col-span-2 p-6 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Active Projects</h2>
            <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-5">
            {projects.map((project, index) => (
              <div key={index} className="group hover:bg-gray-50 dark:hover:bg-gray-800 p-4 rounded-lg transition-colors -m-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{project.name}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{project.tasks} tasks</span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={project.progress} className="flex-1 h-2" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12 text-right">
                    {project.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="p-6 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Upcoming</h2>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div
                key={index}
                className="group hover:bg-gray-50 dark:hover:bg-gray-800 p-3 rounded-lg transition-colors -mx-3 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-1 h-12 rounded-full ${
                      task.priority === 'high'
                        ? 'bg-red-500'
                        : task.priority === 'medium'
                        ? 'bg-yellow-500'
                        : 'bg-blue-500'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">{task.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{task.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={onNavigateToTasks}
            className="w-full mt-4 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg py-2 transition-colors"
          >
            View All Tasks
          </button>
        </Card>
      </div>
    </div>
  );
}