import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/react-hooks'
import { GET_BANWAGON_SERVICE_INFO, GET_BANWAGON_USAGE_STATS } from './typeDefs'
import { GET_TOP_PV_POSTS, GET_POST_STATISTICS } from '../Post/typeDefs'
import Bandwagon from './components/Bandwagon/Bandwagon'
import PostStatistics from './components/PostStatistics/PostStatistics'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dashboradWrapper: {
      width: '100%',
    },
  }),
)

const DashBoard: FC = () => {
  const classes = useStyles()

  const { loading: isFechingServiceInfo, data: serviceInfo } = useQuery(
    GET_BANWAGON_SERVICE_INFO,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    },
  )

  const { loading: isFetchingUsageStatus, data: usageStatus } = useQuery(
    GET_BANWAGON_USAGE_STATS,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    },
  )

  const { loading: isFetchingTopPVPosts, data: topPVPosts } = useQuery(
    GET_TOP_PV_POSTS,
    {
      variables: { limit: 5 },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    },
  )

  const { loading: isFechingPostStatistics, data: postStatistics } = useQuery(
    GET_POST_STATISTICS,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    },
  )

  return (
    <section className={classes.dashboradWrapper}>
      <Bandwagon
        serviceInfo={serviceInfo ? serviceInfo.getBanwagonServiceInfo : {}}
        usageStatus={usageStatus ? usageStatus.getBanwagonUsageStats : []}
        isFechingServiceInfo={isFechingServiceInfo}
        isFetchingUsageStatus={isFetchingUsageStatus}
      />
      <PostStatistics
        isFetchingTopPVPosts={isFetchingTopPVPosts}
        isFechingPostStatistics={isFechingPostStatistics}
        topPVPosts={topPVPosts ? topPVPosts.getTopPVPosts : []}
        postStatistics={postStatistics ? postStatistics.getPostStatistics : []}
      />
    </section>
  )
}

export default DashBoard
