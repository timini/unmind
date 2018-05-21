// setup env vars before doing anything else!
import './env';
import { initServer } from './server';
import { createTables, testConnection } from './db';

if (process.env.NODE_ENV === 'development')
  console.warn('running in development mode!');

const sleep = ms => new Promise(res => setTimeout(res, ms));

const waitForConnection = () =>
  new Promise(async (resolve, reject) => {
    let serverStartAttempts = 0;
    const maxAttempts = 100;
    let connected = false;

    while (!connected && serverStartAttempts < maxAttempts) {
      serverStartAttempts = serverStartAttempts + 1;
      try {
        await testConnection();
        connected = true;
      } catch (err) {
        console.error(err);
        console.error('error connecting to database, waiting to retry...');
        await sleep(1000);
      }
    }

    if (connected) {
      console.log('Connected to database, starting server...');
      resolve();
    } else {
      console.error('Too many connection failures, stopping..');
      reject();
    }
  });

waitForConnection()
  .then(createTables)
  .then(initServer);

// log unhandled promise rejections to the console
process.on('unhandledRejection', error => {
  console.error('unhandledRejection:', error);
  process.exit(1);
});
