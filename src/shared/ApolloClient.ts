import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'

// https://www.apollographql.com/docs/react/migrating/boost-migration/#gatsby-focus-wrapper

// @ts-ignore
const cache = new InMemoryCache()

// cache.writeData({
//   data: {
//     getOpenSources: [],
//     networkStatus: {
//       __typename: 'NetworkStatus',
//       isConnected: false,
//     },
//   },
// })

const client = new ApolloClient({
  cache,
  resolvers: {},
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        // 统一的 GraphQL 请求错误处理
      }
      if (networkError) {
        // 网络错误
      }
    }),
    new HttpLink({
      uri: 'http://localhost:3002/graphql',
    }),
  ]),
})

export default client
