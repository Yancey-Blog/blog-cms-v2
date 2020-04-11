import gql from 'graphql-tag'
import { BATCH_DELETE_FRAGMENT } from 'src/shared/graphqlFragment'

const POST_FRAGMENT = gql`
  fragment PostFragment on PostItemModel {
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
  query GetPosts($input: PaginationInput!) {
    getPosts(input: $input) {
      total
      page
      pageSize
      items {
        ...PostFragment
      }
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
      ...BatchDeleteFragment
    }
  }
  ${BATCH_DELETE_FRAGMENT}
`

export const GET_TOP_PV_POSTS = gql`
  query GetTopPVPosts($limit: Int!) {
    getTopPVPosts(limit: $limit) {
      _id
      title
      posterUrl
      pv
    }
  }
`

const POST_STATISTICS_FRAGMENT = gql`
  fragment PostStatisticsFragment on PostStatisticsModel {
    _id
    postId
    postName
    scenes
    createdAt
    updatedAt
  }
`

export const GET_POST_STATISTICS = gql`
  query GetPostStatistics {
    getPostStatistics {
      ...PostStatisticsFragment
    }
  }
  ${POST_STATISTICS_FRAGMENT}
`

export const CREATE_POST_STATISTICS = gql`
  mutation CreatePostStatistics($input: CreatePostStatisticsInput!) {
    createPostStatistics(input: $input) {
      ...PostStatisticsFragment
    }
  }
  ${POST_STATISTICS_FRAGMENT}
`
