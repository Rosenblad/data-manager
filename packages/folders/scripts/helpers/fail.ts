import Log from './log';

export function FailOnError(error: Error): void {
  Log.error(error.message);
  process.exit(1);
}
