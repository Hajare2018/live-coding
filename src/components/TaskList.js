import React from 'react';
import axios from 'axios';

const TaskList = ({ tasks, setTasks }) => {
    const toggleStatus = async (id, currentStatus ) => {
        try {
            const response = await axios.patch(`http://localhost:5000/tasks/${id}`, { status: !currentStatus });
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === id ? { ...task, status: response.data.status } : task
                )
            );
        } catch (error) {
            alert('Failed to update task');
        }
    };

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <input
                        type="checkbox"
                        checked={task.status}
                        onChange={() => toggleStatus(task.id, task.status)}
                    />
                    {task.title}
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
