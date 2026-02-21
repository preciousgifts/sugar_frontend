import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Admin = () => {
  return (
    <div className='admin-layout d-flex'>
      {/* Sidebar */}
      <aside className='admin-sidebar p-3'>
        <h4 className='mb-4'>Admin Panel</h4>
        <ul className='list-unstyled'>
          <li>
            <Link to='/admin-page/dashboard'>Dashboard</Link>
          </li>
          <li>
            <Link to='/admin-page/add-product'>Add Product</Link>
          </li>
          <li>
            <Link to='/admin-page/products'>View Products</Link>
          </li>
          <li>
            <Link to='/' target='blank'>
              Go to Home
            </Link>
          </li>
          <li>
            <Link to='/admin-page/audit-trail'>Audit Trail</Link>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className='admin-content flex-grow-1 p-4'>
        <Outlet /> {/* nested route content will render here */}
      </main>
    </div>
  );
};

export default Admin;
