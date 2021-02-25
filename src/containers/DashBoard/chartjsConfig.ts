import { DateTime } from 'luxon'
import { IBandwagonUsageStatus } from 'src/containers/DashBoard/types'

const chartConfig = (
  usageStatus: IBandwagonUsageStatus[],
  limit: number,
  type1: Exclude<keyof IBandwagonUsageStatus, 'timestamp'>,
  type2?: Exclude<keyof IBandwagonUsageStatus, 'timestamp'>,
) => ({
  labels: usageStatus
    .map(({ timestamp }) => DateTime.fromSeconds(+timestamp).toFormat('HH:mm'))
    .slice(-limit),
  datasets: [
    {
      label: type1.split('_').join(' ').toUpperCase(),
      fill: false,
      lineTension: 0.4,
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
      data: usageStatus.map((usageStat) => usageStat[type1]).slice(-limit),
    },
    type2 && {
      label: type2.split('_').join(' ').toUpperCase(),
      fill: false,
      lineTension: 0.4,
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
      data: usageStatus.map((usageStat) => usageStat[type2]).slice(-limit),
    },
  ].filter(Boolean),
})

export default chartConfig
