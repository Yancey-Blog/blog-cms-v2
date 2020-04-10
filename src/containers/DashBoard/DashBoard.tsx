import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/react-hooks'
import { GET_BANWAGON_SERVICE_INFO, GET_BANWAGON_USAGE_STATS } from './typeDefs'
import Bandwagon from './components/Bandwagon/Bandwagon'

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

  return (
    <section className={classes.dashboradWrapper}>
      <Bandwagon
        serviceInfo={serviceInfo ? serviceInfo.getBanwagonServiceInfo : {}}
        usageStatus={usageStatus ? usageStatus.getBanwagonUsageStats : []}
        isFechingServiceInfo={isFechingServiceInfo}
        isFetchingUsageStatus={isFetchingUsageStatus}
      />
    </section>
  )
}

export default DashBoard
