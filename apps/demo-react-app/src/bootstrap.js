console.log('Bootstrap.js loading...');
import('./standalone_simple.js').then(() => {
  console.log('Standalone_simple.js imported successfully');
}).catch(error => {
  console.error('Failed to import standalone_simple.js:', error);
});
