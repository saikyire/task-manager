const { spawn } = require('child_process');
const path = require('path');

const startBackend = () => {
  const backend = spawn('node', ['server.js'], {
    cwd: path.join(__dirname, 'backend'),
    stdio: 'inherit',
    shell: true
  });

  backend.on('error', (err) => {
    console.error('Failed to start backend:', err);
  });
};

const startFrontend = () => {
  const frontend = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, 'frontend'),
    stdio: 'inherit',
    shell: true
  });

  frontend.on('error', (err) => {
    console.error('Failed to start frontend:', err);
  });
};

console.log('Starting Task Manager Application...');
startBackend();
startFrontend();
