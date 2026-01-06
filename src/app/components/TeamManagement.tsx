import { useState } from 'react';
import { Search, UserPlus, Mail, MoreVertical, Shield, Edit, Trash2 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar: string;
  tasksCompleted: number;
  activeTasks: number;
}

export function TeamManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Hinal Marathe',
      email: 'hinal@amdox.com',
      role: 'admin',
      avatar: 'HM',
      tasksCompleted: 45,
      activeTasks: 8,
    },
    {
      id: '2',
      name: 'Sima',
      email: 'sima@amdox.com',
      role: 'editor',
      avatar: 'SJ',
      tasksCompleted: 38,
      activeTasks: 6,
    },
    {
      id: '3',
      name: 'Mina',
      email: 'mina',
      role: 'editor',
      avatar: 'MR',
      tasksCompleted: 32,
      activeTasks: 5,
    },
    {
      id: '4',
      name: 'Emli',
      email: 'emli@amdox.com',
      role: 'editor',
      avatar: 'EL',
      tasksCompleted: 29,
      activeTasks: 7,
    },
    {
      id: '5',
      name: 'Ankita',
      email: 'ankita@amdox.com',
      role: 'viewer',
      avatar: 'AK',
      tasksCompleted: 12,
      activeTasks: 3,
    },
    {
      id: '6',
      name: 'Lina',
      email: 'lina.m@amdox.com',
      role: 'viewer',
      avatar: 'LM',
      tasksCompleted: 8,
      activeTasks: 2,
    },
  ]);

  const handleRoleChange = (memberId: string, newRole: 'admin' | 'editor' | 'viewer') => {
    setMembers(members.map(member => 
      member.id === memberId ? { ...member, role: newRole } : member
    ));
  };

  const roleColors = {
    admin: 'bg-purple-100 text-purple-700 border-purple-200',
    editor: 'bg-blue-100 text-blue-700 border-blue-200',
    viewer: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  const roleIcons = {
    admin: Shield,
    editor: Edit,
    viewer: null,
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Management</h1>
        <p className="text-gray-600">Manage team members and their roles</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-5 bg-white border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total Members</p>
          <p className="text-3xl font-bold text-gray-900">{members.length}</p>
        </Card>
        <Card className="p-5 bg-white border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Admins</p>
          <p className="text-3xl font-bold text-purple-600">
            {members.filter(m => m.role === 'admin').length}
          </p>
        </Card>
        <Card className="p-5 bg-white border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Editors</p>
          <p className="text-3xl font-bold text-blue-600">
            {members.filter(m => m.role === 'editor').length}
          </p>
        </Card>
        <Card className="p-5 bg-white border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Viewers</p>
          <p className="text-3xl font-bold text-gray-600">
            {members.filter(m => m.role === 'viewer').length}
          </p>
        </Card>
      </div>

      {/* Search and Add */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 bg-white border-gray-200"
          />
        </div>
        <Button className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
          <UserPlus className="h-4 w-4" />
          Add Member
        </Button>
      </div>

      {/* Team Members Table */}
      <Card className="bg-white border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left p-4 font-semibold text-gray-700">Member</th>
                <th className="text-left p-4 font-semibold text-gray-700">Email</th>
                <th className="text-left p-4 font-semibold text-gray-700">Role</th>
                <th className="text-left p-4 font-semibold text-gray-700">Tasks Completed</th>
                <th className="text-left p-4 font-semibold text-gray-700">Active Tasks</th>
                <th className="text-right p-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, index) => {
                const RoleIcon = roleIcons[member.role];
                return (
                  <tr
                    key={member.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      index === filteredMembers.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-500">
                          <AvatarFallback className="text-white">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{member.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{member.email}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Select
                        value={member.role}
                        onValueChange={(value) => handleRoleChange(member.id, value as TeamMember['role'])}
                      >
                        <SelectTrigger className="w-32 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">
                            <div className="flex items-center gap-2">
                              <Shield className="h-3 w-3" />
                              Admin
                            </div>
                          </SelectItem>
                          <SelectItem value="editor">
                            <div className="flex items-center gap-2">
                              <Edit className="h-3 w-3" />
                              Editor
                            </div>
                          </SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-green-600"
                            style={{ width: `${Math.min((member.tasksCompleted / 50) * 100, 100)}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{member.tasksCompleted}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                        {member.activeTasks}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4 text-gray-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Role Descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card className="p-5 bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold text-purple-900">Admin</h3>
          </div>
          <p className="text-sm text-purple-700">
            Full access to all features including team management, settings, and project configuration.
          </p>
        </Card>
        <Card className="p-5 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
          <div className="flex items-center gap-2 mb-3">
            <Edit className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Editor</h3>
          </div>
          <p className="text-sm text-blue-700">
            Can create, edit, and manage tasks and projects. Limited access to settings and team management.
          </p>
        </Card>
        <Card className="p-5 bg-gradient-to-br from-gray-50 to-gray-100/50 border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-5 w-5 bg-gray-400 rounded-full" />
            <h3 className="font-semibold text-gray-900">Viewer</h3>
          </div>
          <p className="text-sm text-gray-700">
            Read-only access to view tasks and projects. Cannot make changes or create new items.
          </p>
        </Card>
      </div>
    </div>
  );
}
