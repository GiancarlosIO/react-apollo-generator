const path = require('path');

const minimist = require('minimist');
const { generate } = require('@graphql-codegen/cli');

const logger = require('./utils/logger');
const verifyIfIsAFolder = require('./utils/verifyIfIsAFolder');
const findRagConfig = require('./utils/findRagConfig');
const createConfig = require('./utils/createConfig');
// TODO: Add help command
// Running version 1.1.7.

// Usage:

//   nvm arch                     : Show if node is running in 32 or 64 bit mode.
//   nvm install <version> [arch] : The version can be a node.js version or "latest" for the latest stable version.

const argvs = minimist(process.argv.slice(2), {
  alias: {
    watch: 'w',
  },
});

const sourceFolder = argvs._[0];
const source = path.join(process.cwd(), sourceFolder);
const isWatchEnabled = Boolean(argvs.watch);

verifyIfIsAFolder(source, () => {
  findRagConfig(source, (err, configFilePath, folderPath) => {
    if (err) {
      logger.error('> Error to find the config file: "rag.config.js"');
      console.error(err);
      process.exit(1);
    }

    const config = require(configFilePath);

    if (Array.isArray(config.schema)) {
      logger.info(
        '> Oh, looks like you are passing an array in the schema config field. We will iterate over it and generate react hooks using the url and tag of each schema.',
      );
      config.schema.forEach(schemaItem => {
        const grapghFileTag = schemaItem.tag ? `.${schemaItem.tag}` : '';

        logger.info(
          `> Using ${schemaItem.url} to generate types for all the **/*${grapghFileTag}.graphql files.`,
        );

        generate(
          createConfig({
            schema: schemaItem,
            folderPath,
            sourceFolder,
            watch: isWatchEnabled,
            schemaTypesPath: schemaItem.schemaTypesPath,
          }),
          true,
        )
          .then(() => {
            logger.success(
              `> Success to generate react hooks for the schema: ${schemaItem.url}.\nThe files used was: **/*${grapghFileTag}.graphql files.`,
            );
          })
          .catch(() => {
            logger.error(
              `> graphql-codegen error: Error to generate the react hooks for the ${schemaItem.url}`,
            );
          });
      });
    } else {
      logger.info(
        `> rag.config.js detected, using ${config.schema} to fetch graphql schema`,
      );

      generate(
        createConfig({
          schema: config.schema,
          folderPath,
          sourceFolder,
          watch: isWatchEnabled,
        }),
        true,
      )
        .then(() => {})
        .catch(() => {
          logger.error(
            '> graphql-codegen error: Looks like the schema url used in rag.config.js is invalid :(',
          );
          // console.error(error);
        });
    }
  });
});
