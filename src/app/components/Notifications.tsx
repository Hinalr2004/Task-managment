import { X, CheckCircle2, MessageSquare, AlertCircle, Calendar, UserPlus } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState } from 'react';

interface Notification {
  id: string;
  type: 'task_assigned' | 'deadline' | 'comment' | 'team_update';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationsProps {
  onClose: () => void;
}

export function Notifications({ onClose }: NotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'task_assigned',
      title: 'New Task Assigned',
      message: 'Sima assigned you to "Design new landing page"',
      time: '5 minutes ago',
      read: false,
    },
    {
      id: '2',
      type: 'deadline',
      title: 'Deadline Approaching',
      message: '"Fix login bug" is due in 2 days',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      type: 'comment',
      title: 'New Comment',
      message: 'Rohit commented on "Update documentation"',
      time: '2 hours ago',
      read: false,
    },
    {
      id: '4',
      type: 'team_update',
      title: 'Team Update',
      message: 'Emli joined your team',
      time: '3 hours ago',
      read: true,
    },
    {
      id: '5',
      type: 'task_assigned',
      title: 'Task Completed',
      message: 'Rohit "Database optimization" as complete',
      time: '5 hours ago',
      read: true,
    },
    {
      id: '6',
      type: 'deadline',
      title: 'Deadline Reminder',
      message: '"Security audit" is due tomorrow',
      time: '1 day ago',
      read: true,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'task_assigned':
        return { Icon: CheckCircle2, color: 'bg-green-100 text-green-600' };
      case 'deadline':
        return { Icon: AlertCircle, color: 'bg-red-100 text-red-600' };
      case 'comment':
        return { Icon: MessageSquare, color: 'bg-blue-100 text-blue-600' };
      case 'team_update':
        return { Icon: UserPlus, color: 'bg-purple-100 text-purple-600' };
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-start justify-end p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl mt-16 mr-4 max-h-[calc(100vh-8rem)] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="w-full text-indigo-600 border-indigo-200 hover:bg-indigo-50"
            >
              Mark all as read
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-600">No notifications</p>
              <p className="text-sm text-gray-500 mt-1">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => {
                const { Icon, color } = getNotificationIcon(notification.type);
                return (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      !notification.read ? 'bg-indigo-50/30' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-indigo-600 rounded-full flex-shrink-0 mt-2" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <Button variant="ghost" className="w-full text-indigo-600 hover:bg-indigo-50">
            View All Notifications
          </Button>
        </div>
      </Card>
    </div>
  );
}
