import React, { FC } from 'react'
import { useLazyQuery, useQuery, useMutation } from '@apollo/react-hooks'
import { useSnackbar } from 'notistack'
import Loading from 'src/components/Loading/Loading'
import { POSTS } from 'src/containers/Post/typeDefs'
import { Query as PostsQuery } from 'src/containers/Post/types'
import SettingsHeader from '../components/SettingsHeader/SettingsHeader'
import { GLOBAL_SETTING, UPDATE_GLOBAL_SETTING_BY_ID } from './typeDefs'
import { Query } from './types'
import ReleasePicker from './components/ReleasePicker'
import CVPicker from './components/CVPicker'
import GrayTheme from './components/GrayTheme'

const GlobalConfig: FC = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [
    fetchPostsByPage,
    { loading: isFetchingPosts, data: postsData },
  ] = useLazyQuery<PostsQuery>(POSTS, {
    notifyOnNetworkStatusChange: true,
  })

  const fetchPosts = (title: string) => {
    fetchPostsByPage({
      variables: {
        input: {
          page: 1,
          pageSize: 10,
          title,
        },
      },
    })
  }

  const { loading: isFetching, data } = useQuery<Query>(GLOBAL_SETTING, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  const [updateGlobalSettingById, { loading: isSubmitting }] = useMutation(
    UPDATE_GLOBAL_SETTING_BY_ID,
    {
      errorPolicy: 'all',
      onCompleted() {
        enqueueSnackbar('Update success!', { variant: 'success' })
      },
      onError() {},
    },
  )

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
        <>
          <SettingsHeader
            title="Global Config"
            subTitle="Global config for Yancey Blog pc and mobile"
          />

          <ReleasePicker
            id={data ? data.getGlobalSetting._id : ''}
            updateGlobalSettingById={updateGlobalSettingById}
            releasePostId={data ? data.getGlobalSetting.releasePostId : ''}
            isFetching={isFetchingPosts}
            isSubmitting={isSubmitting}
            fetchPosts={fetchPosts}
            posts={postsData ? postsData.getPosts.items : []}
          />
          <CVPicker
            id={data ? data.getGlobalSetting._id : ''}
            updateGlobalSettingById={updateGlobalSettingById}
            cvPostId={data ? data.getGlobalSetting.cvPostId : ''}
            isFetching={isFetchingPosts}
            isSubmitting={isSubmitting}
            fetchPosts={fetchPosts}
            posts={postsData ? postsData.getPosts.items : []}
          />
          <GrayTheme
            id={data ? data.getGlobalSetting._id : ''}
            updateGlobalSettingById={updateGlobalSettingById}
            isSubmitting={isSubmitting}
            isGrayTheme={data ? data.getGlobalSetting.isGrayTheme : false}
          />
        </>
      )}
    </>
  )
}

export default GlobalConfig
