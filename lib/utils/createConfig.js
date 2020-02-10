const path = require('path');

function createConfig({
  // the schema, it can be a string or a object with custon config
  schema,
  // the argument passed to the cli. Where graphql-codegen will look for graphql files
  folderPath,
  // the folder where the rag.config.js was found.
  sourceFolder,
  watch,
}) {
  const sourceRootFolder = path.join(process.cwd(), sourceFolder);

  if (typeof schema === 'string') {
    const documents = path.join(sourceFolder, `./**/*.graphql`);

    return {
      schema: schema,
      documents,
      watch,
      generates: {
        [path.join(sourceRootFolder, `./__generated__/modules.d.ts`)]: {
          plugins: ['typescript-graphql-files-modules'],
        },
        [path.join(sourceRootFolder, `./__generated__/index.tsx`)]: {
          skipGraphQLImport: true,
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
          `./__generated__/${graphqlFolderTag}/modules.d.ts`,
        )]: {
          plugins: ['typescript-graphql-files-modules'],
        },
        [path.join(
          sourceRootFolder,
          `./__generated__/${graphqlFolderTag}/index.tsx`,
        )]: {
          skipGraphQLImport: true,
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
    };
  }
}

module.exports = createConfig;
