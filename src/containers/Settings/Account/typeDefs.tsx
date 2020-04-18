import gql from 'graphql-tag'

export const UPDATE_USERNAME = gql`
  mutation UpdateUserName($username: String!) {
    updateUserName(username: $username) {
      _id
      username
    }
  }
`

export const UPDATE_EMAIL = gql`
  mutation UpdateEmail($email: String!) {
    updateEmail(email: $email) {
      _id
      email
    }
  }
`

export const DELETE_ACCOUNT = gql`
  mutation DeleteAccount {
    deleteAccount {
      _id
    }
  }
`
