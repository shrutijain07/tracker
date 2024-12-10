import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: '20px',height: '100vh', width:'100%' }} className='d-flex flex-column justify-content-center align-items-center'>
        <Outlet />
      </div>
    </div>
  );
}
