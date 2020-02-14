const fs = require('fs');

const logger = require('./logger');

function verifyIfIsAFolder(path, callback) {
  fs.lstat(path, (err, stats) => {
    if (err) {
      logger.error(`> Hey, the path: "${path} does not exists!"`);
      console.error(err);
      process.exit(1);
    }

    const isDirectory = stats.isDirectory();

    if (!isDirectory) {
      logger.error(`> Hey, the path: "${path}" is not a folder!`);
      process.exit(1);
    }

    callback();
  });
}

module.exports = verifyIfIsAFolder;
