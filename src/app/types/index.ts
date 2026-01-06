// Enhanced Task Types

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskTag {
  id: string;
  name: string;
  color: string;
}

export interface TaskAttachment {
  id: string;
  name: string;
  size: string;
  type: 'image' | 'pdf' | 'video' | 'document';
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  version: number;
  versions?: TaskAttachment[];
}

export interface TaskComment {
  id: string;
  author: string;
  avatar: string;
  comment: string;
  time: string;
  mentions?: string[];
}

export interface ActivityLogEntry {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  details?: string;
}

export interface RecurringSetting {
  enabled: boolean;
  frequency: 'daily' | 'weekly' | 'monthly';
  interval: number;
  endDate?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  deadline: string;
  assignee: string;
  assigneeAvatar?: string;
  status: 'todo' | 'inprogress' | 'completed';
  subtasks?: Subtask[];
  tags?: TaskTag[];
  attachments?: TaskAttachment[];
  comments?: TaskComment[];
  activityLog?: ActivityLogEntry[];
  dependencies?: string[]; // IDs of tasks that must be completed first
  recurring?: RecurringSetting;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer' | 'custom';
  customPermissions?: string[];
  avatar: string;
  bio?: string;
  tasksCompleted: number;
  activeTasks: number;
  joinedAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  tasks: number;
  color: string;
  owner: string;
  team: string[];
  startDate: string;
  endDate: string;
}

export interface Notification {
  id: string;
  type: 'task_assigned' | 'deadline' | 'comment' | 'mention' | 'team_update' | 'overdue';
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionUrl?: string;
  priority?: 'high' | 'medium' | 'low';
}
