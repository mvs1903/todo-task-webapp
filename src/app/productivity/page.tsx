'use client';

import React from 'react';
import { useTasks } from '../context/TaskContext';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductivityPage = () => {
  const { tasks } = useTasks();

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const productivityPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const tasksPerCategory = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(tasksPerCategory),
    datasets: [
      {
        label: '# of Tasks',
        data: Object.values(tasksPerCategory),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="p-4">
      <h1>Productivity Analytics</h1>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Tasks</h5>
              <p className="card-text fs-1">{totalTasks}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Completed Tasks</h5>
              <p className="card-text fs-1">{completedTasks}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Productivity</h5>
              <p className="card-text fs-1">{productivityPercentage}%</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h3>Tasks per Category</h3>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default ProductivityPage;
