import { useTodoStore, FilterType } from '../store/useTodoStore';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const { todos, toggleTodo, deleteTodo } = useTodoStore();


  return (
    <div className="space-y-4">

      <div className="space-y-2 bg-amber-400 ">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};