import React, { FC } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useSnackbar } from 'notistack'
import { POSTS, DELETE_ONE_POST, BATCH_DELETE_POSTS } from './typeDefs'
import { IPost, Query } from './types'
import PostTable from './components/PostTable'

const Post: FC = () => {
  const { enqueueSnackbar } = useSnackbar()

  const { loading: isFetching, data } = useQuery<Query>(POSTS, {
    notifyOnNetworkStatusChange: true,
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
              getPosts: data.getPosts.filter(
                (post: IPost) => post._id !== deletePostById._id,
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
              getPosts: data.getPosts.filter(
                (post: IPost) => !deletePosts.ids.includes(post._id),
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
      dataSource={data ? data.getPosts : []}
      isFetching={isFetching}
      isDeleting={isDeleting}
      isBatchDeleting={isBatchDeleting}
      deletePostById={deletePostById}
      deletePosts={deletePosts}
    />
  )
}

export default Post
