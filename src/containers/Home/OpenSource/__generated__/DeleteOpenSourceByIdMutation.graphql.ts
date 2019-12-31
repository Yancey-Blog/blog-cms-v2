/* tslint:disable */
/* @relayHash 96d40eab9323b186c7699fa7ab8a70aa */

import { ConcreteRequest } from 'relay-runtime'
export type DeleteOpenSourceByIdMutationVariables = {
  input: string
}
export type DeleteOpenSourceByIdMutationResponse = {
  readonly deleteOpenSourceById: {
    readonly _id: string
    readonly title: string
    readonly description: string
    readonly url: string
    readonly posterUrl: string
    readonly createdAt: string
    readonly updatedAt: string
  }
}
export type DeleteOpenSourceByIdMutation = {
  readonly response: DeleteOpenSourceByIdMutationResponse
  readonly variables: DeleteOpenSourceByIdMutationVariables
}

/*
mutation DeleteOpenSourceByIdMutation(
  $input: ID!
) {
  deleteOpenSourceById(id: $input) {
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
        kind: 'LocalArgument',
        name: 'input',
        type: 'ID!',
        defaultValue: null,
      },
    ],
    v1 = [
      {
        kind: 'LinkedField',
        alias: null,
        name: 'deleteOpenSourceById',
        storageKey: null,
        args: [
          {
            kind: 'Variable',
            name: 'id',
            variableName: 'input',
          },
        ],
        concreteType: 'OpenSourceModel',
        plural: false,
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
      name: 'DeleteOpenSourceByIdMutation',
      type: 'Mutation',
      metadata: null,
      argumentDefinitions: v0 /*: any*/,
      selections: v1 /*: any*/,
    },
    operation: {
      kind: 'Operation',
      name: 'DeleteOpenSourceByIdMutation',
      argumentDefinitions: v0 /*: any*/,
      selections: v1 /*: any*/,
    },
    params: {
      operationKind: 'mutation',
      name: 'DeleteOpenSourceByIdMutation',
      id: null,
      text:
        'mutation DeleteOpenSourceByIdMutation(\n  $input: ID!\n) {\n  deleteOpenSourceById(id: $input) {\n    _id\n    title\n    description\n    url\n    posterUrl\n    createdAt\n    updatedAt\n  }\n}\n',
      metadata: {},
    },
  }
})()
;(node as any).hash = '172c1ee2b924b6381804015c8736e2da'
export default node
