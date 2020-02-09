
declare module '*/continents.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const continents: DocumentNode;

  export default defaultDocument;
}