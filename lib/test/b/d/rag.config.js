module.exports = {
  schema: [
    {
      url: 'https://countries.trevorblades.com/',
      tag: 'cont',
      includes: ['../../c/continentFragment.graphql'],
      schemaTypesPath: '../../graphql-schemas/',
    },
    {
      url: 'https://graphql.anilist.co/',
      tag: 'anilist',
      schemaTypesPath: '../../graphql-schemas/',
    },
  ],
};

// module.exports = {
//   schema: [
//     {
//       url: 'https://graphql.anilist.co/',
//       tag: 'anilist',
//       schemaTypesPath: '../../',
//     },
//   ],
// };
