import React from 'react';

export default function TaskItem({ task, toggleTask, deleteTask }) {
    const handleToggle = () => {
        toggleTask(task.id);
    };

    const handleDelete = () => {
        deleteTask(task.id);
    };

    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-content">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={handleToggle}
                />
                <span className={`task-text ${task.completed ? 'strikethrough' : ''}`}>
                    {task.text}
                </span>
            </div>
            
            <div className="task-details">
                <span className={`priority priority-${task.priority.toLowerCase()}`}>
                    {task.priority}
                </span>
                <span className="category">
                    {task.category}
                </span>
            </div>
            
            <div className="task-actions">
                <button 
                    onClick={handleDelete}
                    className="delete-btn"
                    aria-label="Delete task"
                >
                    ×
                </button>
            </div>
        </div>
    );
}