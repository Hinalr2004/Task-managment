import { useState } from 'react';
import {
  User, Lock, Bell, Palette, Keyboard, Shield, Link2, CreditCard,
  Mail, Globe, Moon, Sun, Check, Upload, Key, Smartphone, History
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { useTheme } from '../contexts/ThemeContext';
import { KEYBOARD_SHORTCUTS } from '../hooks/useKeyboardShortcuts';

export function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('profile');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Link2 },
    { id: 'shortcuts', label: 'Keyboard Shortcuts', icon: Keyboard },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  const integrations = [
    { id: '1', name: 'Slack', connected: true, icon: '💬' },
    { id: '2', name: 'Google Calendar', connected: true, icon: '📅' },
    { id: '3', name: 'Microsoft Teams', connected: false, icon: '👥' },
    { id: '4', name: 'Jira', connected: false, icon: '🎯' },
    { id: '5', name: 'Trello', connected: false, icon: '📋' },
    { id: '6', name: 'GitHub', connected: true, icon: '🐙' },
  ];

  const auditLogs = [
    { id: '1', action: 'Login from new device', location: 'Pune , IN', time: '2 hours ago' },
    { id: '2', action: 'Password changed', location: 'Pune, IN', time: '3 days ago' },
    { id: '3', action: 'Two-factor authentication enabled', location: 'Pune, IN', time: '1 week ago' },
    { id: '4', action: 'Profile updated', location: 'Pune, IN', time: '2 weeks ago' },
  ];

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <Card className="lg:col-span-1 p-4 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 h-fit">
          <nav className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{section.label}</span>
                </button>
              );
            })}
          </nav>
        </Card>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Settings */}
          {activeSection === 'profile' && (
            <>
              <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Profile Information</h2>
                
                <div className="flex items-center gap-6 mb-6">
                  <Avatar className="h-20 w-20 bg-gradient-to-br from-indigo-500 to-purple-500">
                    <AvatarFallback className="text-white text-2xl">HM</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" className="gap-2 dark:border-gray-700">
                      <Upload className="h-4 w-4" />
                      Change Avatar
                    </Button>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">JPG, PNG or GIF (max. 2MB)</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="dark:text-gray-300">First Name</Label>
                      <Input id="firstName" defaultValue="Hinal" className="dark:bg-gray-800 dark:border-gray-700" />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="dark:text-gray-300">Last Name</Label>
                      <Input id="lastName" defaultValue="Marathe" className="dark:bg-gray-800 dark:border-gray-700" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="dark:text-gray-300">Email Address</Label>
                    <Input id="email" type="email" defaultValue="hinal@amdox.com" className="dark:bg-gray-800 dark:border-gray-700" />
                  </div>

                  <div>
                    <Label htmlFor="bio" className="dark:text-gray-300">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself..."
                      defaultValue="Product Manager passionate about building great user experiences."
                      className="min-h-[100px] dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>

                  <div>
                    <Label htmlFor="timezone" className="dark:text-gray-300">Timezone</Label>
                    <Input id="timezone" defaultValue="Pacific Time (PT)" className="dark:bg-gray-800 dark:border-gray-700" />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" className="dark:border-gray-700">Cancel</Button>
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                    Save Changes
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">Email Notifications</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive email updates about your activity</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator className="dark:bg-gray-700" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">Weekly Summary</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Get a weekly email summary of your tasks</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </Card>
            </>
          )}

          {/* Security Settings */}
          {activeSection === 'security' && (
            <>
              <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Password</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword" className="dark:text-gray-300">Current Password</Label>
                    <Input id="currentPassword" type="password" className="dark:bg-gray-800 dark:border-gray-700" />
                  </div>
                  <div>
                    <Label htmlFor="newPassword" className="dark:text-gray-300">New Password</Label>
                    <Input id="newPassword" type="password" className="dark:bg-gray-800 dark:border-gray-700" />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword" className="dark:text-gray-300">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" className="dark:bg-gray-800 dark:border-gray-700" />
                  </div>
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                    Update Password
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Two-Factor Authentication</h2>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Smartphone className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      <p className="font-medium text-gray-900 dark:text-gray-100">Authenticator App</p>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Use an authentication app to generate one-time security codes
                    </p>
                  </div>
                  <Switch
                    checked={twoFactorEnabled}
                    onCheckedChange={setTwoFactorEnabled}
                  />
                </div>
                {twoFactorEnabled && (
                  <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800 dark:text-green-300">
                      <Check className="h-5 w-5" />
                      <p className="font-medium">Two-factor authentication is enabled</p>
                    </div>
                  </div>
                )}
              </Card>

              <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Activity Log</h2>
                  <Button variant="outline" size="sm" className="gap-2 dark:border-gray-700">
                    <History className="h-4 w-4" />
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {auditLogs.map(log => (
                    <div key={log.id} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="w-2 h-2 bg-indigo-500 dark:bg-indigo-400 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{log.action}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{log.location} • {log.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Single Sign-On (SSO)</h2>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-3 h-12 dark:border-gray-700">
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                      <span className="text-lg">G</span>
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100">Google Workspace</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Connected</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">Active</Badge>
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3 h-12 dark:border-gray-700">
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                      <span className="text-lg">M</span>
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100">Microsoft Azure AD</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Not connected</p>
                    </div>
                    <span className="text-sm text-indigo-600 dark:text-indigo-400">Connect</span>
                  </Button>
                </div>
              </Card>
            </>
          )}

          {/* Notifications Settings */}
          {activeSection === 'notifications' && (
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Notification Preferences</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Email Notifications</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Task assignments', desc: 'When someone assigns you a task' },
                      { label: 'Comments and mentions', desc: 'When someone comments or mentions you' },
                      { label: 'Deadline reminders', desc: 'Reminders about upcoming deadlines' },
                      { label: 'Daily summary', desc: 'Daily digest of your tasks and activity' },
                      { label: 'Weekly summary', desc: 'Weekly performance and progress report' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{item.label}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                        </div>
                        <Switch defaultChecked={index < 3} />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="dark:bg-gray-700" />

                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Push Notifications</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Urgent tasks', desc: 'High priority tasks and overdue alerts' },
                      { label: 'Team updates', desc: 'When team members complete tasks' },
                      { label: 'Messages', desc: 'Direct messages and comments' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{item.label}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Appearance Settings */}
          {activeSection === 'appearance' && (
            <>
              <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Theme</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => theme === 'dark' && toggleTheme()}
                    className={`p-6 border-2 rounded-lg transition-all ${
                      theme === 'light'
                        ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-16 h-16 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center shadow-sm">
                        <Sun className="h-8 w-8 text-yellow-500" />
                      </div>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Light Mode</p>
                    {theme === 'light' && (
                      <div className="mt-2 flex items-center justify-center gap-1 text-indigo-600 dark:text-indigo-400 text-sm">
                        <Check className="h-4 w-4" />
                        Active
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => theme === 'light' && toggleTheme()}
                    className={`p-6 border-2 rounded-lg transition-all ${
                      theme === 'dark'
                        ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-16 h-16 bg-gray-900 border-2 border-gray-700 rounded-lg flex items-center justify-center shadow-sm">
                        <Moon className="h-8 w-8 text-indigo-400" />
                      </div>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Dark Mode</p>
                    {theme === 'dark' && (
                      <div className="mt-2 flex items-center justify-center gap-1 text-indigo-600 dark:text-indigo-400 text-sm">
                        <Check className="h-4 w-4" />
                        Active
                      </div>
                    )}
                  </button>
                </div>
              </Card>

              <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Display Options</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">Compact mode</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Reduce spacing for a denser layout</p>
                    </div>
                    <Switch />
                  </div>
                  <Separator className="dark:bg-gray-700" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">Show completed tasks</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Display completed tasks in task list</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </Card>
            </>
          )}

          {/* Integrations */}
          {activeSection === 'integrations' && (
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Connected Apps</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map(integration => (
                  <div
                    key={integration.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{integration.icon}</div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{integration.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {integration.connected ? 'Connected' : 'Not connected'}
                        </p>
                      </div>
                    </div>
                    {integration.connected ? (
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                        Connected
                      </Badge>
                    ) : (
                      <Button size="sm" variant="outline" className="dark:border-gray-700">
                        Connect
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Keyboard Shortcuts */}
          {activeSection === 'shortcuts' && (
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Keyboard Shortcuts</h2>
              <div className="space-y-3">
                {Object.values(KEYBOARD_SHORTCUTS).map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <p className="text-sm text-gray-900 dark:text-gray-100">{shortcut.description}</p>
                    <div className="flex items-center gap-1">
                      {shortcut.ctrl && (
                        <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs font-medium">
                          ⌘
                        </kbd>
                      )}
                      {shortcut.shift && (
                        <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs font-medium">
                          ⇧
                        </kbd>
                      )}
                      <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs font-medium uppercase">
                        {shortcut.key}
                      </kbd>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Billing */}
          {activeSection === 'billing' && (
            <>
              <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">Pro Plan</h2>
                    <p className="text-indigo-700 dark:text-indigo-300 mt-1">$29/month • Renews on Feb 6, 2026</p>
                  </div>
                  <Button variant="outline" className="border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300">
                    Manage Plan
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Payment Method</h2>
                <div className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                    VISA
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-gray-100">•••• •••• •••• 4242</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Expires 12/2026</p>
                  </div>
                  <Button variant="outline" size="sm" className="dark:border-gray-700">
                    Update
                  </Button>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
