import React from 'react';

export default function WeatherApp() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Weather App</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 mb-4">A simple weather app</p>
          
          {/* Add your app content here */}
          <div className="space-y-4">
            <p>Welcome to Weather App! 🎉</p>
            <p>Start building your app features here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}