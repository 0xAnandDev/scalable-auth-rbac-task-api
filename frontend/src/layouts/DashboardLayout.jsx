import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';

/**
 * Layout wrapper with sidebar and top navbar navigation structures.
 */
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={styles.container}>
      {/* Sidebar navigation */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Main content body area */}
      <div style={{ ...styles.contentWrapper, paddingLeft: sidebarOpen ? '260px' : '80px' }}>
        {/* Global application navbar */}
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} />

        {/* Dynamic sub-page container outlet */}
        <main style={styles.mainContent}>
          <div style={styles.innerContainer} className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: 'var(--bg-primary)',
    position: 'relative',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minHeight: '100vh',
    transition: 'padding-left var(--transition-normal)',
  },
  mainContent: {
    flexGrow: 1,
    padding: '32px',
    marginTop: '70px', // Matches Navbar height offset
    display: 'flex',
    flexDirection: 'column',
  },
  innerContainer: {
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
};

export default DashboardLayout;
