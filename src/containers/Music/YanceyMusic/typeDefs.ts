import gql from 'graphql-tag'
import { BATCH_DELETE_FRAGMENT } from 'src/graphql/graphqlFragment'

const YANCEY_MUSIC_FRAGMENT = gql`
  fragment YanceyMusicFragment on YanceyMusicModel {
    _id
    title
    soundCloudUrl
    posterUrl
    releaseDate
    createdAt
    updatedAt
  }
`

export const CREATE_ONE_YANCEY_MUSIC = gql`
  mutation CreateYanceyMusic($input: CreateYanceyMusicInput!) {
    createYanceyMusic(input: $input) {
      ...YanceyMusicFragment
    }
  }
  ${YANCEY_MUSIC_FRAGMENT}
`

export const UPDATE_ONE_YANCEY_MUSIC = gql`
  mutation UpdateYanceyMusicById($input: UpdateYanceyMusicInput!) {
    updateYanceyMusicById(input: $input) {
      ...YanceyMusicFragment
    }
  }
  ${YANCEY_MUSIC_FRAGMENT}
`

export const YANCEY_MUSIC = gql`
  query GetYanceyMusic {
    getYanceyMusic {
      ...YanceyMusicFragment
    }
  }
  ${YANCEY_MUSIC_FRAGMENT}
`

export const DELETE_ONE_YANCEY_MUSIC = gql`
  mutation DeleteYanceyMusicById($id: ID!) {
    deleteYanceyMusicById(id: $id) {
      ...YanceyMusicFragment
    }
  }
  ${YANCEY_MUSIC_FRAGMENT}
`

export const BATCH_DELETE_YANCEY_MUSIC = gql`
  mutation DeleteYanceyMusic($ids: [ID!]!) {
    deleteYanceyMusic(ids: $ids) {
      ...BatchDeleteFragment
    }
  }
  ${BATCH_DELETE_FRAGMENT}
`
