import React, { FC } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useSnackbar } from 'notistack'
import {
  POSTS,
  DELETE_ONE_POST,
  BATCH_DELETE_POSTS,
  UPDATE_ONE_POST,
} from './typeDefs'
import { IPostItem, Query } from './types'
import PostTable from './components/PostTable'

const Post: FC = () => {
  const { enqueueSnackbar } = useSnackbar()

  const { loading: isFetching, data, fetchMore } = useQuery<Query>(POSTS, {
    variables: {
      input: {
        page: 1,
        pageSize: 10,
      },
    },

    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  const [updatePostById] = useMutation(UPDATE_ONE_POST, {
    onCompleted() {
      enqueueSnackbar('Update success!', { variant: 'success' })
    },
  })

  const [deletePostById, { loading: isDeleting }] = useMutation(
    DELETE_ONE_POST,
    {
      update(proxy, { data: { deletePostById } }) {
        const data = proxy.readQuery<Query>({ query: POSTS })

        if (data) {
          proxy.writeQuery({
            query: POSTS,
            data: {
              getPosts: data.getPosts.items.filter(
                (post: IPostItem) => post._id !== deletePostById._id,
              ),
            },
          })
        }
      },
      onCompleted() {
        enqueueSnackbar('Delete success!', { variant: 'success' })
      },
      onError() {},
    },
  )

  const [deletePosts, { loading: isBatchDeleting }] = useMutation(
    BATCH_DELETE_POSTS,
    {
      update(proxy, { data: { deletePosts } }) {
        const data = proxy.readQuery<Query>({ query: POSTS })

        if (data) {
          proxy.writeQuery({
            query: POSTS,
            data: {
              getPosts: data.getPosts.items.filter(
                (post: IPostItem) => !deletePosts.ids.includes(post._id),
              ),
            },
          })
        }
      },
      onCompleted() {
        enqueueSnackbar('Delete success!', { variant: 'success' })
      },
      onError() {},
    },
  )

  return (
    <PostTable
      dataSource={data ? data.getPosts.items : []}
      isFetching={isFetching}
      isDeleting={isDeleting}
      isBatchDeleting={isBatchDeleting}
      deletePostById={deletePostById}
      deletePosts={deletePosts}
      updatePostById={updatePostById}
    />
  )
}

export default Post
