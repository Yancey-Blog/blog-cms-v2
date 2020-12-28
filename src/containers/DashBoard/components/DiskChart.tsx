import { FC, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import chartConfig from '../chartjsConfig'
import { IBandwagonUsageStatus } from '../types'
import ToggleChart from './ToggleChart'
import UsageStatusSkeleton from './UsageStatusSkeleton'

interface Props {
  usageStatus: IBandwagonUsageStatus[]
  isFetchingUsageStatus: boolean
}

const DiskChart: FC<Props> = ({ usageStatus, isFetchingUsageStatus }) => {
  const [diskLimit, setDiskLimit] = useState(12)

  return (
    <>
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
              'disk_write_bytes',
              'disk_read_bytes',
            )}
            options={{ maintainAspectRatio: false }}
            height={375}
          />
        </ToggleChart>
      )}
    </>
  )
}

export default DiskChart
