import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSave, initial }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initial) {
      setTitle(initial.title);
      setDescription(initial.description);
    }
  }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return alert('Title required');
    onSave({ title, description, completed: initial?.completed || false });
  };

  return (
    <div className="task-form">
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <button type="submit">Save Task</button>
      </form>
    </div>
  );
};

export default TaskForm;

