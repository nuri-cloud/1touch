import React from 'react';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import Header from '../header/header';


function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;