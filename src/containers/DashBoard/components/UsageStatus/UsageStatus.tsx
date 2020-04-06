import React, { FC } from 'react'
import classNames from 'classnames'
import moment from 'moment'
import { Paper } from '@material-ui/core'
import { Line, Bar } from 'react-chartjs-2'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { IBandwagonUsageStatus } from '../../types'

interface Props {
  usageStatus: IBandwagonUsageStatus[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    usageStatusContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridColumnGap: 24,
      height: 375,
    },

    paper: {
      padding: 16,
    },

    cpuWrapper: {
      gridTemplateColumns: '2fr 1fr',
      marginTop: 60,
    },
  }),
)

const UsageStatus: FC<Props> = ({ usageStatus, children }) => {
  const classes = useStyles()

  const chartConfig = (
    type1: Exclude<keyof IBandwagonUsageStatus, 'timestamp'>,
    type2?: Exclude<keyof IBandwagonUsageStatus, 'timestamp'>,
  ) => ({
    labels: usageStatus
      .map((usageStat) =>
        moment(parseInt(usageStat.timestamp, 10) * 1000).format('HH:mm'),
      )
      .slice(-30),
    datasets: [
      {
        label: type1.split('_').join(' ').toUpperCase(),
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(255, 99, 132, .8)',
        borderColor: '#FF6384',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#FF6384',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#FF6384)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: usageStatus.map((usageStat) => usageStat[type1]).slice(-30),
      },
      type2 && {
        label: type2.split('_').join(' ').toUpperCase(),
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgb(54, 162, 235, .8)',
        borderColor: '#36A2EB',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#36A2EB',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#36A2EB',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: usageStatus.map((usageStat) => usageStat[type2]).slice(-30),
      },
    ].filter(Boolean),
  })

  return (
    <>
      <section className={classes.usageStatusContainer}>
        <Paper className={classes.paper}>
          <Bar
            data={chartConfig('disk_read_bytes', 'disk_write_bytes')}
            options={{
              maintainAspectRatio: false,
            }}
            height={375}
          />
        </Paper>
        <Paper className={classes.paper}>
          <Bar
            data={chartConfig('network_in_bytes', 'network_out_bytes')}
            options={{ maintainAspectRatio: false }}
            height={375}
          />
        </Paper>
      </section>

      <section
        className={classNames(classes.cpuWrapper, classes.usageStatusContainer)}
      >
        <Paper className={classes.paper}>
          <Line
            data={chartConfig('cpu_usage')}
            options={{ maintainAspectRatio: false }}
            height={375}
          />
        </Paper>
        <Paper className={classes.paper}>{children}</Paper>
      </section>
    </>
  )
}

export default UsageStatus
