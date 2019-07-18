#!/usr/bin/env node

import fs from 'fs';
import { resolve } from 'path';

import Log from './helpers/log';
import CreateTaskRunner, { TaskRunner } from './helpers/createTaskRunner';

const args = process.argv.slice(2);

const config = {
  path: resolve(process.cwd(), args[0]),
  cleanupScript: args[1],
};

console.log(config);

async function runTasks(taskRunner: TaskRunner) {
  await taskRunner.killAll();
  Log.info('cleaning');
  await taskRunner.run(`npm run ${config.cleanupScript}`);
  Log.success('cleaning done');
  Log.info('transpiling code');
  await taskRunner.run('npx tsc --declaration');
  Log.success('transpilation done');
  Log.info('building package');
  await taskRunner.run('npm pack');
  Log.success('package built');
}

(function main() {
  const taskRunner = CreateTaskRunner();

  fs.watch(config.path, (event, filename) => {
    Log.info('Detected change:', event, filename);
    runTasks(taskRunner);
  });

  Log.info('Watching files in', config.path);
})();
