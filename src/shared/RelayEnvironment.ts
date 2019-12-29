import { Environment, Network, RecordSource, Store, Variables } from 'relay-runtime'

interface Operation {
  [index: string]: any
}

async function fetchQuery(operation: Operation, variables: Variables) {
  const response = await fetch('http://localhost:3002/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  })
  return response.json()
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
})

export default environment
