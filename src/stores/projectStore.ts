import { create } from 'zustand';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
  assignedTo: string;
}

export interface ProjectState {
  projects: Project[];
  addProject: (project: Project) => void;
  removeProject: (id: string) => void;
  updateProject: (project: Project) => void;
  addTask: (projectId: string, task: Task) => void;
  removeTask: (projectId: string, taskId: string) => void;
  updateTask: (projectId: string, task: Task) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  removeProject: (id) =>
    set((state) => ({ projects: state.projects.filter((project) => project.id !== id) })),
  updateProject: (updatedProject) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      ),
    })),
  addTask: (projectId, task) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId ? { ...project, tasks: [...project.tasks, task] } : project
      ),
    })),
  removeTask: (projectId, taskId) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId
          ? { ...project, tasks: project.tasks.filter((task) => task.id !== taskId) }
          : project
      ),
    })), 
  updateTask: (projectId, updatedTask) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
              ),
            }
          : project
      ),
    })),
}));
