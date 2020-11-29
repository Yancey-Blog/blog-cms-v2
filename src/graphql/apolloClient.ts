import { ApolloClient, InMemoryCache } from '@apollo/client'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist'
import SnackbarUtils from 'src/components/Toast/Toast'
import { logout } from 'src/shared/utils'

interface CustomGraphQLError {
  timestamp: string
  code: string
  message: string
}

const isEnvProduction = process.env.NODE_ENV

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
    graphQLErrors.forEach((graphQLError) => {
      SnackbarUtils.error(`[GraphQL error]: ${graphQLError.message}`)

      // In production environment, the error structure
      // was formatted as `CustomGraphQLError`.
      if (
        isEnvProduction &&
        ((graphQLError as unknown) as CustomGraphQLError).code ===
          'UNAUTHENTICATED'
      ) {
        logout()
      }

      // In non-production environment, the error structure
      // uses the native `GraphQLError`.
      if (
        graphQLError.extensions &&
        graphQLError.extensions.code === 'UNAUTHENTICATED'
      ) {
        logout()
      }
    })
  }

  if (networkError) {
    SnackbarUtils.error(`[Network error]: ${networkError.message}`)
  }
})

const cache = new InMemoryCache()

async function handlePersistCache() {
  await persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
  })
}
handlePersistCache()

const client = new ApolloClient({
  cache,
  resolvers: {},
  link: errorLink.concat(authLink).concat(httpLink),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
})

export default client
