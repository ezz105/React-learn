import React, { useState } from 'react';
import { useProjectStore } from '../stores/projectStore';
import { ProjectCard } from '../components/ProjectCard';

const Dashboard = () => {
  const { projects, addProject } = useProjectStore();
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleAddProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: projectName,
      description: projectDescription,
      tasks: [],
    };
    addProject(newProject);
    setProjectName('');
    setProjectDescription('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">لوحة التحكم</h1>
      <div className="mb-4">
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project Name"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          placeholder="Project Description"
          className="border p-2 mr-2"
        />
        <button onClick={handleAddProject} className="bg-blue-500 text-white p-2">
          Add Project
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
