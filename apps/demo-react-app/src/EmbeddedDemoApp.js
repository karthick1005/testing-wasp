import React, { useState, useEffect, useMemo } from 'react';
import './embeddedStyles.css'; // Use scoped styles instead of global styles
import _ from 'lodash';
import moment from 'moment';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

// Heavy component with lots of data processing
const DataVisualization = () => {
  const [chartData, setChartData] = useState(null);
  const [users, setUsers] = useState([]);

  // Generate massive dataset
  const generateHeavyData = useMemo(() => {
    const labels = [];
    const data = [];
    
    // Create 1000 data points with complex calculations
    for (let i = 0; i < 1000; i++) {
      labels.push(moment().subtract(i, 'days').format('YYYY-MM-DD'));
      data.push(_.random(100, 1000) * Math.sin(i / 10) + Math.cos(i / 5) * 50);
    }
    
    return {
      labels: labels.reverse(),
      datasets: [
        {
          label: 'Complex Data Processing',
          data: data.reverse(),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    };
  }, []);

  // Generate fake users
  const generateUsers = useMemo(() => {
    return _.times(500, (i) => ({
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      company: `Company ${i % 10}`,
      address: `${i} Main Street`,
      phone: `555-${String(i).padStart(4, '0')}`,
      revenue: _.random(1000, 10000),
      lastLogin: moment().subtract(_.random(1, 30), 'days').format('YYYY-MM-DD HH:mm'),
      status: _.sample(['active', 'inactive', 'pending'])
    }));
  }, []);

  useEffect(() => {
    setChartData(generateHeavyData);
    setUsers(generateUsers);
  }, [generateHeavyData, generateUsers]);

  const processedStats = useMemo(() => {
    const totalRevenue = users.reduce((sum, user) => sum + user.revenue, 0);
    const activeUsers = users.filter(user => user.status === 'active').length;
    const avgRevenue = users.length > 0 ? totalRevenue / users.length : 0;
    
    return {
      totalRevenue,
      activeUsers,
      avgRevenue,
      totalUsers: users.length
    };
  }, [users]);

  return (
    <div className="demo-card">
      <h2>📊 Heavy Data Processing Component</h2>
      <p>This component demonstrates complex calculations and large dataset handling.</p>
      
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-value">{processedStats.totalUsers}</div>
          <div className="stat-label">Total Users</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{processedStats.activeUsers}</div>
          <div className="stat-label">Active Users</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">${processedStats.totalRevenue.toLocaleString()}</div>
          <div className="stat-label">Total Revenue</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">${Math.round(processedStats.avgRevenue).toLocaleString()}</div>
          <div className="stat-label">Avg Revenue</div>
        </div>
      </div>

      <div className="chart-container">
        📈 Chart visualization would render here
        <br />
        <small>Data points: {chartData?.labels?.length || 0}</small>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Company</th>
            <th>Revenue</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.slice(0, 5).map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.company}</td>
              <td>${user.revenue.toLocaleString()}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Embedded version of the main demo app
const EmbeddedDemoApp = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="embedded-demo-app">
        <div className="demo-header">
          <div className="loading-spinner"></div>
          <p style={{ color: 'white', marginTop: '10px' }}>Loading embedded demo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="embedded-demo-app">
      <div className="demo-header">
        <h1>🚀 Module Federation Demo</h1>
        <p className="demo-subtitle">
          Embedded React App with Heavy Dependencies (Optimized for Host Integration)
        </p>
      </div>

      <div className="demo-content">
        <div className="demo-card">
          <h2>🎯 Lazy Loading Success!</h2>
          <p>
            This component was loaded dynamically using <strong>Webpack Module Federation</strong>. 
            It includes heavy dependencies but doesn't affect the host application's bundle size.
          </p>
          
          <ul className="feature-list">
            <li>
              <span className="feature-icon">⚡</span>
              <span>Lazy loaded on demand</span>
            </li>
            <li>
              <span className="feature-icon">🔗</span>
              <span>Shared React dependencies</span>
            </li>
            <li>
              <span className="feature-icon">📦</span>
              <span>Independent versioning</span>
            </li>
            <li>
              <span className="feature-icon">🛡️</span>
              <span>Error isolation</span>
            </li>
            <li>
              <span className="feature-icon">🎨</span>
              <span>Scoped styling (no conflicts)</span>
            </li>
          </ul>
        </div>

        <DataVisualization />

        <div className="demo-card">
          <h2>🔧 Technical Stack</h2>
          <p>This remote component includes several heavy dependencies:</p>
          
          <div className="tech-stack">
            <span className="tech-item">⚛️ React 18</span>
            <span className="tech-item">📊 Chart.js</span>
            <span className="tech-item">🔧 Lodash</span>
            <span className="tech-item">📅 Moment.js</span>
            <span className="tech-item">🌐 Axios</span>
            <span className="tech-item">🎨 CSS Modules</span>
          </div>

          <p>
            <strong>Bundle Size Test:</strong> Check your browser's Network tab to see that the host app 
            loads quickly, and this heavy component only loads when requested.
          </p>
          <p>
            <strong>Host Integration:</strong> This version uses scoped CSS to avoid conflicts with 
            the host application's styles and navbar.
          </p>
        </div>
      </div>

      <div className="demo-footer">
        <p>
          <strong>🎉 Integration Success!</strong> This app is running inside OpenSaaS 
          while preserving the host navbar and layout.
        </p>
        <p>
          Loaded from: <code>http://localhost:3002</code>
        </p>
      </div>
    </div>
  );
};

export default EmbeddedDemoApp;
