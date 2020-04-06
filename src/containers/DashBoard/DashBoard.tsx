import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/react-hooks'
import { GET_BANWAGON_SERVICE_INFO } from './typeDefs'
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

  const { loading, data } = useQuery(GET_BANWAGON_SERVICE_INFO, {
    notifyOnNetworkStatusChange: true,
  })

  return (
    <section className={classes.dashboradWrapper}>
      <Bandwagon dataSource={data ? data.getBanwagonServiceInfo : {}} />
    </section>
  )
}

export default DashBoard
