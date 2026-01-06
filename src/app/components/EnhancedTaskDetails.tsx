import { useState } from 'react';
import {
  ArrowLeft, Calendar, Flag, User, Paperclip, MessageSquare, Edit, Trash2,
  CheckCircle2, Upload, Clock, Tag, Link2, MoreVertical, ChevronDown, ChevronRight,
  Image, FileText, Video, Download, Eye, AtSign, Activity, RefreshCw
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import type { Task, Subtask, TaskTag, TaskAttachment, TaskComment, ActivityLogEntry } from '../types';

interface EnhancedTaskDetailsProps {
  task: Task | null;
  onBack: () => void;
}

export function EnhancedTaskDetails({ task, onBack }: EnhancedTaskDetailsProps) {
  const [comment, setComment] = useState('');
  const [subtasks, setSubtasks] = useState<Subtask[]>(task?.subtasks || [
    { id: '1', title: 'Design trends research', completed: true },
    { id: '2', title: 'Wireframe banana', completed: true },
    { id: '3', title: 'UI mockups design', completed: false },
    { id: '4', title: 'Stakeholder approval lena', completed: false },
  ]);
  const [showSubtasks, setShowSubtasks] = useState(true);
  const [activeTab, setActiveTab] = useState<'comments' | 'activity' | 'attachments'>('comments');

  if (!task) {
    return (
      <div className="p-6 min-h-full flex items-center justify-center">
        <p>No task selected</p>
      </div>
    );
  }

  const priorityColors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-blue-100 text-blue-700',
  };

  /* ===== TAGS ===== */
  const tags: TaskTag[] = [
    { id: '1', name: 'Frontend', color: 'bg-blue-500' },
    { id: '2', name: 'Design', color: 'bg-purple-500' },
    { id: '3', name: 'UI/UX', color: 'bg-pink-500' },
  ];

  /* ===== ATTACHMENTS ===== */
  const attachments: TaskAttachment[] = [
    {
      id: '1',
      name: 'landing-page-design.fig',
      size: '2.4 MB',
      type: 'image',
      url: '#',
      uploadedBy: 'Snehal Patil',
      uploadedAt: '2 hours ago',
      version: 3,
    },
    {
      id: '2',
      name: 'requirements-document.pdf',
      size: '856 KB',
      type: 'pdf',
      url: '#',
      uploadedBy: 'Nitu Sharma',
      uploadedAt: '5 hours ago',
      version: 2,
    },
    {
      id: '3',
      name: 'demo-video.mp4',
      size: '12.3 MB',
      type: 'video',
      url: '#',
      uploadedBy: 'Rita Pathak',
      uploadedAt: '1 day ago',
      version: 1,
    },
  ];

  /* ===== COMMENTS ===== */
  const comments: TaskComment[] = [
    {
      id: '1',
      author: 'Rohit Patil',
      avatar: 'RP',
      comment: 'Hey @Rita, latest mockups review kar sakti ho?',
      time: '2 hours ago',
    },
    {
      id: '2',
      author: 'Meena Singh',
      avatar: 'MS',
      comment: '@Snehal Design ka color scheme kaafi acha hai!',
      time: '1 hour ago',
    },
    {
      id: '3',
      author: 'Emli Patil',
      avatar: 'EP',
      comment: 'Demo video upload kar diya hai, please check.',
      time: '30 minutes ago',
    },
  ];

  /* ===== ACTIVITY LOG ===== */
  const activityLog: ActivityLogEntry[] = [
    { id: '1', user: 'Rohit', action: 'moved task to', details: 'In Progress', timestamp: '2 hours ago' },
    { id: '2', user: 'Meena', action: 'added attachment', details: 'requirements-document.pdf', timestamp: '5 hours ago' },
    { id: '3', user: 'Emli', action: 'completed subtask', details: 'Wireframe banana', timestamp: '8 hours ago' },
    { id: '4', user: 'Snehal', action: 'changed priority to', details: 'High', timestamp: '1 day ago' },
    { id: '5', user: 'Nitu', action: 'assigned task to', details: 'Snehal', timestamp: '2 days ago' },
  ];

  const toggleSubtask = (id: string) => {
    setSubtasks(subtasks.map(st =>
      st.id === id ? { ...st, completed: !st.completed } : st
    ));
  };

  const completedSubtasks = subtasks.filter(st => st.completed).length;
  const progress = (completedSubtasks / subtasks.length) * 100;

  const getFileIcon = (type: string) => {
    if (type === 'image') return Image;
    if (type === 'video') return Video;
    return FileText;
  };

  return (
    <div className="p-6 min-h-full">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Tasks
      </Button>

      <h1 className="text-3xl font-bold mb-3">{task.title}</h1>

      <Badge className={priorityColors[task.priority]}>
        {task.priority.toUpperCase()}
      </Badge>

      {/* Subtasks */}
      <Card className="p-6 mt-6">
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold">Subtasks</h2>
          <span>{completedSubtasks}/{subtasks.length}</span>
        </div>
        <Progress value={progress} />

        <div className="mt-4 space-y-2">
          {subtasks.map(st => (
            <div key={st.id} className="flex gap-2 items-center">
              <Checkbox checked={st.completed} onCheckedChange={() => toggleSubtask(st.id)} />
              <span className={st.completed ? 'line-through' : ''}>{st.title}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Comments */}
      <Card className="p-6 mt-6">
        <h2 className="font-semibold mb-4">Comments</h2>
        {comments.map(c => (
          <div key={c.id} className="flex gap-3 mb-3">
            <Avatar>
              <AvatarFallback>{c.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{c.author}</p>
              <p className="text-sm">{c.comment}</p>
            </div>
          </div>
        ))}
        <Textarea
          placeholder="Comment likho..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Card>
    </div>
  );
}
