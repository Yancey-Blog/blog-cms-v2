import React, { FC, useState } from 'react'
import classNames from 'classnames'
import { Paper } from '@material-ui/core'
import { Line, Bar } from 'react-chartjs-2'
import chartConfig from 'src/shared/chartjsConfig'
import useStyles from './styles'
import { IBandwagonUsageStatus } from '../../types'
import ToggleChart from '../ToggleChart/ToggleChart'
import UsageStatusSkeleton from '../UsageStatusSkeleton/UsageStatusSkeleton'

interface Props {
  usageStatus: IBandwagonUsageStatus[]
  isFetchingUsageStatus: boolean
}

const UsageStatus: FC<Props> = ({ usageStatus, isFetchingUsageStatus }) => {
  const classes = useStyles()

  const [diskLimit, setDiskLimit] = useState(12)
  const [networkLimit, setNetworkLimit] = useState(12)
  const [cpuLimit, setCPULimit] = useState(12)

  return (
    <>
      <section className={classes.usageStatusContainer}>
        {isFetchingUsageStatus ? (
          <UsageStatusSkeleton />
        ) : (
          <ToggleChart
            handleToggleChange={(value: number) => setDiskLimit(value)}
          >
            <Bar
              data={chartConfig(
                usageStatus,
                diskLimit,
                'disk_read_bytes',
                'disk_write_bytes',
              )}
              options={{
                maintainAspectRatio: false,
              }}
              height={375}
            />
          </ToggleChart>
        )}

        {isFetchingUsageStatus ? (
          <UsageStatusSkeleton />
        ) : (
          <ToggleChart
            handleToggleChange={(value: number) => setNetworkLimit(value)}
          >
            <Bar
              data={chartConfig(
                usageStatus,
                networkLimit,
                'network_in_bytes',
                'network_out_bytes',
              )}
              options={{ maintainAspectRatio: false }}
              height={375}
            />
          </ToggleChart>
        )}
      </section>

      <section
        className={classNames(classes.cpuWrapper, classes.usageStatusContainer)}
      >
        {isFetchingUsageStatus ? (
          <UsageStatusSkeleton />
        ) : (
          <ToggleChart
            handleToggleChange={(value: number) => setCPULimit(value)}
          >
            <Line
              data={chartConfig(usageStatus, cpuLimit, 'cpu_usage')}
              options={{ maintainAspectRatio: false }}
              height={375}
            />
          </ToggleChart>
        )}
      </section>
    </>
  )
}

export default UsageStatus
