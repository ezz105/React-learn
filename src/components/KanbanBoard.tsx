import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core';
import { useTodoStore, ColumnType } from '../store/useTodoStore';
import { KanbanColumn } from './KanbanColumn';
import { motion } from 'framer-motion';

export const KanbanBoard = () => {
  const { todos, columns, moveTodo } = useTodoStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      moveTodo(active.id as string, over.id as ColumnType['id']);
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            todos={todos.filter((todo) => todo.columnId === column.id)}
          />
        ))}
      </motion.div>
    </DndContext>
  );
};