'use client';

import React, { useState } from 'react';
import { Form, Button, Collapse } from 'react-bootstrap';
import { Task } from '../page';

interface TaskInputProps {
  addTask: (task: Omit<Task, 'id' | 'completed' | 'subtasks' | 'starred'>) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ addTask }) => {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [category, setCategory] = useState('Work');
  const [showOptions, setShowOptions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() !== '') {
      addTask({ text, description, dueDate, priority, category });
      setText('');
      setDescription('');
      setDueDate(null);
      setPriority('Medium');
      setCategory('Work');
      setShowOptions(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group>
        <Form.Control 
          type="text" 
          placeholder="Add a task..." 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
        />
      </Form.Group>
      <Button variant="link" onClick={() => setShowOptions(!showOptions)} className="mt-2">
        {showOptions ? 'Less options' : 'More options'}
      </Button>
      <Collapse in={showOptions}>
        <div>
          <Form.Group className="mt-2">
            <Form.Control 
              as="textarea" 
              rows={3} 
              placeholder="Description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Due Date</Form.Label>
            <Form.Control 
              type="date" 
              value={dueDate ? dueDate.toISOString().split('T')[0] : ''} 
              onChange={(e) => setDueDate(e.target.value ? new Date(e.target.value) : null)} 
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Priority</Form.Label>
            <Form.Select value={priority} onChange={(e) => setPriority(e.target.value as 'High' | 'Medium' | 'Low')}>
              <option value="High">🔴 High</option>
              <option value="Medium">🟡 Medium</option>
              <option value="Low">🟢 Low</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Category</Form.Label>
            <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Shopping">Shopping</option>
            </Form.Select>
          </Form.Group>
        </div>
      </Collapse>
      <Button type="submit" variant="primary" className="mt-3">Add Task</Button>
    </Form>
  );
};

export default TaskInput;