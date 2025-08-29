'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Task, Subtask } from '../page';

interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  addTask: (task: Omit<Task, 'id' | 'completed' | 'subtasks' | 'starred'>) => void;
  deleteTask: (taskId: string) => void;
  toggleComplete: (taskId: string) => void;
  addSubtask: (taskId: string, subtaskText: string) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  moveTaskCategory: (taskId: string, newCategory: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Omit<Task, 'id' | 'completed' | 'subtasks' | 'starred'>) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      completed: false,
      subtasks: [],
      starred: false,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleComplete = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const addSubtask = (taskId: string, subtaskText: string) => {
    const newSubtask: Subtask = {
      id: `subtask-${Date.now()}`,
      text: subtaskText,
      completed: false,
    };
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, subtasks: [...task.subtasks, newSubtask] } : task
    ));
  };

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { 
        ...task, 
        subtasks: task.subtasks.map(subtask => 
          subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
        )
      } : task
    ));
  };

  const moveTaskCategory = (taskId: string, newCategory: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, category: newCategory } : task
    ));
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask, deleteTask, toggleComplete, addSubtask, toggleSubtask, moveTaskCategory }}>
      {children}
    </TaskContext.Provider>
  );
};