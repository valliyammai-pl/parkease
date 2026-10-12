import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { DemoNotice } from '../common/DemoNotice';
import { DemoAssistant } from '../common/DemoAssistant';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-text)] transition-colors">
      <DemoNotice />
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
      <DemoAssistant />
    </div>
  );
};
