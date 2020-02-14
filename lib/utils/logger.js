const chalk = require('chalk');

const log = console.log;

const logger = {
  error: message => log(chalk.red(message)),
  warn: message => log(chalk.yellow(message)),
  success: message => log(chalk.green(message)),
  info: message => log(chalk.blue(message)),
};

module.exports = logger;
