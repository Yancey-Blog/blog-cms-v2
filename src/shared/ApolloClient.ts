import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:3002/graphql',
})

export default client
