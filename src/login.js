import React, { useState } from 'react';
import './login.css';

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        onLogin(username, password);
    };

    return (
        <div className="login">
            <h4>Login</h4>
            <div className='form'>
                <div className='text_area'>
                <input
                    className="text_input"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                </div>
                <div className='text_area'>
                <input
                    className="text_input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <button className="btn" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default LoginForm;
