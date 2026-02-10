import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TodoistTask {
  id: string;
  text: string;
  completed: boolean;
  dueDate?: Date;
  priority?: 'p1' | 'p2' | 'p3' | 'p4';
  source?: string; // Track where task came from (e.g., 'class-123')
}

interface TodoistState {
  tasks: TodoistTask[];
  addTask: (task: Omit<TodoistTask, 'id'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  clearCompleted: () => void;
}

export const useTodoistStore = create<TodoistState>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) => {
        const newTask: TodoistTask = {
          ...task,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        };
        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));
      },
      toggleTask: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        }));
      },
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },
      clearCompleted: () => {
        set((state) => ({
          tasks: state.tasks.filter((task) => !task.completed),
        }));
      },
    }),
    {
      name: 'todoist-tasks-storage',
      // Custom serialization to handle Date objects
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const parsed = JSON.parse(str);
          if (parsed?.state?.tasks) {
            parsed.state.tasks = parsed.state.tasks.map((task: any) => ({
              ...task,
              dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
            }));
          }
          return parsed;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);

