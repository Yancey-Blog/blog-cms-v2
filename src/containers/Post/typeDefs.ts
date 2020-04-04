import gql from 'graphql-tag'

const POST_FRAGMENT = gql`
  fragment PostFragment on PostModel {
    _id
    posterUrl
    title
    summary
    content
    tags
    lastModifiedDate
    like
    pv
    isPublic
    createdAt
    updatedAt
  }
`

export const CREATE_ONE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`

export const UPDATE_ONE_POST = gql`
  mutation UpdatePostById($input: UpdatePostInput!) {
    updatePostById(input: $input) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`

export const POSTS = gql`
  query GetPosts {
    getPosts {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`

export const DELETE_ONE_POST = gql`
  mutation DeletePostById($id: ID!) {
    deletePostById(id: $id) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
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
