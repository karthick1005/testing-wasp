import React from 'react';

console.log('TestComponent2.js is loading...');

const TestComponent2 = () => {
  console.log('TestComponent2 is rendering!');
  return React.createElement('div', { style: { padding: '20px', background: 'yellow' } }, 
    React.createElement('h1', null, 'Test Component 2'),
    React.createElement('p', null, 'This is a different file to test if the issue is App.js specific')
  );
};

console.log('TestComponent2 function defined:', TestComponent2);

export default TestComponent2;
