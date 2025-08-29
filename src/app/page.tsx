'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import TaskInput from './components/TaskInput';
import ProductivityPage from './productivity/page';
import { Button } from 'react-bootstrap';
import { BsMoon, BsSun, BsList } from 'react-icons/bs';
import { useTasks } from './context/TaskContext';

export interface Subtask {
  id: string;
  text: string;
  completed: boolean;
}

export interface Task {
  id: string;
  text: string;
  description: string;
  dueDate: Date | null;
  priority: 'High' | 'Medium' | 'Low';
  category: string;
  completed: boolean;
  subtasks: Subtask[];
  starred: boolean;
}

export default function Home() {
  const { tasks, setTasks, addTask, deleteTask, toggleComplete, addSubtask, toggleSubtask, moveTaskCategory } = useTasks();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState<'inbox' | 'productivity'>('inbox');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`d-flex vh-100 ${isDarkMode ? 'dark' : ''}`}>
      <Sidebar 
        setView={setCurrentView} 
        isSidebarOpen={isSidebarOpen} 
        currentView={currentView} 
      />
      <div className="flex-grow-1 d-flex flex-column">
        <header className="d-flex justify-content-between align-items-center p-3 bg-light">
          <Button variant="light" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <BsList />
          </Button>
          <Button 
            variant={isDarkMode ? 'outline-light' : 'outline-dark'} 
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <BsSun /> : <BsMoon />}
          </Button>
        </header>
        <main className="p-4 flex-grow-1" style={{ overflowY: 'auto' }}>
          {currentView === 'inbox' ? (
            <>
              <h1>Inbox</h1>
              <TaskInput addTask={addTask} />
              <TaskList 
                tasks={tasks} 
                setTasks={setTasks} 
                deleteTask={deleteTask} 
                toggleComplete={toggleComplete} 
                addSubtask={addSubtask}
                toggleSubtask={toggleSubtask}
                moveTaskCategory={moveTaskCategory}
              />
            </>
          ) : (
            <ProductivityPage />
          )}
        </main>
      </div>
    </div>
  );
}