import gql from 'graphql-tag'
import { BATCH_DELETE_FRAGMENT } from 'src/graphql/graphqlFragment'

const PLAYER_FRAGMENT = gql`
  fragment PlayerFragment on PlayerModel {
    _id
    title
    artist
    lrc
    coverUrl
    musicFileUrl
    isPublic
    weight
    createdAt
    updatedAt
  }
`

export const CREATE_ONE_PLAYER = gql`
  mutation CreatePlayer($input: CreatePlayerInput!) {
    createPlayer(input: $input) {
      ...PlayerFragment
    }
  }
  ${PLAYER_FRAGMENT}
`

export const UPDATE_ONE_PLAYER = gql`
  mutation UpdatePlayerById($input: UpdatePlayerInput!) {
    updatePlayerById(input: $input) {
      ...PlayerFragment
    }
  }
  ${PLAYER_FRAGMENT}
`

export const EXCHANGE_POSITION = gql`
  mutation ExchangePositionPlayer($input: ExchangePositionInput!) {
    exchangePositionPlayer(input: $input) {
      ...PlayerFragment
    }
  }
  ${PLAYER_FRAGMENT}
`

export const PLAYERS = gql`
  query GetPlayers {
    getPlayers {
      ...PlayerFragment
    }
  }
  ${PLAYER_FRAGMENT}
`

export const DELETE_ONE_PLAYER = gql`
  mutation DeletePlayerById($id: ID!) {
    deletePlayerById(id: $id) {
      ...PlayerFragment
    }
  }
  ${PLAYER_FRAGMENT}
`

export const BATCH_DELETE_PLAYER = gql`
  mutation DeletePlayers($ids: [ID!]!) {
    deletePlayers(ids: $ids) {
      ...BatchDeleteFragment
    }
  }
  ${BATCH_DELETE_FRAGMENT}
`
