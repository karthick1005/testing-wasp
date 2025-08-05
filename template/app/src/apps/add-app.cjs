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
    
    // Generate routes in correct Wasp 0.17.0 format
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

function addNewApp() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('🚀 Add New App to OpenSaaS');
  console.log('==========================\n');

  const questions = [
    'App ID (e.g., todo-app): ',
    'App Name (e.g., Todo App): ',
    'Description: ',
    'Icon (emoji): ',
    'Path (e.g., /todo): ',
    'Component name (e.g., TodoApp): ',
    'Requires login? (y/n): ',
    'Category (tools/productivity/ai/business/analytics/other): '
  ];

  let answers = [];
  let currentQuestion = 0;

  function askQuestion() {
    if (currentQuestion < questions.length) {
      rl.question(questions[currentQuestion], (answer) => {
        answers.push(answer.trim());
        currentQuestion++;
        askQuestion();
      });
    } else {
      createApp(answers);
      rl.close();
    }
  }

  function createApp(answers) {
    const [id, name, description, icon, appPath, component, requiresLogin, category] = answers;
    
    const newApp = {
      id: id,
      name: name,
      description: description,
      icon: icon || '📱',
      path: appPath,
      component: component,
      authRequired: requiresLogin.toLowerCase() === 'y' || requiresLogin.toLowerCase() === 'yes',
      category: category || 'other',
      isActive: true
    };

    // Read existing apps
    const appsPath = path.join(__dirname, 'apps.json');
    let apps = [];
    
    try {
      const appsData = fs.readFileSync(appsPath, 'utf8');
      apps = JSON.parse(appsData);
    } catch (error) {
      console.log('Creating new apps.json file...');
    }

    // Add new app
    apps.push(newApp);

    // Write back to file
    fs.writeFileSync(appsPath, JSON.stringify(apps, null, 2), 'utf8');

    console.log('\n✅ App added successfully!');
    
    // Create folder and component file automatically
    const appFolderPath = path.join(__dirname, id);
    const componentFilePath = path.join(appFolderPath, `${component}.tsx`);
    
    try {
      // Create app folder
      if (!fs.existsSync(appFolderPath)) {
        fs.mkdirSync(appFolderPath, { recursive: true });
        console.log(`📁 Created folder: src/apps/${id}/`);
      }
      
      // Create component file
      const componentContent = `import React from 'react';

export default function ${component}() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">${name}</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 mb-4">${description}</p>
          
          {/* Add your app content here */}
          <div className="space-y-4">
            <p>Welcome to ${name}! 🎉</p>
            <p>Start building your app features here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}`;

      fs.writeFileSync(componentFilePath, componentContent, 'utf8');
      console.log(`📄 Created component: src/apps/${id}/${component}.tsx`);
      
    } catch (error) {
      console.log(`⚠️  Warning: Could not create files automatically: ${error.message}`);
      console.log('📁 Manual steps needed:');
      console.log(`   mkdir src/apps/${id}`);
      console.log(`   # Create src/apps/${id}/${component}.tsx manually`);
    }

    console.log('✅ Files will be updated automatically...');

    // Update app-config.ts and main.wasp automatically
    console.log('\n🔄 Updating files...');
    updateAppConfig(apps);
    if (updateMainWasp()) {
      console.log('✅ All files updated successfully!');
      console.log('\n🎉 Your app is ready!');
      console.log(`   📱 Visit: http://localhost:3000${appPath}`);
      console.log(`   🎛️  Dashboard: http://localhost:3000/apps`);
    }
  }

  askQuestion();
}

if (require.main === module) {
  addNewApp();
}

module.exports = { addNewApp };
