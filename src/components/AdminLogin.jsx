import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();
      // console.log(data);

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Check role and success
      if (data.success && data.token && data.username && data.role === 'admin') {
        // Save to localStorage
        localStorage.setItem('adminAuthenticated', 'true');
        localStorage.setItem('token', data.token);
        localStorage.setItem('adminName', data.username);

        navigate('/admin-page/dashboard');
      } else if (data.role !== 'admin') {
        setError('Access denied. Only admin users can log in.');
      } else {
        setError('Invalid login details.');
      }
    } catch (err) {
      // console.error('Login error:', err);
      setError(`${err.message}`);
    }
  };

  return (
    <div className='admin-login-wrapper d-flex justify-content-center align-items-center min-vh-100'>
      <div className='login-card shadow-lg p-4'>
        <div className='text-center mb-4'>
          <h2 className='fw-bold text-dark'>Admin Portal</h2>
          <p className='text-muted'>Sign in to manage your platform</p>
        </div>

        {error && <div className='alert alert-danger text-center py-2'>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className='form-floating mb-3'>
            <input
              type='username'
              className='form-control'
              id='username'
              name='username'
              placeholder='preciousg'
              value={credentials.username}
              onChange={handleChange}
              required
            />
            <label htmlFor='email'>Username</label>
          </div>

          <div className='form-floating mb-4'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              placeholder='Password'
              value={credentials.password}
              onChange={handleChange}
              required
            />
            <label htmlFor='password'>Password</label>
          </div>

          <button type='submit' className='btn btn-dark w-100 py-2'>
            Login
          </button>
        </form>

        <p className='text-center mt-3 text-muted small'>© {new Date().getFullYear()} Admin Dashboard</p>
      </div>
    </div>
  );
};

export default AdminLogin;
