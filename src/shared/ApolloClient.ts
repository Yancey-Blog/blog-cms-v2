import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'

const token = window.localStorage.getItem('token')

const client = new ApolloClient({
  cache: new InMemoryCache(),
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
      uri: process.env.REACT_APP_GRAPHQL_URL,
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    }),
  ]),
})

export default client
