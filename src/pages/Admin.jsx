import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import useInactivityLogout from '../hooks/inactivityTimeout';

const Admin = () => {
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem('adminAuthenticated');
  if (!isAuthenticated) {
    navigate('/admin-page');
  }

  const adminName = localStorage.getItem('adminName');

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin-page');
  };

  let timeout;
  const resetTimer = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      localStorage.clear();
      navigate('/admin-page');
    }, import.meta.env.VITE_SESSION_TIME * 60 * 1000);
  };
  window.onload = resetTimer;
  window.onmousemove = resetTimer;
  window.KeyboardEvent = resetTimer;

  useInactivityLogout(import.meta.env.VITE_INACTIVITY_TIMEOUT);

  return (
    <div className='admin-layout d-flex'>
      {/* Sidebar */}
      <div className=' p-3 bg-dark text-white' style={{ width: '250px', minHeight: '100vh' }}>
        <h4 className='mb-4'>Admin Panel</h4>
        <ul className='list-unstyled'>
          <li className='mb-2'>
            <Link to='/admin-page/dashboard' className='text-white text-decoration-none'>
              Dashboard
            </Link>
          </li>

          <li className='mb-2'>
            <Link to='/admin-page/products' className='text-white text-decoration-none'>
              Products
            </Link>
          </li>

          <li className='mb-2'>
            <Link to='/' target='_blank' className='text-white text-decoration-none'>
              Go to Home
            </Link>
          </li>
          <li className='mb-2'>
            <Link to='/admin-page/audit-trail' className='text-white text-decoration-none'>
              Audit Trail
            </Link>
          </li>
          <li className='mt-4'>
            <button onClick={handleLogout} className='btn btn-outline-light btn-sm w-100'>
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <main className='admin-content flex-grow-1 p-4'>
        <Outlet /> {/* nested route content will render here */}
      </main>
    </div>
  );
};

export default Admin;
