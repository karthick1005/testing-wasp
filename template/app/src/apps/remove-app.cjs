const fs = require('fs');
const path = require('path');

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
}

// Static app configuration - auto-generated from apps.json
export const APPS: AppConfig[] = ${JSON.stringify(apps, null, 2)};

// Helper functions
export function getActiveApps(): AppConfig[] {
  return APPS.filter(app => app.isActive !== false);
}

export function getAppByPath(path: string): AppConfig | undefined {
  return APPS.find(app => app.path === path);
}`;

  fs.writeFileSync(appConfigPath, appConfigContent, 'utf8');
  console.log('📝 Updated app-config.ts');
}

function updateMainWasp() {
  try {
    const appsPath = path.join(__dirname, 'apps.json');
    const mainWaspPath = path.join(__dirname, '../../main.wasp');
    
    let apps = [];
    try {
      const appsData = fs.readFileSync(appsPath, 'utf8');
      apps = JSON.parse(appsData);
    } catch (error) {
      console.log('No apps.json found, using empty array');
      return false;
    }

    // Read main.wasp
    const mainWaspContent = fs.readFileSync(mainWaspPath, 'utf8');
    
    // Generate routes
    const routes = apps.map(app => {
      const routeName = toPascalCase(app.id) + 'Route';
      const pageName = toPascalCase(app.id) + 'Page';
      const componentPath = `@src/apps/${app.id}/${app.component}`;
      
      let routeCode = `route ${routeName} { path: "${app.path}", to: ${pageName} }\n`;
      routeCode += `page ${pageName} {\n`;
      
      if (app.authRequired) {
        routeCode += `  authRequired: true,\n`;
      }
      
      routeCode += `  component: import ${app.component} from "${componentPath}"\n`;
      routeCode += `}\n`;
      
      return routeCode;
    }).join('\n');

    // Find and replace the Apps Dashboard section
    const startMarker = '//#region Apps Dashboard';
    const endMarker = '//#endregion';
    
    const startIndex = mainWaspContent.indexOf(startMarker);
    const endIndex = mainWaspContent.indexOf(endMarker, startIndex);
    
    if (startIndex === -1 || endIndex === -1) {
      console.error('Could not find Apps Dashboard section in main.wasp');
      return false;
    }

    const appsPageRoute = `route AppsRoute { path: "/apps", to: AppsPage }
page AppsPage {
  component: import AppsPage from "@src/apps/AppsPage"
}

`;

    const newSection = `${startMarker}
${appsPageRoute}${routes}
${endMarker}`;

    const beforeSection = mainWaspContent.substring(0, startIndex);
    const afterSection = mainWaspContent.substring(endIndex + endMarker.length);

    const newContent = beforeSection + newSection + afterSection;
    
    fs.writeFileSync(mainWaspPath, newContent, 'utf8');
    
    console.log(`✅ Successfully updated main.wasp with ${apps.length} apps`);
    apps.forEach(app => {
      const authIcon = app.authRequired ? '🔐' : '🌐';
      console.log(`🔗 ${app.name} → ${app.path} ${authIcon}`);
    });
    console.log('🎉 main.wasp has been automatically updated!');
    
    return true;
  } catch (error) {
    console.error('❌ Error updating main.wasp:', error.message);
    return false;
  }
}

function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function removeApp() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('🗑️  Remove App from OpenSaaS');
  console.log('============================\n');

  // Read existing apps
  const appsPath = path.join(__dirname, 'apps.json');
  let apps = [];
  
  try {
    const appsData = fs.readFileSync(appsPath, 'utf8');
    apps = JSON.parse(appsData);
  } catch (error) {
    console.log('❌ No apps.json found or invalid format');
    rl.close();
    return;
  }

  if (apps.length === 0) {
    console.log('ℹ️  No apps found to remove');
    rl.close();
    return;
  }

  console.log('📋 Available apps:');
  apps.forEach((app, index) => {
    console.log(`${index + 1}. ${app.name} (${app.id}) → ${app.path}`);
  });

  rl.question('\n🎯 Enter the number or ID of the app to remove: ', (input) => {
    let appToRemove = null;
    let appIndex = -1;

    // Check if input is a number (index)
    const inputNum = parseInt(input.trim());
    if (!isNaN(inputNum) && inputNum >= 1 && inputNum <= apps.length) {
      appIndex = inputNum - 1;
      appToRemove = apps[appIndex];
    } else {
      // Check if input is an app ID
      appIndex = apps.findIndex(app => app.id === input.trim());
      if (appIndex !== -1) {
        appToRemove = apps[appIndex];
      }
    }

    if (!appToRemove) {
      console.log('❌ Invalid selection. App not found.');
      rl.close();
      return;
    }

    console.log(`\n⚠️  About to remove: ${appToRemove.name} (${appToRemove.id})`);
    console.log(`📁 Component folder: src/apps/${appToRemove.id}/`);
    
    rl.question('\n❓ Are you sure? (y/N): ', (confirm) => {
      if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
        // Remove from apps array
        apps.splice(appIndex, 1);

        // Write back to file
        fs.writeFileSync(appsPath, JSON.stringify(apps, null, 2), 'utf8');

        console.log('\n✅ App removed from configuration!');
        
        // Remove folder and files automatically
        const appFolderPath = path.join(__dirname, appToRemove.id);
        
        try {
          if (fs.existsSync(appFolderPath)) {
            // Remove the entire folder and its contents
            fs.rmSync(appFolderPath, { recursive: true, force: true });
            console.log(`🗑️  Deleted folder: src/apps/${appToRemove.id}/`);
          } else {
            console.log(`ℹ️  Folder src/apps/${appToRemove.id}/ was already missing`);
          }
        } catch (error) {
          console.log(`⚠️  Warning: Could not delete folder automatically: ${error.message}`);
          console.log(`📁 Manual cleanup needed: rm -rf src/apps/${appToRemove.id}`);
        }

        // Update app-config.ts and main.wasp automatically
        console.log('\n🔄 Updating files...');
        updateAppConfig(apps);
        if (updateMainWasp()) {
          console.log('✅ All files updated successfully!');
          console.log('\n🎉 App removal complete!');
          console.log('💡 Restart your Wasp app to see changes: wasp start');
        }
      } else {
        console.log('❌ Removal cancelled.');
      }
      rl.close();
    });
  });
}

if (require.main === module) {
  removeApp();
}

module.exports = { removeApp, updateAppConfig, updateMainWasp };
