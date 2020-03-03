import gql from 'graphql-tag'

export const CREATE_ONE_YANCEY_MUSIC = gql`
  mutation CreateYanceyMusic($input: CreateYanceyMusicInput!) {
    createYanceyMusic(input: $input) {
      _id
      title
      soundCloudUrl
      posterUrl
      releaseDate
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_ONE_YANCEY_MUSIC = gql`
  mutation UpdateYanceyMusicById($input: UpdateYanceyMusicInput!) {
    updateYanceyMusicById(input: $input) {
      _id
      title
      soundCloudUrl
      posterUrl
      releaseDate
      createdAt
      updatedAt
    }
  }
`

export const YANCEY_MUSIC = gql`
  query GetYanceyMusic {
    getYanceyMusic {
      _id
      title
      soundCloudUrl
      posterUrl
      releaseDate
      createdAt
      updatedAt
    }
  }
`

export const DELETE_ONE_YANCEY_MUSIC = gql`
  mutation DeleteYanceyMusicById($id: ID!) {
    deleteYanceyMusicById(id: $id) {
      _id
      title
      soundCloudUrl
      posterUrl
      releaseDate
      createdAt
      updatedAt
    }
  }
`

export const BATCH_DELETE_YANCEY_MUSIC = gql`
  mutation DeleteYanceyMusic($ids: [ID!]!) {
    deleteYanceyMusic(ids: $ids) {
      n
      ok
      deletedCount
      ids
    }
  }
`
