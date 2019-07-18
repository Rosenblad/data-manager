import chalk from 'chalk';

type Message = any[];

function getTime() {
  return new Date().toLocaleTimeString();
}

function parseMessage(args: Message): string {
  let message = '';

  args.forEach(arg => {
    switch (typeof arg) {
      case 'string':
        message = message.concat(' ', arg);
        break;
      case 'object':
        message = message.concat(' ', JSON.stringify(arg, null, '  '));
        break;
      default:
        message = message.concat(' ', String(arg));
    }
  });

  return message.trim();
}

export default function Log(...args: Message): void {
  const time = getTime();
  const message = parseMessage(args);
  console.log(`[${time}] ${message}`);
}

Log.info = (...args: Message) => {
  const message = chalk.cyan('Info:', parseMessage(args));
  Log(message);
}

Log.success = (...args: Message) => {
  const message = chalk.green('Success:', parseMessage(args));
  Log(message);
}

Log.error = (...args: Message) => {
  const message = chalk.red('Error:', parseMessage(args));
  Log(message);
}
