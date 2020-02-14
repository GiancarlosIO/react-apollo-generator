const fs = require('fs');
const path = require('path');

const logger = require('./logger');

function findRagConfig(folderPath, callback) {
  const configFileName = 'rag.config.js';

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      callback(err, null);
    }

    if (files.includes('node_modules')) {
      if (files.includes(configFileName)) {
        const configFilePath = path.join(folderPath, configFileName);
        return callback(null, configFilePath, folderPath);
      } else {
        logger.error(
          `> We are looking in the root of your project and we can't find a ${configFileName}. Are you sure it exists?`,
        );
        callback(new Error("Can't find the config file."), null);
      }
    } else if (files.includes(configFileName)) {
      const configFilePath = path.join(folderPath, configFileName);
      return callback(null, configFilePath, folderPath);
    } else {
      findRagConfig(path.resolve(folderPath, '../'), callback);
    }
  });
}

module.exports = findRagConfig;
