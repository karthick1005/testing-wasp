const fs = require('fs');
const path = require('path');

// Read the app config dynamically
function readAppConfig() {
  try {
    // Read the JSON file directly
    const appsJson = fs.readFileSync(path.join(__dirname, 'apps.json'), 'utf8');
    const apps = JSON.parse(appsJson);
    return apps.filter(app => app.isActive !== false);
  } catch (error) {
    console.error('Error reading apps.json:', error.message);
    return [];
  }
}

function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function generateAppRoutes(apps) {
  let routes = '';
  
  apps.forEach(app => {
    const routeName = toPascalCase(app.id) + 'Route';
    const pageName = toPascalCase(app.id) + 'Page';
    const componentPath = `@src/apps/${app.id}/${app.component}`;
    
    routes += `route ${routeName} { path: "${app.path}*", to: ${pageName} }\n`;
    routes += `page ${pageName} {\n`;
    
    if (app.authRequired) {
      routes += `  authRequired: true,\n`;
    }
    
    routes += `  component: import ${app.component} from "${componentPath}"\n`;
    routes += `}\n\n`;
  });
  
  return routes;
}

function updateAppConfig(apps) {
  const appConfigPath = path.join(__dirname, 'app-config.ts');
  
  const appConfigContent = `// App configuration interface
export interface AppConfig {
  id: string;
  name: string;
  description: string;
  icon?: string;
  path: string;
  component: string;
  authRequired?: boolean;
  category?: 'productivity' | 'ai' | 'business' | 'analytics' | 'tools' | 'other';
  isActive?: boolean;
   remoteApp?: {
    enabled: boolean;
    configKey?: string;
    remoteUrl?: string;
    remoteName?: string;
    exposedModule?: string;
    fallbackComponent?: string;
    sharedDependencies?: Record<string, any>;
  };
}

// Static app configuration - auto-generated from apps.json
export const APPS: AppConfig[] = ${JSON.stringify(apps, null, 2)};

// Helper functions
export function getActiveApps(): AppConfig[] {
  return APPS.filter(app => app.isActive !== false);
}
export function getAppById(id: string): AppConfig | undefined {
  return APPS.find(app => app.id === id);
}
export function getAppByPath(path: string): AppConfig | undefined {
  return APPS.find(app => app.path === path);
}`;

  fs.writeFileSync(appConfigPath, appConfigContent, 'utf8');
  console.log('📝 Updated app-config.ts');
}

function updateMainWasp() {
  const apps = readAppConfig();
  const generatedRoutes = generateAppRoutes(apps);
  
  // Path to main.wasp (go up two directories from src/apps)
  const mainWaspPath = path.join(__dirname, '../../main.wasp');
  
  try {
    let mainWaspContent = fs.readFileSync(mainWaspPath, 'utf8');
    
    // Find and replace the Apps Dashboard section
    const regionStart = '//#region Apps Dashboard';
    const regionEnd = '//#endregion';
    
    const startIndex = mainWaspContent.indexOf(regionStart);
    const endIndex = mainWaspContent.indexOf(regionEnd, startIndex);
    
    if (startIndex === -1 || endIndex === -1) {
      console.error('Could not find //#region Apps Dashboard section in main.wasp');
      return false;
    }
    
    // Build the new section
    const newSection = `${regionStart}
route AppsRoute { path: "/apps", to: AppsPage }
page AppsPage {
  component: import AppsPage from "@src/apps/AppsPage"
}

${generatedRoutes}${regionEnd}`;
    
    // Replace the section
    const newContent = 
      mainWaspContent.substring(0, startIndex) + 
      newSection + 
      mainWaspContent.substring(endIndex + regionEnd.length);
    
    // Write back to file
    fs.writeFileSync(mainWaspPath, newContent, 'utf8');
    
    console.log('✅ Successfully updated main.wasp with', apps.length, 'apps');
    apps.forEach(app => {
      console.log(`   🔗 ${app.name} → ${app.path} ${app.authRequired ? '🔐' : '🌐'}`);
    });
    
    return true;
  } catch (error) {
    console.error('Error updating main.wasp:', error.message);
    return false;
  }
}

// Main execution
if (require.main === module) {
  console.log('🔄 Auto-updating main.wasp and app-config.ts...');
  console.log('===============================================');
  
  const apps = readAppConfig();
  updateAppConfig(apps);
  
  if (updateMainWasp()) {
    console.log('\n🎉 Files have been automatically updated!');
    console.log('💡 You can now restart your Wasp app to see the changes.');
  } else {
    console.log('\n❌ Failed to update main.wasp');
  }
}

module.exports = { updateMainWasp, readAppConfig, updateAppConfig };
