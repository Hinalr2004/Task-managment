import { Command } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import { KEYBOARD_SHORTCUTS } from '../hooks/useKeyboardShortcuts';

interface KeyboardShortcutsHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

export function KeyboardShortcutsHelp({ isOpen, onClose }: KeyboardShortcutsHelpProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Command className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Keyboard Shortcuts</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Work faster with keyboard shortcuts</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.values(KEYBOARD_SHORTCUTS).map((shortcut, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <p className="text-sm text-gray-700 dark:text-gray-300">{shortcut.description}</p>
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

          <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg">
            <p className="text-sm text-indigo-900 dark:text-indigo-200">
              <strong>Tip:</strong> Press <kbd className="px-1.5 py-0.5 mx-1 bg-white dark:bg-indigo-800 border border-indigo-300 dark:border-indigo-700 rounded text-xs">?</kbd> anytime to view this shortcuts panel
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
