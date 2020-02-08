const path = require('path');

const minimist = require('minimist');
const { generate } = require('@graphql-codegen/cli');

const logger = require('./utils/logger');
const verifyIfIsAFolder = require('./utils/verifyIfIsAFolder');
const findRagConfig = require('./utils/findRagConfig');

const argvs = minimist(process.argv.slice(2), {
  alias: {
    watch: 'w',
  },
});

const sourceFolder = argvs._[0];

const source = path.join(process.cwd(), sourceFolder);

verifyIfIsAFolder(source, () => {
  findRagConfig(source, (err, configFilePath) => {
    if (err) {
      logger.error('> Error to find the config file: "rag.config.js"');
      console.error(err);
      process.exit(1);
    }

    const schemaUrl = require(configFilePath).schema;
    const documents = path.join(sourceFolder, './**/*.graphql');

    generate(
      {
        schema: schemaUrl,
        documents,
        watch: Boolean(argvs.watch),
        generates: {
          [path.join(source, './generated/index.tsx')]: {
            plugins: [
              'typescript',
              'typescript-operations',
              'typescript-react-apollo',
            ],
            config: {
              withComponent: false,
              withHOC: false,
              withHooks: true,
              reactApollo: 3,
              skipTypename: true,
            },
          },
        },
      },
      true,
    )
      .then(() => {})
      .catch(() => {
        logger.error(
          '> graphql-codegen error: Looks like the schema url used in rag.config.js is invalid :(',
        );
        // console.error(error);
      });
  });
});