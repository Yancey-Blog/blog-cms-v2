import { FC } from 'react'
import moment from 'moment'
import classNames from 'classnames'
import ReactTooltip from 'react-tooltip'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import { Paper } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { formatDate } from 'src/shared/utils'
import {
  IPostStatistics,
  IPostStatisticsGroupItem,
} from 'src/containers/Post/types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    heatmapPaper: {
      padding: '0 16px',
      '& svg': {
        width: '100%',
        height: '100%',
      },
    },
  }),
)

interface Props {
  loading: boolean
  data: IPostStatistics[]
}

const PostStatistics: FC<Props> = ({ loading, data }) => {
  const classes = useStyles()

  return (
    <Paper className={classNames(classes.paper, classes.heatmapPaper)}>
      <CalendarHeatmap
        startDate={new Date(moment().subtract(1, 'y').format('YYYY-MM-DD'))}
        endDate={new Date(moment().format('YYYY-MM-DD'))}
        values={data.map((postStatisticsItem) => ({
          date: postStatisticsItem._id,
          ...postStatisticsItem,
        }))}
        classForValue={(value: IPostStatisticsGroupItem) => {
          if (!value) {
            return 'color-empty'
          }
          return `color-gitlab-${value.count}`
        }}
        tooltipDataAttrs={(value: IPostStatisticsGroupItem) => ({
          'data-tip': value.date
            ? `
            ${value.items
              .map(
                (item) =>
                  `「${item.postName}」 is ${item.scenes} at ${formatDate(
                    item.operatedAt,
                  )}`,
              )
              .join('<br/>')}
          `
            : `No contributions on the day.`,
        })}
        showWeekdayLabels
      />
      <ReactTooltip multiline />
    </Paper>
  )
}

export default PostStatistics
