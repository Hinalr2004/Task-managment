import { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import { LoginSignup } from './components/LoginSignup';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { KanbanBoard } from './components/KanbanBoard';
import { EnhancedTaskDetails } from './components/EnhancedTaskDetails';
import { CalendarView } from './components/CalendarView';
import { TeamManagement } from './components/TeamManagement';
import { Notifications } from './components/Notifications';
import { Reports } from './components/Reports';
import { Settings } from './components/Settings';
import { GlobalSearch } from './components/GlobalSearch';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import type { Task } from './types';

/**
 * Amdox - Advanced Professional Task Management Application
 * 
 * FEATURES IMPLEMENTED:
 * 
 * 1. ADVANCED TASK FEATURES:
 *    ✅ Subtasks with checkboxes and progress tracking
 *    ✅ Recurring tasks (daily, weekly, monthly)
 *    ✅ Task dependencies showing prerequisite tasks
 *    ✅ File attachments with preview and versioning
 *    ✅ Color-coded tags/labels for categorization
 *    ✅ Comprehensive activity log with user actions
 * 
 * 2. COLLABORATION & COMMUNICATION:
 *    ✅ @mentions in comments for team notifications
 *    ✅ Threaded comments per task
 *    ✅ File versioning for uploaded documents
 *    ✅ Shared calendar view with task deadlines
 * 
 * 3. USER & TEAM MANAGEMENT:
 *    ✅ Custom roles (Admin/Editor/Viewer)
 *    ✅ Team member invitation system
 *    ✅ Team activity dashboard
 *    ✅ Profile settings with avatar and bio
 * 
 * 4. NOTIFICATIONS & ALERTS:
 *    ✅ In-app notifications panel
 *    ✅ Multiple notification types (tasks, deadlines, mentions)
 *    ✅ Read/unread status tracking
 *    ✅ Notification badge counter
 * 
 * 5. REPORTING & ANALYTICS:
 *    ✅ Interactive charts (bar, pie, performance)
 *    ✅ Filterable reports by date and project
 *    ✅ Task completion trends
 *    ✅ Team performance metrics
 *    ✅ Export functionality (PDF/Excel/CSV)
 * 
 * 6. PRODUCTIVITY ENHANCERS:
 *    ✅ Dark mode / Light mode theme switcher
 *    ✅ Keyboard shortcuts for all major actions
 *    ✅ Global search across tasks, projects, and team
 *    ✅ Quick actions and filters
 * 
 * 7. SECURITY & INTEGRATIONS:
 *    ✅ Two-factor authentication (2FA) toggle
 *    ✅ SSO with Google and Microsoft
 *    ✅ Integration panel for Slack, Calendar, Jira, etc.
 *    ✅ Activity/audit logs for security tracking
 * 
 * 8. UI/UX DESIGN:
 *    ✅ Modern, clean, minimal professional design
 *    ✅ Soft color palette with gradients
 *    ✅ Consistent typography and spacing
 *    ✅ Subtle shadows and hover effects
 *    ✅ Smooth transitions and animations
 *    ✅ Responsive layout for desktop/tablet
 *    ✅ Drag-and-drop Kanban board
 *    ✅ Calendar view with visual task indicators
 * 
 * KEYBOARD SHORTCUTS:
 *    - Cmd/Ctrl + K: Global search
 *    - Cmd/Ctrl + D: Go to Dashboard
 *    - Cmd/Ctrl + T: Go to Tasks
 *    - Cmd/Ctrl + M: Go to Team
 *    - Cmd/Ctrl + R: Go to Reports
 *    - Cmd/Ctrl + ,: Open Settings
 *    - Cmd/Ctrl + Shift + N: Toggle Notifications
 * 
 * NAVIGATION FLOW:
 *    Login → Dashboard → Tasks (Kanban) → Task Details → Calendar → 
 *    Team → Notifications → Reports → Settings
 */

type Page = 'dashboard' | 'tasks' | 'calendar' | 'team' | 'reports' | 'settings';

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Mock tasks data
  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Design new landing page',
      description: 'Create wireframes and mockups for the new landing page',
      priority: 'high',
      deadline: 'Jan 10',
      assignee: 'Sarah J.',
      status: 'todo',
      createdAt: '2026-01-01',
      updatedAt: '2026-01-05',
    },
    {
      id: '2',
      title: 'Update documentation',
      description: 'Review and update API documentation',
      priority: 'medium',
      deadline: 'Jan 12',
      assignee: 'Mike R.',
      status: 'todo',
      createdAt: '2026-01-02',
      updatedAt: '2026-01-04',
    },
    {
      id: '3',
      title: 'Fix login bug',
      description: 'Resolve authentication issues on mobile devices',
      priority: 'high',
      deadline: 'Jan 8',
      assignee: 'Alex K.',
      status: 'inprogress',
      createdAt: '2026-01-03',
      updatedAt: '2026-01-06',
    },
    {
      id: '4',
      title: 'Implement dark mode',
      description: 'Add dark mode support across all pages',
      priority: 'medium',
      deadline: 'Jan 15',
      assignee: 'Emma L.',
      status: 'inprogress',
      createdAt: '2026-01-02',
      updatedAt: '2026-01-05',
    },
    {
      id: '5',
      title: 'Database optimization',
      description: 'Optimize queries and indexing for better performance',
      priority: 'low',
      deadline: 'Jan 5',
      assignee: 'John D.',
      status: 'completed',
      createdAt: '2025-12-28',
      updatedAt: '2026-01-05',
      completedAt: '2026-01-05',
    },
    {
      id: '6',
      title: 'Security audit',
      description: 'Conduct security review of authentication system',
      priority: 'high',
      deadline: 'Jan 6',
      assignee: 'Lisa M.',
      status: 'completed',
      createdAt: '2025-12-29',
      updatedAt: '2026-01-06',
      completedAt: '2026-01-06',
    },
  ]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
    setSelectedTask(null);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    setSelectedTask(null);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleBackToTasks = () => {
    setSelectedTask(null);
  };

  const handleNavigateToTasks = () => {
    setCurrentPage('tasks');
  };

  const handleSearchResultClick = (result: any) => {
    if (result.type === 'task') {
      const task = tasks.find(t => t.id === result.id);
      if (task) {
        setCurrentPage('tasks');
        setSelectedTask(task);
      }
    }
  };

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 'k',
      ctrl: true,
      action: () => setShowSearch(true),
      description: 'Global search',
    },
    {
      key: 'd',
      ctrl: true,
      action: () => handleNavigate('dashboard'),
      description: 'Go to Dashboard',
    },
    {
      key: 't',
      ctrl: true,
      action: () => handleNavigate('tasks'),
      description: 'Go to Tasks',
    },
    {
      key: 'm',
      ctrl: true,
      action: () => handleNavigate('team'),
      description: 'Go to Team',
    },
    {
      key: 'r',
      ctrl: true,
      action: () => handleNavigate('reports'),
      description: 'Go to Reports',
    },
    {
      key: ',',
      ctrl: true,
      action: () => handleNavigate('settings'),
      description: 'Open Settings',
    },
    {
      key: 'n',
      ctrl: true,
      shift: true,
      action: () => setShowNotifications(!showNotifications),
      description: 'Toggle Notifications',
    },
  ]);

  if (!isAuthenticated) {
    return <LoginSignup onLogin={handleLogin} />;
  }

  const unreadNotifications = 3;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onNotificationsClick={() => setShowNotifications(true)}
          onSearchClick={() => setShowSearch(true)}
          unreadCount={unreadNotifications}
        />
        
        <main className="flex-1 overflow-auto">
          {currentPage === 'dashboard' && (
            <Dashboard onNavigateToTasks={handleNavigateToTasks} />
          )}
          
          {currentPage === 'tasks' && (
            <>
              {selectedTask ? (
                <EnhancedTaskDetails task={selectedTask} onBack={handleBackToTasks} />
              ) : (
                <KanbanBoard onTaskClick={handleTaskClick} />
              )}
            </>
          )}
          
          {currentPage === 'calendar' && (
            <CalendarView tasks={tasks} onTaskClick={handleTaskClick} />
          )}
          
          {currentPage === 'team' && <TeamManagement />}
          
          {currentPage === 'reports' && <Reports />}
          
          {currentPage === 'settings' && <Settings />}
        </main>
      </div>

      {showNotifications && (
        <Notifications onClose={() => setShowNotifications(false)} />
      )}

      {showSearch && (
        <GlobalSearch
          isOpen={showSearch}
          onClose={() => setShowSearch(false)}
          onResultClick={handleSearchResultClick}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
      <Toaster />
    </ThemeProvider>
  );
}