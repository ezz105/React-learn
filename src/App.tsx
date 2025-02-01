import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { useTodoStore } from './store/useTodoStore';

const App = () => {
  const { addTodo } = useTodoStore();

  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className="mx-auto px-4 py-8 ">
        <div className="space-y-8">
          <header className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Todo App</h1>
            <p className="text-gray-600">Stay organized and productive</p>
          </header>

          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <TodoForm onAdd={addTodo} />
            <div>
            
            <TodoList />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;