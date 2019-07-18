import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

import Log from './log';
import { FailOnError } from './fail';

export interface TaskRunner {
  run(command: string): void;
  killAll(): void;
}

export default function CreateTaskRunner(): TaskRunner {
  const tasks = new Map<number, ChildProcessWithoutNullStreams>();

  function printOutput(task: ChildProcessWithoutNullStreams) {
    task.stdout.on('data', (chunk) => {
      process.stdout.write(chunk);
    });

    task.stdout.on('error', (err) => {
      Log.error(err.message);
    });

    task.stderr.on('data', (chunk) => {
      process.stdout.write(chunk);
    });

    task.stderr.on('error', (err) => {
      Log.error(err.message);
    });
  }

  function waitForDone(task: ChildProcessWithoutNullStreams, cb: () => void) {
    task.on('close', () => {
      tasks.delete(task.pid);
      cb();
    });
  }

  function parseCommand(command: string) {
    const args = command.split(' ');
    const firstArg = args.shift();

    if (!firstArg) {
      throw new Error(`Invalid command: ${command}`);
    }

    return {
      firstArg,
      args,
    }
  }

  function run(command: string) {
    return new Promise((resolve) => {
      try {
        const { firstArg, args } = parseCommand(command);

        const task = spawn(firstArg, args);
        tasks.set(task.pid, task);
        printOutput(task);
        waitForDone(task, resolve);
      } catch (error) {
        FailOnError(error);
      }
    });
  }

  function killTask(task: ChildProcessWithoutNullStreams) {
    return new Promise((resolve) => {
      Log('Killing task with pid:', task.pid);
      task.kill();
      waitForDone(task, resolve);
    });
  }

  async function killAll(): Promise<void> {
    if (tasks.size === 0) return;

    for (let task of tasks.values()) {
      await killTask(task);
    }
  }

  return { run, killAll };
}
