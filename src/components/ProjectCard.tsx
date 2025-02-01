import { useState } from 'react';
import { motion } from 'framer-motion';
import { Project, Task, useProjectStore } from '../stores/projectStore';

export const ProjectCard = ({ project }: { project: Project }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const addTask = useProjectStore((state) => state.addTask);

  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskTitle,
      completed: false,
    };
    addTask(project.id, newTask);
    setTaskTitle('');
  };

  return (
    <motion.div
      className="bg-white p-4 rounded shadow"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <h2 className="text-xl font-bold">{project.name}</h2>
      <p>{project.description}</p>
      <ul>
        {project.tasks.map((task) => (
          <li key={task.id}>
            <input type="checkbox" checked={task.completed} readOnly />
            {task.title}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={handleAddTask}>Add Task</button>
    </motion.div>
  );
};



