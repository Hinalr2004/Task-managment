import { ArrowLeft, Calendar, Flag, User, Paperclip, MessageSquare, Edit, Trash2, CheckCircle2, Upload } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
import type { Task } from './KanbanBoard';

interface TaskDetailsProps {
  task: Task | null;
  onBack: () => void;
}

export function TaskDetails({ task, onBack }: TaskDetailsProps) {
  const [comment, setComment] = useState('');

  if (!task) {
    return (
      <div className="p-6 bg-gray-50 min-h-full flex items-center justify-center">
        <p className="text-gray-500">No task selected</p>
      </div>
    );
  }

  const priorityColors = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    low: 'bg-blue-100 text-blue-700 border-blue-200',
  };

  const comments = [
    {
      id: '1',
      author: 'Sima',
      avatar: 'SJ',
      comment: 'Great progress on this! Let me know if you need any design assets.',
      time: '2 hours ago',
    },
    {
      id: '2',
      author: 'Mina',
      avatar: 'MR',
      comment: 'I reviewed the requirements and they look good. We can proceed.',
      time: '5 hours ago',
    },
  ];

  const attachments = [
    { id: '1', name: 'design-mockup.fig', size: '2.4 MB', type: 'Figma' },
    { id: '2', name: 'requirements.pdf', size: '856 KB', type: 'PDF' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 -ml-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tasks
        </Button>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{task.title}</h1>
            <div className="flex items-center gap-3">
              <Badge className={`${priorityColors[task.priority]}`}>
                {task.priority.toUpperCase()} PRIORITY
              </Badge>
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                {task.status === 'todo' ? 'TO DO' : task.status === 'inprogress' ? 'IN PROGRESS' : 'COMPLETED'}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
              <CheckCircle2 className="h-4 w-4" />
              Mark Complete
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card className="p-6 bg-white border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{task.description}</p>
            <p className="text-gray-600 mt-4">
              This task requires careful attention to detail and collaboration with the design team.
              Please ensure all requirements are met before marking as complete.
            </p>
          </Card>

          {/* Attachments */}
          <Card className="p-6 bg-white border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Attachments</h2>
              <Button variant="outline" size="sm" className="gap-2">
                <Upload className="h-4 w-4" />
                Upload
              </Button>
            </div>
            <div className="space-y-3">
              {attachments.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Paperclip className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{file.name}</p>
                    <p className="text-xs text-gray-500">{file.size}</p>
                  </div>
                  <Button variant="ghost" size="sm">Download</Button>
                </div>
              ))}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 hover:bg-indigo-50/30 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  <span className="text-indigo-600 font-medium">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">PDF, PNG, JPG, or DOCX (max. 10MB)</p>
              </div>
            </div>
          </Card>

          {/* Comments */}
          <Card className="p-6 bg-white border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Comments ({comments.length})
            </h2>
            
            <div className="space-y-4 mb-4">
              {comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <Avatar className="h-9 w-9 bg-gradient-to-br from-indigo-500 to-purple-500">
                    <AvatarFallback className="text-white text-sm">{c.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-gray-900 text-sm">{c.author}</span>
                        <span className="text-xs text-gray-500">{c.time}</span>
                      </div>
                      <p className="text-sm text-gray-700">{c.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Avatar className="h-9 w-9 bg-gradient-to-br from-indigo-500 to-purple-500">
                <AvatarFallback className="text-white text-sm">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
                <div className="flex justify-end mt-2">
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                    Post Comment
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Task Info */}
          <Card className="p-6 bg-white border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Task Details</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <User className="h-4 w-4" />
                  <span>Assigned to</span>
                </div>
                <div className="flex items-center gap-2 ml-6">
                  <Avatar className="h-7 w-7 bg-gradient-to-br from-indigo-500 to-purple-500">
                    <AvatarFallback className="text-white text-xs">
                      {task.assignee.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-900">{task.assignee}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>Due Date</span>
                </div>
                <p className="ml-6 text-sm font-medium text-gray-900">{task.deadline}, 2026</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Flag className="h-4 w-4" />
                  <span>Priority</span>
                </div>
                <Badge className={`ml-6 ${priorityColors[task.priority]}`}>
                  {task.priority.toUpperCase()}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Activity */}
          <Card className="p-6 bg-white border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900">Task moved to In Progress</p>
                  <p className="text-xs text-gray-500">3 hours ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900">Sarah added 2 attachments</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900">Task created</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
