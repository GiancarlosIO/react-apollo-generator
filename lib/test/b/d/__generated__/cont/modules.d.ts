
declare module '*/continents.cont.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const continents: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/continentFragment.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const ContinentFragment: DocumentNode;

  export default defaultDocument;
}
    