import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Continent = {
  code?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  countries?: Maybe<Array<Maybe<Country>>>,
};

export type Country = {
  code?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  native?: Maybe<Scalars['String']>,
  phone?: Maybe<Scalars['String']>,
  continent?: Maybe<Continent>,
  currency?: Maybe<Scalars['String']>,
  languages?: Maybe<Array<Maybe<Language>>>,
  emoji?: Maybe<Scalars['String']>,
  emojiU?: Maybe<Scalars['String']>,
  states?: Maybe<Array<Maybe<State>>>,
};

export type Language = {
  code?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  native?: Maybe<Scalars['String']>,
  rtl?: Maybe<Scalars['Int']>,
};

export type Query = {
  continents?: Maybe<Array<Maybe<Continent>>>,
  continent?: Maybe<Continent>,
  countries?: Maybe<Array<Maybe<Country>>>,
  country?: Maybe<Country>,
  languages?: Maybe<Array<Maybe<Language>>>,
  language?: Maybe<Language>,
};


export type QueryContinentArgs = {
  code?: Maybe<Scalars['String']>
};


export type QueryCountryArgs = {
  code?: Maybe<Scalars['String']>
};


export type QueryLanguageArgs = {
  code?: Maybe<Scalars['String']>
};

export type State = {
  code?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  country?: Maybe<Country>,
};

export type ContinentsQueryVariables = {};


export type ContinentsQuery = { continents: Maybe<Array<Maybe<(
    Pick<Continent, 'code' | 'name'>
    & { countries: Maybe<Array<Maybe<Pick<Country, 'code' | 'name'>>>> }
  )>>> };


export const ContinentsDocument = gql`
    query continents {
  continents {
    code
    name
    countries {
      code
      name
    }
  }
}
    `;

/**
 * __useContinentsQuery__
 *
 * To run a query within a React component, call `useContinentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useContinentsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContinentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useContinentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ContinentsQuery, ContinentsQueryVariables>) {
        return ApolloReactHooks.useQuery<ContinentsQuery, ContinentsQueryVariables>(ContinentsDocument, baseOptions);
      }
export function useContinentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ContinentsQuery, ContinentsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ContinentsQuery, ContinentsQueryVariables>(ContinentsDocument, baseOptions);
        }
export type ContinentsQueryHookResult = ReturnType<typeof useContinentsQuery>;
export type ContinentsLazyQueryHookResult = ReturnType<typeof useContinentsLazyQuery>;
export type ContinentsQueryResult = ApolloReactCommon.QueryResult<ContinentsQuery, ContinentsQueryVariables>;