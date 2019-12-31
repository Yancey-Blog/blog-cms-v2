import { graphql, commitMutation, Environment } from 'react-relay'

const mutation = graphql`
  mutation DeleteOpenSourceByIdMutation($input: ID!) {
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
`

function commit(environment: Environment, id: string) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: id,
    },
    configs: [
      {
        type: 'NODE_DELETE',
        deletedIDFieldName: '_id',
      },
    ],
  })
}

export default { commit }
