import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className='row mt-4'>
        <div className='col-md-3 mb-3'>
          <div className='card text-white bg-primary'>
            <div className='card-body'>
              <h5 className='card-title'>Total Products</h5>
              <p className='card-text display-6'>0</p>
            </div>
          </div>
        </div>
        <div className='col-md-3 mb-3'>
          <div className='card text-white bg-success'>
            <div className='card-body'>
              <h5 className='card-title'>Total Orders</h5>
              <p className='card-text display-6'>0</p>
            </div>
          </div>
        </div>
        <div className='col-md-3 mb-3'>
          <div className='card text-white bg-warning'>
            <div className='card-body'>
              <h5 className='card-title'>Pending Orders</h5>
              <p className='card-text display-6'>0</p>
            </div>
          </div>
        </div>
        <div className='col-md-3 mb-3'>
          <div className='card text-white bg-info'>
            <div className='card-body'>
              <h5 className='card-title'>Total Revenue</h5>
              <p className='card-text display-6'>0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
