import gql from 'graphql-tag'
import { BATCH_DELETE_FRAGMENT } from 'src/shared/graphqlFragment'

const BEST_ALBUM_FRAGMENT = gql`
  fragment BestAlbumFragment on BestAlbumModel {
    _id
    title
    artist
    coverUrl
    mvUrl
    releaseDate
    createdAt
    updatedAt
  }
`

export const CREATE_ONE_BEST_ALBUM = gql`
  mutation CreateBestAlbum($input: CreateBestAlbumInput!) {
    createBestAlbum(input: $input) {
      ...BestAlbumFragment
    }
  }
  ${BEST_ALBUM_FRAGMENT}
`

export const UPDATE_ONE_BEST_ALBUM = gql`
  mutation UpdateBestAlbumById($input: UpdateBestAlbumInput!) {
    updateBestAlbumById(input: $input) {
      ...BestAlbumFragment
    }
  }
  ${BEST_ALBUM_FRAGMENT}
`

export const BEST_ALBUMS = gql`
  query GetBestAlbums {
    getBestAlbums {
      ...BestAlbumFragment
    }
  }
  ${BEST_ALBUM_FRAGMENT}
`

export const DELETE_ONE_BEST_ALBUM = gql`
  mutation DeleteBestAlbumById($id: ID!) {
    deleteBestAlbumById(id: $id) {
      ...BestAlbumFragment
    }
  }
  ${BEST_ALBUM_FRAGMENT}
`

export const BATCH_DELETE_BEST_ALBUMS = gql`
  mutation DeleteBestAlbums($ids: [ID!]!) {
    deleteBestAlbums(ids: $ids) {
      ...BatchDeleteFragment
    }
  }
  ${BATCH_DELETE_FRAGMENT}
`
