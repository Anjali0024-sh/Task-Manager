import React, { useState } from 'react';

const Signup = ({ onSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return alert('All fields are required!');
    }
    const user = { name, email, password };
    localStorage.setItem('user', JSON.stringify(user));
    onSignup(user);
  };
  return (
    <div className="signupForm">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Create password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;

