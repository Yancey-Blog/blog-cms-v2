import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { IBandwagonServiceInfo, IBandwagonUsageStatus } from '../../types'
import StatusCard from '../StatusCard/StatusCard'
import UsageStatus from '../UsageStatus/UsageStatus'

interface Props {
  serviceInfo: IBandwagonServiceInfo
  usageStatus: IBandwagonUsageStatus[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    statusCardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridColumnGap: 24,
      marginBottom: 24,
    },
  }),
)

const Bandwagon: FC<Props> = ({ serviceInfo, usageStatus }) => {
  const classes = useStyles()

  const {
    data_counter,
    plan_monthly_data,
    plan_disk,
    ve_used_disk_space_b,
    plan_ram,
    mem_available_kb,
    swap_total_kb,
    swap_available_kb,
  } = serviceInfo

  return (
    <>
      <section className={classes.statusCardGrid}>
        <StatusCard
          total={plan_monthly_data}
          used={data_counter}
          unit="GB"
          title="Bandwidth Usage"
        />
        <StatusCard
          total={plan_disk}
          used={ve_used_disk_space_b}
          unit="GB"
          title="Disk Usage"
        />
        <StatusCard
          total={plan_ram}
          used={plan_ram - mem_available_kb * 1024}
          unit="MB"
          title="RAM Usage"
        />
        <StatusCard
          total={swap_total_kb}
          used={swap_total_kb - swap_available_kb}
          unit="KB"
          title="SWAP Usage"
        />
      </section>
      <UsageStatus usageStatus={usageStatus} />
    </>
  )
}

export default Bandwagon
