import { gql } from '@apollo/client'
import { USER_FRAGMENT } from '../Login/typeDefs'

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`
