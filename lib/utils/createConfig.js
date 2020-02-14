const path = require('path');

function createConfig({
  // the schema, it can be a string or a object with custon config
  schema,
  // the argument passed to the cli. Where graphql-codegen will look for graphql files
  folderPath,
  // the folder where the rag.config.js was found.
  sourceFolder,
  // the path where all schemas will be created
  schemaTypesPath = '',
  watch,
}) {
  const sourceRootFolder = path.join(process.cwd(), sourceFolder);
  const plugins = [
    'typescript',
    {
      'typescript-operations': {
        preResolveTypes: true,
        // dedupeOperationSuffix: true,
        skipTypename: true,
      },
    },
    {
      'typescript-react-apollo': {
        withComponent: false,
        withHOC: false,
        withHooks: true,
        reactApollo: 3,
      },
    },
  ];

  if (typeof schema === 'string') {
    const documents = path.join(sourceFolder, `./**/*.graphql`);

    return {
      schema: schema,
      documents,
      watch,
      generates: {
        [path.join(sourceRootFolder, `./__generated__/index.tsx`)]: {
          plugins,
        },
      },
    };
  } else {
    const graphqlFolderTag = schema.tag ? `/${schema.tag}` : '';
    const grapghFileTag = schema.tag ? `.${schema.tag}` : '';
    const documents = path.join(sourceFolder, `./**/*${grapghFileTag}.graphql`);
    return {
      schema: schema.url,
      documents: [
        documents,
        ...(schema.includes
          ? schema.includes.map(str => path.join(folderPath, str))
          : []),
      ],
      watch,
      generates: {
        [path.join(
          sourceRootFolder,
          schemaTypesPath,
          graphqlFolderTag,
          './types.ts',
        )]: {
          plugins: ['typescript'],
        },
        [sourceRootFolder]: {
          preset: 'near-operation-file',
          presetConfig: {
            extension: '.generated.tsx',
            baseTypesPath: path.join(
              schemaTypesPath,
              graphqlFolderTag,
              './types.ts',
            ),
          },
          plugins,
        },
      },
    };
  }
}

module.exports = createConfig;
