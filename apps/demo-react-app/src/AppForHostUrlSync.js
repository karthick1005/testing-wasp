import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './embeddedStyles.css'; // Use scoped styles

// Import the embedded version
import EmbeddedDemoApp from './EmbeddedDemoApp';

// Create some example components for different routes
const Dashboard = () => (
  <div style={{ padding: '20px' }}>
    <h1>📊 Dashboard</h1>
    <p>This is the dashboard page of the demo app.</p>
    <div style={{ marginTop: '20px', padding: '15px', background: '#f0f8ff', borderRadius: '8px' }}>
      <h3>Dashboard Features:</h3>
      <ul>
        <li>Analytics Overview</li>
        <li>User Statistics</li>
        <li>Recent Activity</li>
      </ul>
    </div>
  </div>
);

const Settings = () => (
  <div style={{ padding: '20px' }}>
    <h1>⚙️ Settings</h1>
    <p>Configure your demo app settings here.</p>
    <div style={{ marginTop: '20px' }}>
      <h3>Available Settings:</h3>
      <div style={{ padding: '10px', background: '#f9f9f9', borderRadius: '5px', margin: '10px 0' }}>
        <label>
          <input type="checkbox" /> Enable notifications
        </label>
      </div>
      <div style={{ padding: '10px', background: '#f9f9f9', borderRadius: '5px', margin: '10px 0' }}>
        <label>
          <input type="checkbox" /> Dark mode
        </label>
      </div>
      <div style={{ padding: '10px', background: '#f9f9f9', borderRadius: '5px', margin: '10px 0' }}>
        <label>
          Theme: 
          <select style={{ marginLeft: '10px' }}>
            <option>Default</option>
            <option>Blue</option>
            <option>Green</option>
          </select>
        </label>
      </div>
    </div>
  </div>
);

const Profile = () => (
  <div style={{ padding: '20px' }}>
    <h1>👤 Profile</h1>
    <p>User profile information and preferences.</p>
    <div style={{ marginTop: '20px', padding: '15px', background: '#fff5f5', borderRadius: '8px' }}>
      <h3>Profile Details:</h3>
      <p><strong>Name:</strong> Demo User</p>
      <p><strong>Email:</strong> demo@example.com</p>
      <p><strong>Role:</strong> Administrator</p>
      <p><strong>Last Login:</strong> 2 minutes ago</p>
    </div>
  </div>
);

// Navigation component that uses the host's router context
const Navigation = ({ basePath = '/lazy-demo' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navStyle = {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
  };
  
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
    cursor: 'pointer',
    background: 'none',
    border: 'none'
  };
  
  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  };
  
  // Helper function to check if a route is active
  const isActive = (path) => {
    if (path === '') {
      return location.pathname === basePath || location.pathname === `${basePath}/`;
    }
    return location.pathname === `${basePath}${path}`;
  };
  
  return (
    <nav style={navStyle}>
      <div style={{ color: 'white', fontWeight: 'bold', marginRight: 'auto' }}>
        🚀 Demo App (URL Sync)
      </div>
      <Link 
        to={basePath}
        style={isActive('') ? activeLinkStyle : linkStyle}
      >
        Home
      </Link>
      <Link 
        to={`${basePath}/dashboard`}
        style={isActive('/dashboard') ? activeLinkStyle : linkStyle}
      >
        Dashboard
      </Link>
      <Link 
        to={`${basePath}/settings`}
        style={isActive('/settings') ? activeLinkStyle : linkStyle}
      >
        Settings
      </Link>
      <Link 
        to={`${basePath}/profile`}
        style={isActive('/profile') ? activeLinkStyle : linkStyle}
      >
        Profile
      </Link>
    </nav>
  );
};

// Render the current view based on the URL path
const renderCurrentView = (location, basePath) => {
  const subPath = location.pathname.replace(basePath, '') || '/';
  
  switch (subPath) {
    case '/dashboard':
      return <Dashboard />;
    case '/settings':
      return <Settings />;
    case '/profile':
      return <Profile />;
    case '/':
    case '':
    default:
      return <EmbeddedDemoApp />;
  }
};

// Main app that integrates with the host's router and syncs URLs
const AppForHostUrlSync = ({ basePath = '/lazy-demo' }) => {
  const location = useLocation();

  return (
    <div style={{ 
      width: '100%',
      maxWidth: '100%',
      background: '#f5f5f5',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'relative',
      zIndex: 1,
      height: 'auto',
      maxHeight: '100vh'
    }}>
      <Navigation basePath={basePath} />
      <div style={{ 
        height: 'auto',
        maxHeight: '70vh',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}>
        {renderCurrentView(location, basePath)}
      </div>
    </div>
  );
};

export default AppForHostUrlSync;
