// src/components/ProjectItem.tsx
import React from 'react';

interface ProjectItemProps {
  id: number;
  name: string;
  description: string;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ id, name, description }) => {
  return (
    <div className="project-item">
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ProjectItem;
