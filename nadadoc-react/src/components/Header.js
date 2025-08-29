import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">PlanBuddy</h1>
        <nav className="space-x-4">
          <NavLink to="/terms" className={({ isActive }) => isActive ? 'text-blue-400 underline' : 'hover:text-blue-300'}>Terms of Use</NavLink>
          <NavLink to="/privacy" className={({ isActive }) => isActive ? 'text-blue-400 underline' : 'hover:text-blue-300'}>Privacy Policy</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;