
import axios from 'axios';
import React, { useState } from 'react';

const LoginAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8800/login", { username, password })
      .then((res) => {
        console.log(res);
        if(res.status === 200 && res.data === 'Login sucessful'){
          setAlertMessage('');
          window.location.href = "/dashboard";
        } else {
          alert('Login failed. Please check your credentials and try again.');
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className='forms'>
       
      <form className="form" onSubmit={handleSubmit}>
      <h1>Login</h1>
      {alertMessage && <div className="alert">{alertMessage}</div>}
        <input
          type="text"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="UserName"
        />
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="formButton">Login</button>
      </form>
    </div>
  );
};

export default LoginAdmin;
