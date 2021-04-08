import { FC } from 'react'
import { useQuery } from '@apollo/client'
import { GET_BANWAGON_SERVICE_INFO, GET_BANWAGON_USAGE_STATS } from './typeDefs'
import {
  GET_TOP_PV_POSTS,
  GET_TOP_LIKE_POSTS,
  GET_ALL_TAGS,
  GET_POST_STATISTICS,
} from '../Post/typeDefs'
import { PostRankListType } from './types'
import useStyles from './styles'
import BandwagonServiceStatus from './components/BandwagonServiceStatus'
import DiskChart from './components/DiskChart'
import NetWorkChart from './components/NetWorkChart'
import CPUChart from './components/CPUChart'
import PostRankList from './components/PostRankList'
import PostStatistics from './components/PostStatistics'
import TagClouds from './components/TagClouds'

const DashBoard: FC = () => {
  const classes = useStyles()

  const { loading: isFechingServiceInfo, data: serviceInfo } = useQuery(
    GET_BANWAGON_SERVICE_INFO,
    {
      notifyOnNetworkStatusChange: true,
    },
  )

  const { loading: isFetchingUsageStatus, data: usageStatus } = useQuery(
    GET_BANWAGON_USAGE_STATS,
    {
      notifyOnNetworkStatusChange: true,
    },
  )

  const { loading: isFetchingTopPVPosts, data: topPVPosts } = useQuery(
    GET_TOP_PV_POSTS,
    {
      variables: { limit: 5 },
      notifyOnNetworkStatusChange: true,
    },
  )

  const { loading: isFetchingTopLikePosts, data: topLikePosts } = useQuery(
    GET_TOP_LIKE_POSTS,
    {
      variables: { limit: 5 },
      notifyOnNetworkStatusChange: true,
    },
  )

  const { loading: isFetchingAllTags, data: allTags } = useQuery(GET_ALL_TAGS, {
    notifyOnNetworkStatusChange: true,
  })

  const { loading: isFechingPostStatistics, data: postStatistics } = useQuery(
    GET_POST_STATISTICS,
    {
      notifyOnNetworkStatusChange: true,
    },
  )

  return (
    <section className={classes.dashboradWrapper}>
      <BandwagonServiceStatus
        serviceInfo={serviceInfo ? serviceInfo.getBanwagonServiceInfo : {}}
        isFechingServiceInfo={isFechingServiceInfo}
      />

      <div className={classes.group}>
        <DiskChart
          usageStatus={usageStatus ? usageStatus.getBanwagonUsageStats : []}
          isFetchingUsageStatus={isFetchingUsageStatus}
        />

        <PostRankList
          type={PostRankListType.PV}
          topPosts={topPVPosts ? topPVPosts.getTopPVPosts : []}
          loading={isFetchingTopPVPosts}
        />

        <NetWorkChart
          usageStatus={usageStatus ? usageStatus.getBanwagonUsageStats : []}
          isFetchingUsageStatus={isFetchingUsageStatus}
        />

        <PostRankList
          type={PostRankListType.LIKE}
          topPosts={topLikePosts ? topLikePosts.getTopLikePosts : []}
          loading={isFetchingTopLikePosts}
        />

        <CPUChart
          usageStatus={usageStatus ? usageStatus.getBanwagonUsageStats : []}
          isFetchingUsageStatus={isFetchingUsageStatus}
        />

        <TagClouds
          tags={allTags ? allTags.getAllTags.tags : []}
          loading={isFetchingAllTags}
        />
      </div>

      <PostStatistics
        loading={isFechingPostStatistics}
        data={postStatistics ? postStatistics.getPostStatistics : []}
      />
    </section>
  )
}

export default DashBoard
