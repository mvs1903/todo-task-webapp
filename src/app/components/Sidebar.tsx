'use client';

import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { BsInbox, BsGraphUp } from 'react-icons/bs';

interface SidebarProps {
  setView: (view: 'inbox' | 'productivity') => void;
  isSidebarOpen: boolean;
  currentView: string;
}

const Sidebar: React.FC<SidebarProps> = ({ setView, isSidebarOpen, currentView }) => {
  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <ListGroup variant="flush">
        <ListGroup.Item action active={currentView === 'inbox'} onClick={() => setView('inbox')}>
          <BsInbox className="me-2" /> Inbox
        </ListGroup.Item>
        <ListGroup.Item action active={currentView === 'productivity'} onClick={() => setView('productivity')}>
          <BsGraphUp className="me-2" /> Productivity
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Sidebar;