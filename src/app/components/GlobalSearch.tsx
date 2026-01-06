import { useState } from 'react';
import { Search, Command, X, FileText, Users, CheckSquare, Hash } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface SearchResult {
  id: string;
  type: 'task' | 'project' | 'team' | 'tag';
  title: string;
  subtitle?: string;
  icon: any;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onResultClick: (result: SearchResult) => void;
}

export function GlobalSearch({ isOpen, onClose, onResultClick }: GlobalSearchProps) {
  const [query, setQuery] = useState('');

  // Mock search results
  const allResults: SearchResult[] = [
    { id: '1', type: 'task', title: 'Design new landing page', subtitle: 'High priority • Due Jan 10', icon: CheckSquare },
    { id: '2', type: 'task', title: 'Update documentation', subtitle: 'Medium priority • Due Jan 12', icon: CheckSquare },
    { id: '3', type: 'task', title: 'Fix login bug', subtitle: 'High priority • In Progress', icon: CheckSquare },
    { id: '4', type: 'project', title: 'Website Redesign', subtitle: '24 tasks • 75% complete', icon: FileText },
    { id: '5', type: 'project', title: 'Mobile App Development', subtitle: '18 tasks • 45% complete', icon: FileText },
    { id: '6', type: 'team', title: 'Sarah Johnson', subtitle: 'sarah.j@amdox.com • Editor', icon: Users },
    { id: '7', type: 'team', title: 'Mike Roberts', subtitle: 'mike.r@amdox.com • Editor', icon: Users },
    { id: '8', type: 'tag', title: 'Frontend', subtitle: '12 tasks', icon: Hash },
    { id: '9', type: 'tag', title: 'Backend', subtitle: '8 tasks', icon: Hash },
  ];

  const filteredResults = query.length > 0
    ? allResults.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.subtitle?.toLowerCase().includes(query.toLowerCase())
      )
    : allResults.slice(0, 6);

  const typeColors = {
    task: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    project: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    team: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    tag: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 gap-0 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
          <Search className="h-5 w-5 text-gray-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tasks, projects, team members, or tags..."
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent dark:text-gray-100"
            autoFocus
          />
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">⌘</kbd>
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">K</kbd>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {filteredResults.length === 0 ? (
            <div className="p-12 text-center">
              <Search className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No results found</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Try searching for something else</p>
            </div>
          ) : (
            <div className="p-2">
              {filteredResults.map((result) => {
                const Icon = result.icon;
                return (
                  <button
                    key={result.id}
                    onClick={() => {
                      onResultClick(result);
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                  >
                    <div className={`w-10 h-10 rounded-lg ${typeColors[result.type]} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-gray-100">{result.title}</p>
                      {result.subtitle && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{result.subtitle}</p>
                      )}
                    </div>
                    <Badge className={`${typeColors[result.type]} text-xs`}>
                      {result.type}
                    </Badge>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">↓</kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">↵</kbd>
                <span>Select</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">Esc</kbd>
                <span>Close</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
