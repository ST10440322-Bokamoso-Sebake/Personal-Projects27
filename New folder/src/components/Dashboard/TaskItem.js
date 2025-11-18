import React, { useState } from 'react';
import TaskForm from './TaskForm';
import './TaskItem.css';

function TaskItem({ task, isEditing, onEdit, onCancelEdit, onUpdate, onDelete, onToggleComplete }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getPriorityClass = (priority) => {
    return `priority-${priority}`;
  };

  const getPriorityLabel = (priority) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    return due < today && !task.completed;
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <TaskForm
          initialTask={task}
          onSubmit={(updates) => onUpdate(updates)}
          onCancel={onCancelEdit}
        />
      </div>
    );
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <div className="task-checkbox">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={onToggleComplete}
              id={`task-${task.id}`}
            />
            <label htmlFor={`task-${task.id}`}></label>
          </div>
          <h3 className={task.completed ? 'strikethrough' : ''}>{task.title}</h3>
          <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
            {getPriorityLabel(task.priority)}
          </span>
        </div>

        {task.description && (
          <p className={`task-description ${task.completed ? 'strikethrough' : ''}`}>
            {task.description}
          </p>
        )}

        <div className="task-footer">
          {task.dueDate && (
            <span className={`due-date ${isOverdue(task.dueDate) ? 'overdue' : ''}`}>
              📅 Due: {formatDate(task.dueDate)}
              {isOverdue(task.dueDate) && <span className="overdue-label">Overdue</span>}
            </span>
          )}
          <div className="task-actions">
            <button onClick={onEdit} className="edit-button" title="Edit task">
              ✏️ Edit
            </button>
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="delete-button"
                title="Delete task"
              >
                🗑️ Delete
              </button>
            ) : (
              <div className="delete-confirm">
                <span>Are you sure?</span>
                <button onClick={() => onDelete()} className="confirm-delete">
                  Yes
                </button>
                <button onClick={() => setShowDeleteConfirm(false)} className="cancel-delete">
                  No
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;

