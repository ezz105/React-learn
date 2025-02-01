import { useDroppable } from '@dnd-kit/core';
import { Todo, ColumnType } from '../store/useTodoStore';
import { DraggableTodoItem } from './DraggableTodoItem';
import { motion } from 'framer-motion';

interface KanbanColumnProps {
  column: ColumnType;
  todos: Todo[];
}

export const KanbanColumn = ({ column, todos }: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-50 p-4 rounded-lg shadow-sm"
    >
      <h2 className="font-bold text-lg mb-4 text-gray-700">{column.title}</h2>
      <div
        ref={setNodeRef}
        className="space-y-2 min-h-[200px]"
      >
        {todos.map((todo) => (
          <DraggableTodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </motion.div>
  );
};