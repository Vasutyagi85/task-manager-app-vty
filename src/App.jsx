import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import TaskFilter from './components/TaskFilter';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState(() => {
    // Initialize tasks from localStorage if available
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (updatedTask, index) => {
    const newTasks = [...tasks];
    newTasks[index] = updatedTask;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const clearTasks = () => {
    setTasks([]);
  };

  return (
    <div className='App'>
      <header>
        <h1>TaskManager</h1>
        <p className='tagline'>Your friendly Task Manager</p>
      </header>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/login' element={
            <>
              <Login />
              <TaskForm addTask={addTask} />
              <TaskFilter tasks={tasks} />
              <TaskList
                tasks={tasks}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
              {tasks.length > 0 && (
                <button className='clear-btn' onClick={clearTasks}>
                  Clear All Tasks
                </button>
              )}
            </>
          } />
          <Route path='/tasks' element={
            <>
              <TaskForm addTask={addTask} />
              <TaskFilter tasks={tasks} />
              <TaskList
                tasks={tasks}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
              {tasks.length > 0 && (
                <button className='clear-btn' onClick={clearTasks}>
                  Clear All Tasks
                </button>
              )}
            </>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;