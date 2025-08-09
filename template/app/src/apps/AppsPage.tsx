import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { getActiveApps, AppConfig } from './app-config';

type FilterType = 'all' | 'category' | 'auth';

interface FilterOption {
  id: string;
  label: string;
  icon: string;
  type: FilterType;
  value: string | boolean;
  count: number;
}

export default function AppsPage() {
  const apps = getActiveApps();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  
  // All possible categories from the app configuration interface
  const allCategories = ['productivity', 'ai', 'business', 'analytics', 'tools', 'other'];
  
  // Category icons mapping
  const categoryIcons: Record<string, string> = {
    productivity: '⚡',
    ai: '🤖',
    business: '💼',
    analytics: '📊',
    tools: '🛠️',
    other: '📱'
  };

  // Build filter options dynamically
  const filterOptions: FilterOption[] = useMemo(() => {
    const options: FilterOption[] = [
      {
        id: 'all',
        label: `All Apps`,
        icon: '🎯',
        type: 'all',
        value: 'all',
        count: apps.length
      }
    ];

    // Add category filters - show all categories, even empty ones
    allCategories.forEach((category: string) => {
      const categoryApps = apps.filter(app => (app.category || 'other') === category);
      options.push({
        id: `category-${category}`,
        label: `${category.charAt(0).toUpperCase() + category.slice(1)} Apps`,
        icon: categoryIcons[category] || '📱',
        type: 'category',
        value: category,
        count: categoryApps.length
      });
    });

    // Add auth filters
    const authRequiredApps = apps.filter(app => app.authRequired);
    const noAuthApps = apps.filter(app => !app.authRequired);

    options.push({
      id: 'auth-required',
      label: 'Apps Requiring Login',
      icon: '🔐',
      type: 'auth',
      value: true,
      count: authRequiredApps.length
    });

    options.push({
      id: 'no-auth',
      label: 'Apps Without Login',
      icon: '🔓',
      type: 'auth',
      value: false,
      count: noAuthApps.length
    });

    return options;
  }, [apps, allCategories]);

  // Get current filter option
  const currentFilter = filterOptions.find(option => option.id === selectedFilter) || filterOptions[0];

  // Filter apps based on selected filter
  const filteredApps = useMemo(() => {
    if (currentFilter.type === 'all') {
      return apps;
    } else if (currentFilter.type === 'category') {
      return apps.filter((app) => (app.category || 'other') === currentFilter.value);
    } else if (currentFilter.type === 'auth') {
      return apps.filter((app) => app.authRequired === currentFilter.value);
    }
    return apps;
  }, [apps, currentFilter]);

  // Group filtered apps by category for display
  const groupedApps = useMemo(() => {
    if (currentFilter.type === 'category' && currentFilter.value !== 'all') {
      // If filtering by category, show only that category
      return [{ category: currentFilter.value as string, apps: filteredApps }];
    } else {
      // Group apps by category
      const groups = allCategories.map((category: string) => ({
        category,
        apps: filteredApps.filter(app => (app.category || 'other') === category)
      })).filter((group: any) => group.apps.length > 0);
      return groups;
    }
  }, [filteredApps, allCategories, currentFilter]);

  const handleFilterChange = (filterId: string) => {
    setSelectedFilter(filterId);
  };
  return (
    <div className='py-10 lg:mt-10'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl text-center'>
          <h2 className='mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl'>
            <span className='text-primary'>App</span> Dashboard
          </h2>
          <p className='mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground'>
            Access all your applications in one place
          </p>
        </div>

        {/* Filter Section */}
        <div className='mt-8 mb-8'>
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <div className='flex items-center gap-3'>
              <span className='text-sm font-medium text-muted-foreground'>Filter apps:</span>
              
              <Select value={selectedFilter} onValueChange={handleFilterChange}>
                <SelectTrigger className='w-[280px]'>
                  <SelectValue>
                    <div className='flex items-center gap-2'>
                      <span>{currentFilter.icon}</span>
                      <span>{currentFilter.label}</span>
                      <Badge variant='secondary' className='ml-1'>
                        {currentFilter.count}
                      </Badge>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {/* All Apps Option */}
                  <SelectItem value="all">
                    <div className='flex items-center gap-2 w-full'>
                      <span>🎯</span>
                      <span className='flex-1'>All Apps</span>
                      <Badge variant='outline' className='ml-2'>
                        {apps.length}
                      </Badge>
                    </div>
                  </SelectItem>
                  
                  {/* Category Separator */}
                  <div className='px-2 py-1.5 text-xs font-semibold text-muted-foreground bg-muted/50'>
                    📂 By Category
                  </div>
                  
                  {/* Category Options */}
                  {allCategories.map((category) => {
                    const categoryApps = apps.filter(app => (app.category || 'other') === category);
                    const option = filterOptions.find(opt => opt.id === `category-${category}`);
                    if (!option) return null;
                    
                    return (
                      <SelectItem key={option.id} value={option.id}>
                        <div className='flex items-center gap-2 w-full'>
                          <span>{option.icon}</span>
                          <span className='flex-1'>{option.label}</span>
                          <Badge 
                            variant={categoryApps.length === 0 ? 'secondary' : 'outline'} 
                            className={`ml-2 ${categoryApps.length === 0 ? 'opacity-50' : ''}`}
                          >
                            {option.count}
                          </Badge>
                          {categoryApps.length === 0 && (
                            <span className='text-xs text-muted-foreground ml-1'>(empty)</span>
                          )}
                        </div>
                      </SelectItem>
                    );
                  })}
                  
                  {/* Auth Separator */}
                  <div className='px-2 py-1.5 text-xs font-semibold text-muted-foreground bg-muted/50'>
                    🔐 By Authentication
                  </div>
                  
                  {/* Auth Options */}
                  {filterOptions.filter(option => option.type === 'auth').map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      <div className='flex items-center gap-2 w-full'>
                        <span>{option.icon}</span>
                        <span className='flex-1'>{option.label}</span>
                        <Badge variant='outline' className='ml-2'>
                          {option.count}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filter Button */}
            {selectedFilter !== 'all' && (
              <Button
                variant='outline'
                size='sm'
                onClick={() => handleFilterChange('all')}
                className='h-9'
              >
                Clear Filter
              </Button>
            )}
          </div>

          {/* Active Filter Display */}
          {selectedFilter !== 'all' && (
            <div className='mt-4 text-center'>
              <div className='inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm'>
                <span>{currentFilter.icon}</span>
                <span>Showing: {currentFilter.label.toLowerCase()}</span>
                <span className='font-medium'>({filteredApps.length} result{filteredApps.length !== 1 ? 's' : ''})</span>
              </div>
            </div>
          )}

          {/* Empty Category Help */}
          {selectedFilter !== 'all' && filteredApps.length === 0 && (
            <div className='mt-4 text-center'>
              <div className='inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-200'>
                <span>💡</span>
                <span>
                  No apps in this category yet. Run <code className='bg-blue-100 px-1 rounded'>node src/apps/add-app.cjs</code> to add apps to "{currentFilter.value}"
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Apps Grid */}
        <div className='mt-12'>
          {groupedApps.map(({ category, apps: categoryApps }: any) => (
            <div key={category} className='mb-12'>
              <h3 className='text-2xl font-semibold mb-6 capitalize text-foreground flex items-center gap-2'>
                {category} Apps
                <Badge variant='outline' className='ml-2'>
                  {categoryApps.length}
                </Badge>
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {categoryApps.map((app: any) => (
                  <AppCard key={app.id} app={app} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredApps.length === 0 && (
          <div className='text-center py-12'>
            <div className='text-6xl mb-4'>🔍</div>
            <p className='text-xl text-muted-foreground mb-2'>No apps found</p>
            <p className='text-sm text-muted-foreground mb-4'>
              Try adjusting your filters or add new apps
            </p>
            <Button 
              onClick={() => handleFilterChange('all')}
              variant='outline'
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Empty State for No Apps */}
        {apps.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-xl text-muted-foreground mb-4'>No apps available yet</p>
            <p className='text-sm text-muted-foreground'>
              Add your first app by editing <code>src/apps/app-config.ts</code>
            </p>
          </div>
        )}
      </div>
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
