import React, { FC, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import chartConfig from '../chartjsConfig'
import { IBandwagonUsageStatus } from '../types'
import ToggleChart from './ToggleChart'
import UsageStatusSkeleton from './UsageStatusSkeleton'

interface Props {
  usageStatus: IBandwagonUsageStatus[]
  isFetchingUsageStatus: boolean
}

const NetWorkChart: FC<Props> = ({ usageStatus, isFetchingUsageStatus }) => {
  const [networkLimit, setNetworkLimit] = useState(12)

  return (
    <>
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
    </>
  )
}

export default NetWorkChart
