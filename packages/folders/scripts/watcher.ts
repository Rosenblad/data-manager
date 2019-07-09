import fs from 'fs';

import Log from './helpers/log';
import CreateTaskRunner, { TaskRunner } from './helpers/createTaskRunner';

async function runTasks(taskRunner: TaskRunner) {
  await taskRunner.killAll();
  Log.info('removing lib/ and package');
  await taskRunner.run('rm -rf lib/ data-manager-folders-1.0.0.tgz');
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

  fs.watch('./src/', (event, filename) => {
    Log.info('Detected change:', event, filename);
    runTasks(taskRunner);
  });

  Log.info('Watching files in ./src/');
})();
