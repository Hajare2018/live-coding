import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';

const App = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/tasks');
            setTasks(response.data);
        } catch (error) {
            alert('Failed to fetch tasks');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <h1>Task Manager</h1>
            <AddTask onAdd={(newTask) => setTasks((prevTasks) => [...prevTasks, newTask])} />
            <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
    );
};

export default App;