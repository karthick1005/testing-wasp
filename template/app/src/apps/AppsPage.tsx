import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { getActiveApps, AppConfig } from './app-config';
export default function AppsPage() {
  const apps = getActiveApps();
  const categories = Array.from(new Set(apps.map((app) => app.category || 'other')));
  return (
    <div className='py-10 lg:mt-10'>
      {' '}
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        {' '}
        <div className='mx-auto max-w-4xl text-center'>
          {' '}
          <h2 className='mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl'>
            {' '}
            <span className='text-primary'>App</span> Dashboard{' '}
          </h2>{' '}
          <p className='mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground'>
            {' '}
            Access all your applications in one place{' '}
          </p>{' '}
        </div>{' '}
        <div className='mt-12'>
          {' '}
          {categories.map((category) => {
            const appsInCategory = apps.filter((app) => (app.category || 'other') === category);
            return (
              <div key={category} className='mb-12'>
                {' '}
                <h3 className='text-2xl font-semibold mb-6 capitalize text-foreground'>
                  {' '}
                  {category} Apps{' '}
                </h3>{' '}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {' '}
                  {appsInCategory.map((app) => (
                    <AppCard key={app.id} app={app} />
                  ))}{' '}
                </div>{' '}
              </div>
            );
          })}{' '}
        </div>{' '}
        {apps.length === 0 && (
          <div className='text-center py-12'>
            {' '}
            <p className='text-xl text-muted-foreground mb-4'>No apps available yet</p>{' '}
            <p className='text-sm text-muted-foreground'>
              {' '}
              Add your first app by editing <code>src/apps/app-config.ts</code>{' '}
            </p>{' '}
          </div>
        )}{' '}
      </div>{' '}
    </div>
  );
}
interface AppCardProps {
  app: AppConfig;
}
function AppCard({ app }: AppCardProps) {
  const handleOpenApp = () => {
    window.location.href = app.path;
  };
  return (
    <Card className='h-full flex flex-col hover:shadow-lg transition-shadow duration-200'>
      {' '}
      <CardHeader>
        {' '}
        <div className='flex items-center justify-between mb-2'>
          {' '}
          <div className='text-2xl'>{app.icon || '📱'}</div>{' '}
          <div className='flex gap-2'>
            {app.authRequired && (
              <Badge variant='secondary' className='bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
                🔐 Login Required
              </Badge>
            )}
            <Badge variant='outline' className='capitalize'>
              {' '}
              {app.category}{' '}
            </Badge>
          </div>{' '}
        </div>{' '}
        <CardTitle className='text-xl'>{app.name}</CardTitle>{' '}
        <CardDescription className='text-sm text-muted-foreground'> {app.description} </CardDescription>{' '}
      </CardHeader>{' '}
      <CardContent className='flex-1 flex flex-col justify-end'>
        {' '}
        <Button className='w-full' variant='default' onClick={handleOpenApp}>
          {' '}
          Open App{' '}
        </Button>{' '}
      </CardContent>{' '}
    </Card>
  );
}
