import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import SnackbarUtils from 'src/components/Toast/Toast'
import history from './history'

const httpLink = new BatchHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(err => {
      SnackbarUtils.error(err.message)

      if (err.extensions && err.extensions.code === 'UNAUTHENTICATED') {
        history.replace('/login')
        window.localStorage.removeItem('token')
      }
    })
  }

  if (networkError) {
    SnackbarUtils.error(networkError.message)
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  resolvers: {},
  link: errorLink.concat(authLink).concat(httpLink),
})

export default client
