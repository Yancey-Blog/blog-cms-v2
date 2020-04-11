import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/react-hooks'
import { GET_BANWAGON_SERVICE_INFO, GET_BANWAGON_USAGE_STATS } from './typeDefs'
import { GET_TOP_PV_POSTS } from '../Post/typeDefs'
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
        topPVPosts={topPVPosts ? topPVPosts.getTopPVPosts : []}
      />
    </section>
  )
}

export default DashBoard
