import React, { useState } from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList({ tasks, onUpdate, onDelete, onToggleComplete }) {
  const [editingId, setEditingId] = useState(null);

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks found. Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          isEditing={editingId === task.id}
          onEdit={() => setEditingId(task.id)}
          onCancelEdit={() => setEditingId(null)}
          onUpdate={(updates) => {
            onUpdate(task.id, updates);
            setEditingId(null);
          }}
          onDelete={() => onDelete(task.id)}
          onToggleComplete={() => onToggleComplete(task.id, task.completed)}
        />
      ))}
    </div>
  );
}

export default TaskList;

