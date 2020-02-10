module.exports = {
  plugin: (schema, documents, config, info) => {
    console.log(documents);
    return {
      prepend: 'hi',
      content: 'hello',
    };
  },
};
