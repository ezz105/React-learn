import { useState } from 'react';
import { motion } from 'framer-motion';
import { Project, Task, useProjectStore } from '../stores/projectStore';

export const ProjectCard = ({ project }: { project: Project }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const addTask = useProjectStore((state) => state.addTask);
  const updateTask = useProjectStore((state) => state.updateTask);
  const removeTask = useProjectStore((state) => state.removeTask);
  const updateProject = useProjectStore((state) => state.updateProject);
  const removeProject = useProjectStore((state) => state.removeProject);

  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskTitle,
      completed: false,
    };
    addTask(project.id, newTask);
    setTaskTitle('');
  };

  const handleUpdateTask = (taskId: string, newTitle: string) => {
    const updatedTask: Task = {
      id: taskId,
      title: newTitle,
      completed: false,
    };
    updateTask(project.id, updatedTask);
  };

  const handleRemoveTask = (taskId: string) => {
    removeTask(project.id, taskId);
  };

  const handleUpdateProject = (newName: string, newDescription: string) => {
    const updatedProject: Project = {
      ...project,
      name: newName,
      description: newDescription,
    };
    updateProject(updatedProject);
  };

  const handleRemoveProject = () => {
    removeProject(project.id);
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
      <p className="text-gray-700 mb-4">{project.description}</p>
      <ul className="mb-4">
        {project.tasks.map((task) => (
          <li key={task.id} className="flex items-center mb-2">
            <input type="checkbox" checked={task.completed} readOnly className="mr-2" />
            <input
              type="text"
              value={task.title}
              onChange={(e) => handleUpdateTask(task.id, e.target.value)}
              className="border p-2 flex-grow"
            />
            <button
              onClick={() => handleRemoveTask(task.id)}
              className="bg-red-500 text-white p-2 ml-2"
            >
              Remove Task
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="New Task"
        className="border p-2 w-full mb-2"
      />
      <button onClick={handleAddTask} className="bg-blue-500 text-white p-2 w-full mb-2">
        Add Task
      </button>
      <button
        onClick={() => handleUpdateProject('New Project Name', 'New Project Description')}
        className="bg-green-500 text-white p-2 w-full mb-2"
      >
        Update Project
      </button>
      <button onClick={handleRemoveProject} className="bg-red-500 text-white p-2 w-full">
        Remove Project
      </button>
    </motion.div>
  );
};



