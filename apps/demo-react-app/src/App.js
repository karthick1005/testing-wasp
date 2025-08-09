import React, { useState, useEffect, useMemo } from 'react';
import './styles.css';
import _ from 'lodash';
import moment from 'moment';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
// import { Bar, Line } from 'react-chartjs-2';
// import { faker } from '@faker-js/faker';
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

  // Generate fake users with Faker
  const generateUsers = useMemo(() => {
    return _.times(500, (i) => ({
      id: i,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      company: faker.company.name(),
      address: faker.location.streetAddress(),
      phone: faker.phone.number(),
      avatar: faker.image.avatar(),
      bio: faker.lorem.paragraphs(3),
      createdAt: faker.date.past(),
      salary: faker.number.int({ min: 30000, max: 200000 }),
      department: faker.helpers.arrayElement(['Engineering', 'Marketing', 'Sales', 'HR', 'Finance']),
    }));
  }, []);

  useEffect(() => {
    setChartData(generateHeavyData);
    setUsers(generateUsers);
  }, [generateHeavyData, generateUsers]);

  const sortedUsers = useMemo(() => {
    return _.orderBy(users, ['salary'], ['desc']);
  }, [users]);

  const usersByDepartment = useMemo(() => {
    return _.groupBy(users, 'department');
  }, [users]);

  const departmentStats = useMemo(() => {
    const stats = _.mapValues(usersByDepartment, (deptUsers) => ({
      count: deptUsers.length,
      avgSalary: _.meanBy(deptUsers, 'salary'),
      totalSalary: _.sumBy(deptUsers, 'salary'),
    }));
    
    return {
      labels: Object.keys(stats),
      datasets: [
        {
          label: 'Average Salary by Department',
          data: Object.values(stats).map(s => s.avgSalary),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [usersByDepartment]);

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>📊 Heavy Data Visualization (~2MB Bundle)</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div>
          <h4>Time Series Data (1000 points)</h4>
          {chartData && <Line data={chartData} options={{ responsive: true, animation: false }} />}
        </div>
        
        <div>
          <h4>Department Statistics</h4>
          {departmentStats && <Bar data={departmentStats} options={{ responsive: true }} />}
        </div>
      </div>
      
      <div>
        <h4>👥 Fake Users Database ({users.length} records)</h4>
        <div style={{ maxHeight: '300px', overflow: 'auto', border: '1px solid #ddd', padding: '10px' }}>
          {sortedUsers.slice(0, 50).map(user => (
            <div key={user.id} style={{ 
              padding: '10px', 
              borderBottom: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <div>
                <strong>{user.name}</strong> - {user.department}<br/>
                <small>{user.email} | ${user.salary.toLocaleString()}</small>
              </div>
              <div>
                <small>{moment(user.createdAt).fromNow()}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DemoApp = () => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('🚀 Enhanced Heavy Demo App - Now with Massive Bundle!');
  const [activeTab, setActiveTab] = useState('overview');

  const features = [
    'Webpack Module Federation',
    'Lazy Loading at Runtime', 
    'Zero Bundle Impact on Host',
    'Dynamic Component Loading',
    'Shared Dependencies',
    '📈 Chart.js Visualizations (~500KB)',
    '📊 Lodash Utilities (~100KB)', 
    '📅 Moment.js Date Processing (~300KB)',
    '🎭 Faker.js Data Generation (~200KB)',
    '🌐 Axios HTTP Client (~50KB)',
    '💾 Heavy Data Processing',
    '🧮 Complex Mathematical Operations'
  ];

  const bundleInfo = {
    'Original Size': '30 KB',
    'With Heavy Dependencies': '~2.5 MB',
    'Host App Impact': '0 KB (Lazy Loaded)',
    'Load Strategy': 'On-Demand Module Federation'
  };

  return (
    <div className="demo-app">
      <div className="demo-header">
         

        <h1>🚀 Heavy Demo React App</h1>
        <p className="demo-subtitle">
          Massive bundle size (~2.5MB) loaded with Module Federation - Zero impact on host!
        </p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          {['overview', 'charts'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '5px 15px',
                backgroundColor: activeTab === tab ? '#007bff' : '#f8f9fa',
                color: activeTab === tab ? 'white' : 'black',
                border: '1px solid #ddd',
                cursor: 'pointer'
              }}
            >
              {_.capitalize(tab)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="demo-content">
        {activeTab === 'overview' && (
          <>
            <div className="demo-card">
              <h2>📦 Bundle Size Impact Test</h2>
              <p>{message}</p>
              
              <div className="counter-section">
                <p>Counter: <span className="counter-value">{count}</span></p>
                <div className="button-group">
                  <button onClick={() => setCount(count + 1)}>Increment</button>
                  <button onClick={() => setCount(count - 1)}>Decrement</button>
                  <button onClick={() => setCount(0)}>Reset</button>
                </div>
              </div>

              <div className="message-section">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Edit the message..."
                />
              </div>
            </div>

            <div className="demo-card">
              <h2>📊 Bundle Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                {Object.entries(bundleInfo).map(([key, value]) => (
                  <div key={key} style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                    <strong>{key}:</strong><br/>
                    <span style={{ color: key === 'Host App Impact' ? 'green' : 'inherit' }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="demo-card">
              <h2>🎯 Enhanced Features</h2>
              <div className="features-grid">
                {features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="demo-card">
              <h2>📅 Date Processing with Moment.js</h2>
              <p>Current time: {moment().format('LLLL')}</p>
              <p>In different formats:</p>
              <ul>
                <li>ISO: {moment().toISOString()}</li>
                <li>Unix: {moment().unix()}</li>
                <li>Relative: {moment().subtract(1, 'hour').fromNow()}</li>
                <li>Calendar: {moment().add(1, 'day').calendar()}</li>
              </ul>
            </div>
          </>
        )}

        {activeTab === 'charts' && <DataVisualization />}
      </div>

      <div className="demo-footer">
        <p>
          This component is loaded dynamically and has a massive bundle size (~2.5MB) including:
          Chart.js, Lodash, Moment.js, Faker.js, and Axios. The host OpenSaaS app remains unaffected!
        </p>
        <p>
          <strong>Bundle Size Test:</strong> Check your browser's Network tab to see that the host app 
          loads quickly, and this heavy component only loads when requested.
        </p>
      </div>
    </div>
  );
};

export default DemoApp;
