import { FC } from 'react'
import { DateTime } from 'luxon'
import { formatJSONDate } from 'yancey-js-util'
import classNames from 'classnames'
import ReactTooltip from 'react-tooltip'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import { Paper } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
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
      boxShadow:
        'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px',
      borderRadius: 16,
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
        startDate={new Date(DateTime.now().plus({ years: -1 }).toISODate())}
        endDate={new Date(DateTime.now().toISODate())}
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
                  `「${item.postName}」 is ${item.scenes} at ${formatJSONDate(
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
