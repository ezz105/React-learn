import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FilterType = 'all' | 'active' | 'completed';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  columnId: 'todo' | 'inProgress' | 'done' | 'review';
}

export type ColumnType = {
  id: 'todo' | 'inProgress' | 'done' | 'review';
  title: string;
};

interface TodoState {
  todos: Todo[];
  columns: ColumnType[];
  filter: FilterType;
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  moveTodo: (todoId: string, newColumnId: ColumnType['id']) => void;
  setFilter: (filter: FilterType) => void;
}

export const COLUMNS: ColumnType[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'inProgress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
  { id: 'review', title: 'Review' }
];




export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      columns: COLUMNS,
      filter: 'all',

      addTodo: (text: string) => 
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: crypto.randomUUID(),
              text,
              completed: false,
              createdAt: new Date(),
              columnId: 'todo',
            },
          ],
        })),

      toggleTodo: (id: string) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),

      deleteTodo: (id: string) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),

      moveTodo: (todoId: string, newColumnId: ColumnType['id']) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === todoId ? { ...todo, columnId: newColumnId } : todo
          ),
        })),

      setFilter: (filter: FilterType) =>
        set((state) => ({
          filter,
        })),
    }),
    {
      name: 'todo-storage',
    }
  )
);