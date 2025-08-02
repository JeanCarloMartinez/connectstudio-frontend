import React, { useState } from 'react';
import AdvisorSidebar from './AdvisorSidebar';
import AdvisorHeader from './AdvisorHeader';
import AdvisorAgenda from './AdvisorAgenda';

const AdvisorLayout = ({ children, onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-blue-50"> {/* Color de fondo de la página */}
      <AdvisorSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onNavigate={onNavigate} />
      <div className="flex-1 flex flex-col lg:ml-64">
        <AdvisorHeader toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdvisorLayout;