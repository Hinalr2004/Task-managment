import { useEffect } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: () => void;
  description: string;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const ctrlMatch = shortcut.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
        const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
        const altMatch = shortcut.alt ? event.altKey : !event.altKey;

        if (
          event.key.toLowerCase() === shortcut.key.toLowerCase() &&
          ctrlMatch &&
          shiftMatch &&
          altMatch
        ) {
          event.preventDefault();
          shortcut.action();
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}

export const KEYBOARD_SHORTCUTS = {
  NEW_TASK: { key: 'n', ctrl: true, description: 'Create new task' },
  SEARCH: { key: 'k', ctrl: true, description: 'Global search' },
  DASHBOARD: { key: 'd', ctrl: true, description: 'Go to Dashboard' },
  TASKS: { key: 't', ctrl: true, description: 'Go to Tasks' },
  TEAM: { key: 'm', ctrl: true, description: 'Go to Team' },
  REPORTS: { key: 'r', ctrl: true, description: 'Go to Reports' },
  NOTIFICATIONS: { key: 'n', ctrl: true, shift: true, description: 'Toggle Notifications' },
  SETTINGS: { key: ',', ctrl: true, description: 'Open Settings' },
  DARK_MODE: { key: 'd', ctrl: true, shift: true, description: 'Toggle Dark Mode' },
};
