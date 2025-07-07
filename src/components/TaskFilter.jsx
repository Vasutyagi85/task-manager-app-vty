import React from 'react';

export default function TaskFilter({ 
    statusFilter, 
    priorityFilter, 
    categoryFilter, 
    onStatusChange, 
    onPriorityChange, 
    onCategoryChange,
    onClearFilters 
}) {
    return (
        <div className="task-filter">
            <div className="filter-section">
                <h3>Filter Tasks</h3>
                
                <div className="filter-row">
                    <div className="filter-group">
                        <label htmlFor="status-filter">Status:</label>
                        <select 
                            id="status-filter"
                            value={statusFilter} 
                            onChange={(e) => onStatusChange(e.target.value)}
                        >
                            <option value="all">All Tasks</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="priority-filter">Priority:</label>
                        <select 
                            id="priority-filter"
                            value={priorityFilter} 
                            onChange={(e) => onPriorityChange(e.target.value)}
                        >
                            <option value="all">All Priorities</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="category-filter">Category:</label>
                        <select 
                            id="category-filter"
                            value={categoryFilter} 
                            onChange={(e) => onCategoryChange(e.target.value)}
                        >
                            <option value="all">All Categories</option>
                            <option value="General">General</option>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <button 
                            onClick={onClearFilters}
                            className="clear-filters-btn"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}