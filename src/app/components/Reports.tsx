import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Filter, Calendar, TrendingUp, CheckCircle2, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function Reports() {
  const taskCompletionData = [
    { month: 'Jan', completed: 32, pending: 12, total: 44 },
    { month: 'Feb', completed: 45, pending: 15, total: 60 },
    { month: 'Mar', completed: 38, pending: 10, total: 48 },
    { month: 'Apr', completed: 52, pending: 8, total: 60 },
    { month: 'May', completed: 48, pending: 14, total: 62 },
    { month: 'Jun', completed: 55, pending: 12, total: 67 },
  ];

  const projectDistribution = [
    { name: 'Website Redesign', value: 30, color: '#6366f1' },
    { name: 'Mobile App', value: 25, color: '#8b5cf6' },
    { name: 'Marketing', value: 20, color: '#10b981' },
    { name: 'Product Launch', value: 15, color: '#3b82f6' },
    { name: 'Others', value: 10, color: '#6b7280' },
  ];

  const teamPerformance = [
    { member: 'Sima', completed: 45, inProgress: 6 },
    { member: 'Mina', completed: 38, inProgress: 5 },
    { member: 'Emli', completed: 32, inProgress: 7 },
    { member: 'Rohit', completed: 29, inProgress: 4 },
    { member: 'Lina', completed: 24, inProgress: 3 },
  ];

  const stats = [
    {
      label: 'Total Tasks',
      value: '234',
      change: '+12%',
      icon: CheckCircle2,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: 'Completed',
      value: '186',
      change: '+8%',
      icon: CheckCircle2,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      label: 'In Progress',
      value: '32',
      change: '+5%',
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      label: 'Completion Rate',
      value: '79.5%',
      change: '+2.3%',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
        <p className="text-gray-600">Track team performance and project progress</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6">
        <Select defaultValue="30days">
          <SelectTrigger className="w-40 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="year">This year</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-48 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            <SelectItem value="website">Website Redesign</SelectItem>
            <SelectItem value="mobile">Mobile App</SelectItem>
            <SelectItem value="marketing">Marketing Campaign</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          More Filters
        </Button>
        <div className="flex-1" />
        <Button className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="p-5 bg-white border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                  </div>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-xl`}>
                  <Icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Task Completion Trend */}
        <Card className="p-6 bg-white border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Task Completion Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskCompletionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Legend />
              <Bar dataKey="completed" fill="#10b981" radius={[8, 8, 0, 0]} name="Completed" />
              <Bar dataKey="pending" fill="#f59e0b" radius={[8, 8, 0, 0]} name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Project Distribution */}
        <Card className="p-6 bg-white border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Task Distribution by Project</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={projectDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {projectDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Team Performance */}
      <Card className="p-6 bg-white border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Team Performance</h2>
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            This Month
          </Button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={teamPerformance} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" stroke="#6b7280" style={{ fontSize: '12px' }} />
            <YAxis dataKey="member" type="category" stroke="#6b7280" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Legend />
            <Bar dataKey="completed" fill="#6366f1" radius={[0, 8, 8, 0]} name="Completed Tasks" />
            <Bar dataKey="inProgress" fill="#8b5cf6" radius={[0, 8, 8, 0]} name="In Progress" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card className="p-5 bg-gradient-to-br from-indigo-50 to-indigo-100/50 border-indigo-200">
          <h3 className="font-semibold text-indigo-900 mb-2">Most Productive Day</h3>
          <p className="text-2xl font-bold text-indigo-700">Wednesday</p>
          <p className="text-sm text-indigo-600 mt-1">Average 8 tasks completed</p>
        </Card>
        <Card className="p-5 bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
          <h3 className="font-semibold text-green-900 mb-2">Average Completion Time</h3>
          <p className="text-2xl font-bold text-green-700">3.2 days</p>
          <p className="text-sm text-green-600 mt-1">15% faster than last month</p>
        </Card>
        <Card className="p-5 bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200">
          <h3 className="font-semibold text-purple-900 mb-2">Top Performer</h3>
          <p className="text-2xl font-bold text-purple-700">Sarah Johnson</p>
          <p className="text-sm text-purple-600 mt-1">45 tasks completed this month</p>
        </Card>
      </div>
    </div>
  );
}
