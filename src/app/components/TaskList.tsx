'use client';

import React, { useState } from 'react';
import { Button, Form, Collapse, ListGroup, InputGroup, Dropdown } from 'react-bootstrap';
import { Task, Subtask } from '../page';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { BsTrash, BsStar, BsStarFill, BsPlus, BsChevronDown, BsChevronUp, BsCheck } from 'react-icons/bs';
import { useTasks } from '../context/TaskContext';

interface TaskListProps {
  tasks: Task[];
  deleteTask: (taskId: string) => void;
  toggleComplete: (taskId: string) => void;
  addSubtask: (taskId: string, subtaskText: string) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  moveTaskCategory: (taskId: string, newCategory: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask, toggleComplete, addSubtask, toggleSubtask, moveTaskCategory }) => {
  const { setTasks } = useTasks();
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [newSubtaskText, setNewSubtaskText] = useState('');

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;

    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, removed);

    setTasks(reorderedTasks);
  };

  const toggleStar = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, starred: !task.starred } : task
    ));
  };

  const handleAddSubtask = (taskId: string) => {
    if (newSubtaskText.trim() !== '') {
      addSubtask(taskId, newSubtaskText);
      setNewSubtaskText('');
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <div className={`task-card d-flex justify-content-between align-items-center position-relative ${task.completed ? 'opacity-50' : ''}`}>
                      <div className={`position-absolute h-100 priority-${task.priority.toLowerCase()}`}></div>
                      <div className="d-flex align-items-center ms-4">
                        <div>
                          <span className={`${task.completed ? 'text-decoration-line-through' : ''}`}>{task.text}</span>
                          <div className="text-muted small">{task.dueDate ? `Due: ${task.dueDate.toLocaleDateString()}` : ''}</div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <Dropdown>
                          <Dropdown.Toggle variant="outline-secondary" size="sm">
                            {task.category}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => moveTaskCategory(task.id, 'Inbox')}>Inbox</Dropdown.Item>
                            <Dropdown.Item onClick={() => moveTaskCategory(task.id, 'Work')}>Work</Dropdown.Item>
                            <Dropdown.Item onClick={() => moveTaskCategory(task.id, 'Personal')}>Personal</Dropdown.Item>
                            <Dropdown.Item onClick={() => moveTaskCategory(task.id, 'Shopping')}>Shopping</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <Button variant="link" onClick={() => setExpandedTaskId(expandedTaskId === task.id ? null : task.id)}>
                          {expandedTaskId === task.id ? <BsChevronUp /> : <BsChevronDown />}
                        </Button>
                        <Button variant="link" onClick={() => toggleStar(task.id)} className="text-warning">
                          {task.starred ? <BsStarFill /> : <BsStar />}
                        </Button>
                        <Button variant="success" size="sm" onClick={() => toggleComplete(task.id)} className="me-2">
                          <BsCheck />
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => deleteTask(task.id)}><BsTrash /></Button>
                      </div>
                    </div>
                    <Collapse in={expandedTaskId === task.id}>
                      <div className="p-3 ms-4 border-start">
                        <ListGroup variant="flush">
                          {task.subtasks.map(subtask => (
                            <ListGroup.Item key={subtask.id} className="d-flex justify-content-between align-items-center">
                              <Form.Check 
                                type="checkbox" 
                                checked={subtask.completed} 
                                onChange={() => toggleSubtask(task.id, subtask.id)}
                                label={<span className={subtask.completed ? 'text-decoration-line-through' : ''}>{subtask.text}</span>}
                              />
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                        <InputGroup className="mt-2">
                          <Form.Control 
                            placeholder="Add subtask..." 
                            value={newSubtaskText} 
                            onChange={(e) => setNewSubtaskText(e.target.value)} 
                          />
                          <Button onClick={() => handleAddSubtask(task.id)}><BsPlus /></Button>
                        </InputGroup>
                      </div>
                    </Collapse>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
