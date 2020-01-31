import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
// import history from './history'

const token = window.localStorage.getItem('token')

const client = new ApolloClient({
  cache: new InMemoryCache(),
  resolvers: {},
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        // if (typeof graphQLErrors[0].message === 'object') {
        //   history.push('/login')
        // }
      }
      if (networkError) {
      }
    }),
    new HttpLink({
      uri: process.env.REACT_APP_GRAPHQL_URL,
      headers: token && {
        authorization: `Bearer ${token}`,
      },
    }),
  ]),
})

export default client
