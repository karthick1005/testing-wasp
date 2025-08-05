import React from 'react';

export default function MyFirstApp() {
  return (
    <div className='py-10 lg:mt-10'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl text-center'>
          <h2 className='mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl'>
            🚀 <span className='text-primary'>My First</span> App
          </h2>
          <p className='mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground'>
            Welcome to your first app! This is a simple template to get you started.
          </p>
        </div>

        <div className='mt-12 max-w-2xl mx-auto'>
          <div className='bg-muted/20 p-8 rounded-lg'>
            <h3 className='text-xl font-semibold mb-4'>Getting Started</h3>
            <div className='space-y-4 text-muted-foreground'>
              <p>1. Edit this component in <code>src/apps/my-first-app/MyFirstApp.tsx</code></p>
              <p>2. Add your app logic, components, and styling</p>
              <p>3. Update the app configuration in <code>src/apps/app-config.ts</code></p>
              <p>4. Add the route to your <code>main.wasp</code> file</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
