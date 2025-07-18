import React, { useState, useEffect } from 'react';
import TaskManager from './components/TaskManager';
import './index.css';
import Signup from './components/Signup';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const save = JSON.parse(localStorage.getItem('user'));
    if (save) setUser(save);
  }, []);
  return (
    <div className="App">
      {user ? (
        <TaskManager user={user} onLogout={() => setUser(null)} />
      ) : (
        <Signup onSignup={setUser}/>
      )}
    </div>
  );
}

export default App;

