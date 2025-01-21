import React, { useState } from 'react';
import axios from 'axios';

const AddTask = ({ onAdd }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) return alert('Task title is required');
        try {
            const response = await axios.post('http://localhost:3000/tasks', { title });
            onAdd(response.data);
            setTitle('');
        } catch (error) {
            alert('Failed to add task');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new task"
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default AddTask;