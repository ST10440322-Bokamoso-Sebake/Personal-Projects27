import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc, orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import './Dashboard.css';

function Dashboard({ user }) {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all'); // all, high, medium, low, completed
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const tasksRef = collection(db, 'tasks');
    const q = query(
      tasksRef,
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      await addDoc(collection(db, 'tasks'), {
        ...taskData,
        userId: user.uid,
        completed: false,
        createdAt: new Date()
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, updates);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleComplete = async (taskId, completed) => {
    await handleUpdateTask(taskId, { completed: !completed });
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'high' || filter === 'medium' || filter === 'low') {
      return !task.completed && task.priority === filter;
    }
    return !task.completed;
  });

  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Student Task Manager</h1>
          <div className="header-actions">
            <span className="user-email">{user.email}</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-controls">
          <div className="filter-buttons">
            <button
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              All Tasks
            </button>
            <button
              className={filter === 'high' ? 'active' : ''}
              onClick={() => setFilter('high')}
            >
              High Priority
            </button>
            <button
              className={filter === 'medium' ? 'active' : ''}
              onClick={() => setFilter('medium')}
            >
              Medium Priority
            </button>
            <button
              className={filter === 'low' ? 'active' : ''}
              onClick={() => setFilter('low')}
            >
              Low Priority
            </button>
            <button
              className={filter === 'completed' ? 'active' : ''}
              onClick={() => setFilter('completed')}
            >
              Completed ({completedTasks.length})
            </button>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="add-task-button"
          >
            {showForm ? 'Cancel' : '+ Add New Task'}
          </button>
        </div>

        {showForm && (
          <TaskForm onSubmit={handleAddTask} onCancel={() => setShowForm(false)} />
        )}

        <div className="tasks-section">
          <h2>
            {filter === 'all' && 'All Tasks'}
            {filter === 'high' && 'High Priority Tasks'}
            {filter === 'medium' && 'Medium Priority Tasks'}
            {filter === 'low' && 'Low Priority Tasks'}
            {filter === 'completed' && 'Completed Tasks'}
            <span className="task-count">({filteredTasks.length})</span>
          </h2>
          <TaskList
            tasks={filteredTasks}
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

