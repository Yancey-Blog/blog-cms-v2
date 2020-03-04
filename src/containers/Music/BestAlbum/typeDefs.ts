import gql from 'graphql-tag'

export const CREATE_ONE_BEST_ALBUM = gql`
  mutation CreateBestAlbum($input: CreateBestAlbumInput!) {
    createBestAlbum(input: $input) {
      _id
      title
      artist
      coverUrl
      mvUrl
      releaseDate
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_ONE_BEST_ALBUM = gql`
  mutation UpdateBestAlbumById($input: UpdateBestAlbumInput!) {
    updateBestAlbumById(input: $input) {
      _id
      title
      artist
      coverUrl
      mvUrl
      releaseDate
      createdAt
      updatedAt
    }
  }
`

export const BEST_ALBUMS = gql`
  query GetBestAlbums {
    getBestAlbums {
      _id
      title
      artist
      coverUrl
      mvUrl
      releaseDate
      createdAt
      updatedAt
    }
  }
`

export const DELETE_ONE_BEST_ALBUM = gql`
  mutation DeleteBestAlbumById($id: ID!) {
    deleteBestAlbumById(id: $id) {
      _id
      title
      artist
      coverUrl
      mvUrl
      releaseDate
      createdAt
      updatedAt
    }
  }
`

export const BATCH_DELETE_BEST_ALBUMS = gql`
  mutation DeleteBestAlbums($ids: [ID!]!) {
    deleteBestAlbums(ids: $ids) {
      n
      ok
      deletedCount
      ids
    }
  }
`
