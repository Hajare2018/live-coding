const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const port = 5000;

let TASKS_FILE = "./tasks.json";

const readTasks = () => {
  try {
    const data = fs.readFileSync(TASKS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading tasks:', error);
    return [];
  }
};

const writeTasks = (tasks) => {
  try {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error('Error writing tasks:', error);
  }
};

app.post("/tasks", (req, res) => {
  const title = req.body.title;
  const status = req.body.status === true ? true : false;

  const newTasks = { id: uuidv4(), title: title, status: status };
  const tasks = readTasks();
  if (!Array.isArray(tasks)) {
    return res.status(500).json({ error: 'Invalid tasks data' });
  }
  tasks.push(newTasks);
  writeTasks(tasks);
  res.status(201).json(newTasks);
});

app.get("/tasks", (req, res) => {
  const task = readTasks();
  res.json(task);
});

app.patch("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;

  const tasks = readTasks();
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  task.status = status;
  task.title = title
  writeTasks(tasks);
  res.json(task);
});

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
