const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');



const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const port = 5000;

let TASKS_FILE = './tasks.json';

const readTasks = () => JSON.parse(fs.readFileSync(TASKS_FILE));
const writeTasks = () => JSON.parse(fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2)));

app.post('/tasks', (req, res) => {
    const { title} = req.body;
    const tasks = readTasks();
    const newTasks ={id: uuidv4(), title: title}
    tasks.push(newTasks);
    writeTasks(tasks);
    res.status(201).json(newTasks);
});

app.get('/tasks', (req, res) => {
    const task = readTasks();
    res.json(task);
})

app.patch('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (status!== 'boolean') {
        return res.status(400).json({error: 'Status must be a boolean'});
    }
    const tasks = readTasks();
    const task = tasks.find(task=> task.id === id);

    if (!task) {
        return res.status(404).json({error: 'Task not found'});
    }
    task.status = status;
    writeTasks(tasks)
    res.json(task);
})

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});