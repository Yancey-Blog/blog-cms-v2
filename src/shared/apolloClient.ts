import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import history from './history'
import SnackbarUtils from 'src/components/Toast/Toast'

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

const errorHandler = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    const isUnauthorized = graphQLErrors.find(graphQLError =>
      graphQLError.message.includes('Unauthorized'),
    )

    if (isUnauthorized) {
      SnackbarUtils.error('token 过期了')
      history.replace('/login')
      window.localStorage.removeItem('token')
    }
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  resolvers: {},
  link: authLink.concat(errorHandler).concat(httpLink),
})

export default client
