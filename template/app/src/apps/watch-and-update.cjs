const fs = require('fs');
const path = require('path');
const { updateMainWasp } = require('./auto-update-routes.cjs');

console.log('👁️  Watching apps.json for changes...');
console.log('====================================');
console.log('When you add/modify apps, main.wasp will update automatically!');
console.log('Press Ctrl+C to stop watching.\n');

// Watch for changes in apps.json
const configPath = path.join(__dirname, 'apps.json');

let lastUpdateTime = 0;
const debounceMs = 1000; // Wait 1 second before updating to avoid multiple triggers

fs.watchFile(configPath, (curr, prev) => {
  const now = Date.now();
  
  // Debounce to avoid multiple rapid updates
  if (now - lastUpdateTime < debounceMs) {
    return;
  }
  lastUpdateTime = now;
  
  console.log(`📝 apps.json changed at ${new Date().toLocaleTimeString()}`);
  console.log('🔄 Updating main.wasp...');
  
  // Small delay to ensure file write is complete
  setTimeout(() => {
    if (updateMainWasp()) {
      console.log('✅ main.wasp updated successfully!\n');
    } else {
      console.log('❌ Failed to update main.wasp\n');
    }
  }, 100);
});

// Keep the process running
process.on('SIGINT', () => {
  console.log('\n👋 Stopped watching apps.json');
  process.exit(0);
});
