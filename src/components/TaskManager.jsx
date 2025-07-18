import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';

const TaskManager = ({ user, onLogout }) => {
const [tasks, setTasks] = useState([]);
const [showForm, setShowForm] = useState(false);
const [editIndex, setEditIndex] = useState(null);
useEffect(() => {
const stored = JSON.parse(localStorage.getItem('tasks')) || [];
setTasks(stored);
}, []);
const saveTasks = (updatedTasks) => {
setTasks(updatedTasks);
localStorage.setItem('tasks',JSON.stringify(updatedTasks));
};
const addTask = (task) => {
const newTask = { ...task, completed: false, id: Date.now() };
const newTasks = [...tasks, newTask];
saveTasks(newTasks);
setShowForm(false);
};
const updateTask = (updatedTask) => {
const newTasks = tasks.map((task, i) =>
   i === editIndex ? {...task, ...updatedTask } : task
);
saveTasks(newTasks);
setShowForm(false);
setEditIndex(null);
};
const deleteTask = (index) => {
const newTasks = tasks.filter((_, i) => i !== index);
  saveTasks(newTasks);
};
const markComplete = (index) => {
const newTasks = tasks.map((task, i) =>
  i === index ? {...task, completed: true} : task
  );
  saveTasks(newTasks);
};
const pending = tasks
    .map((task, i) => ({...task, index: i}))
    .filter((task) => !task.completed);
const completed = tasks
    .map((task, i) => ({...task, index: i}))
    .filter((task) => task.completed);
return (
<div className="task-manager">
  <div className="header">
  <h2>Welcome, {user.name}</h2>
<button onClick={() => {localStorage.removeItem('user'); onLogout();}}>Logout</button>
</div>
<div className="task-sections">
  <section className="pending">
  <h3>Pending Tasks</h3>{pending.map((task) => (
  <div key={task.id} className="task-card">
   <strong>#{task.index + 1}</strong>
  <h4>{task.title}</h4>
  <p>{task.description}</p>
<button onClick={()=>{setEditIndex(task.index); setShowForm(true);}}>Edit</button>
<button onClick={()=>markComplete(task.index)}>Complete</button>
<button onClick={()=>deleteTask(task.index)}>Delete</button>
</div>
))}
</section>
<section className="completed">
  <h3>Completed Tasks</h3>
  {completed.map((task) => (
  <div key={task.id} className="task-card">
  <strong>#{task.index + 1}</strong>
  <h4>{task.title}</h4>
  <p>{task.description}</p>
  <button onClick={()=>{setEditIndex(task.index); setShowForm(true);}}>Edit</button>
  <button onClick={()=>deleteTask(task.index)}>Delete</button>
</div>
))}
</section>
</div>
{showForm && (
<TaskForm onSave={editIndex !== null ? updateTask : addTask} initial={editIndex !== null ? tasks[editIndex] : null} onClose={() => setShowForm(false)}/>
)}
<button className="add-task" onClick={() => { setEditIndex(null); setShowForm(true); }}>+</button>
</div>
);
};

export default TaskManager;