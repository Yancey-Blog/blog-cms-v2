import React, { FC, useEffect, useCallback } from 'react'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { useSnackbar } from 'notistack'
import {
  POSTS,
  DELETE_ONE_POST,
  BATCH_DELETE_POSTS,
  UPDATE_ONE_POST,
  CREATE_POST_STATISTICS,
} from './typeDefs'
import {
  Query,
  UpdatePostByIdMutation,
  PostStatisticsVars,
  CreatePostStatisticsMutation,
} from './types'
import PostTable from './components/PostTable'

const Post: FC = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [fetchPostsByPage, { loading: isFetching, data }] = useLazyQuery<Query>(
    POSTS,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    },
  )

  const fetchFirstData = useCallback(() => {
    fetchPostsByPage({
      variables: {
        input: {
          page: 1,
          pageSize: 10,
        },
      },
    })
  }, [fetchPostsByPage])

  const [createPostStatistics] = useMutation<
    CreatePostStatisticsMutation,
    PostStatisticsVars
  >(CREATE_POST_STATISTICS)

  const [updatePostById] = useMutation<UpdatePostByIdMutation>(
    UPDATE_ONE_POST,
    {
      onCompleted(data) {
        const { _id, title, isPublic } = data.updatePostById
        enqueueSnackbar(`「${title}」 is ${isPublic ? 'public' : 'hide'}.`, {
          variant: 'success',
        })

        createPostStatistics({
          variables: {
            input: {
              postId: _id,
              postName: title,
              scenes: `switched to ${isPublic ? 'public' : 'hide'}`,
            },
          },
        })
      },
    },
  )

  const [deletePostById, { loading: isDeleting }] = useMutation(
    DELETE_ONE_POST,
    {
      onCompleted() {
        enqueueSnackbar('Delete success!', { variant: 'success' })
        fetchFirstData()
      },
    },
  )

  const [deletePosts, { loading: isBatchDeleting }] = useMutation(
    BATCH_DELETE_POSTS,
    {
      onCompleted() {
        enqueueSnackbar('Delete success!', { variant: 'success' })
        fetchFirstData()
      },
    },
  )

  useEffect(() => {
    fetchFirstData()
  }, [fetchFirstData])

  return (
    <PostTable
      total={data ? data.getPosts.total : 0}
      page={data ? data.getPosts.page : 0}
      pageSize={data ? data.getPosts.pageSize : 0}
      dataSource={data ? data.getPosts.items : []}
      fetchPostsByPage={fetchPostsByPage}
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
