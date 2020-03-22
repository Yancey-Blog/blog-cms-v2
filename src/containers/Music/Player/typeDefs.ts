import gql from 'graphql-tag'

export const CREATE_ONE_PLAYER = gql`
  mutation CreatePlayer($input: CreatePlayerInput!) {
    createPlayer(input: $input) {
      _id
      title
      artist
      lrc
      coverUrl
      musicFileUrl
      isPublic
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_ONE_PLAYER = gql`
  mutation UpdatePlayerById($input: UpdatePlayerInput!) {
    updatePlayerById(input: $input) {
      _id
      title
      artist
      lrc
      coverUrl
      musicFileUrl
      isPublic
      createdAt
      updatedAt
    }
  }
`

export const PLAYERS = gql`
  query GetPlayers {
    getPlayers {
      _id
      title
      artist
      lrc
      coverUrl
      musicFileUrl
      isPublic
      createdAt
      updatedAt
    }
  }
`

export const DELETE_ONE_PLAYER = gql`
  mutation DeletePlayerById($id: ID!) {
    deletePlayerById(id: $id) {
      _id
      title
      artist
      lrc
      coverUrl
      musicFileUrl
      isPublic
      createdAt
      updatedAt
    }
  }
`

export const BATCH_DELETE_PLAYER = gql`
  mutation DeletePlayers($ids: [ID!]!) {
    deletePlayers(ids: $ids) {
      n
      ok
      deletedCount
      ids
    }
  }
`
