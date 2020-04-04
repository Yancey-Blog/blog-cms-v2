import gql from 'graphql-tag'

export const CREATE_ONE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
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

export const UPDATE_ONE_POST = gql`
  mutation UpdatePostById($input: UpdatePostInput!) {
    updatePostById(input: $input) {
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

export const POSTS = gql`
  query GetPosts {
    getPosts {
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

export const DELETE_ONE_POST = gql`
  mutation DeletePostById($id: ID!) {
    deletePostById(id: $id) {
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

export const BATCH_DELETE_POSTS = gql`
  mutation DeletePosts($ids: [ID!]!) {
    deletePosts(ids: $ids) {
      n
      ok
      deletedCount
      ids
    }
  }
`
