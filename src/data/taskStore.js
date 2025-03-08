import { v4 as uuidv4 } from 'uuid';

// Check if running in browser
const isBrowser = typeof window !== 'undefined';

// Get tasks from localStorage or start with empty array
const getInitialTasks = () => {
  if (isBrowser) {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  }
  return [];
};

// Initial tasks
let tasks = getInitialTasks();

// Save tasks to localStorage
const saveTasks = () => {
  if (isBrowser) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
};

// Get all tasks
export const getAllTasks = () => tasks;

// Get a single task by id
export const getTaskById = (id) => tasks.find(task => task.id === id);

// Add a new task
export const addTask = (taskData) => {
  const newTask = {
    id: uuidv4(),
    completed: false,
    createdAt: new Date().toISOString(),
    ...taskData
  };
  tasks = [newTask, ...tasks];
  saveTasks();
  return newTask;
};

// Update a task
export const updateTask = (id, updatedData) => {
  tasks = tasks.map(task => 
    task.id === id ? { ...task, ...updatedData } : task
  );
  saveTasks();
  return getTaskById(id);
};

// Toggle task completion status
export const toggleTaskCompletion = (id) => {
  const task = getTaskById(id);
  if (task) {
    return updateTask(id, { completed: !task.completed });
  }
  return null;
};

// Delete a task
export const deleteTask = (id) => {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  return true;
};
