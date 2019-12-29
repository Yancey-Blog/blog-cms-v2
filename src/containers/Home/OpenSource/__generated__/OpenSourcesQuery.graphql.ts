/* tslint:disable */
/* @relayHash e00f6c75e806e3708d446450014ac5e4 */

import { ConcreteRequest } from 'relay-runtime'
export type OpenSourcesQueryVariables = {}
export type OpenSourcesQueryResponse = {
  readonly getOpenSources: ReadonlyArray<{
    readonly _id: string
    readonly title: string
    readonly description: string
    readonly url: string
    readonly posterUrl: string
    readonly createdAt: string
    readonly updatedAt: string
  }>
}
export type OpenSourcesQuery = {
  readonly response: OpenSourcesQueryResponse
  readonly variables: OpenSourcesQueryVariables
}

/*
query OpenSourcesQuery {
  getOpenSources {
    _id
    title
    description
    url
    posterUrl
    createdAt
    updatedAt
  }
}
*/

const node: ConcreteRequest = (function() {
  var v0 = [
    {
      kind: 'LinkedField',
      alias: null,
      name: 'getOpenSources',
      storageKey: null,
      args: null,
      concreteType: 'OpenSourceModel',
      plural: true,
      selections: [
        {
          kind: 'ScalarField',
          alias: null,
          name: '_id',
          args: null,
          storageKey: null,
        },
        {
          kind: 'ScalarField',
          alias: null,
          name: 'title',
          args: null,
          storageKey: null,
        },
        {
          kind: 'ScalarField',
          alias: null,
          name: 'description',
          args: null,
          storageKey: null,
        },
        {
          kind: 'ScalarField',
          alias: null,
          name: 'url',
          args: null,
          storageKey: null,
        },
        {
          kind: 'ScalarField',
          alias: null,
          name: 'posterUrl',
          args: null,
          storageKey: null,
        },
        {
          kind: 'ScalarField',
          alias: null,
          name: 'createdAt',
          args: null,
          storageKey: null,
        },
        {
          kind: 'ScalarField',
          alias: null,
          name: 'updatedAt',
          args: null,
          storageKey: null,
        },
      ],
    },
  ]
  return {
    kind: 'Request',
    fragment: {
      kind: 'Fragment',
      name: 'OpenSourcesQuery',
      type: 'Query',
      metadata: null,
      argumentDefinitions: [],
      selections: v0 /*: any*/,
    },
    operation: {
      kind: 'Operation',
      name: 'OpenSourcesQuery',
      argumentDefinitions: [],
      selections: v0 /*: any*/,
    },
    params: {
      operationKind: 'query',
      name: 'OpenSourcesQuery',
      id: null,
      text:
        'query OpenSourcesQuery {\n  getOpenSources {\n    _id\n    title\n    description\n    url\n    posterUrl\n    createdAt\n    updatedAt\n  }\n}\n',
      metadata: {},
    },
  }
})()
;(node as any).hash = 'f7ef2b1ce857629b565dd3a66ad3542d'
export default node
