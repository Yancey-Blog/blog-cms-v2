import React, { FC } from 'react'
import moment from 'moment'
import classNames from 'classnames'
import ReactTooltip from 'react-tooltip'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
} from '@material-ui/core'
import { LooksOne, LooksTwo, Looks3, Looks4, Looks5 } from '@material-ui/icons'
import { formatDate } from 'src/shared/utils'
import {
  IPostItem,
  IPostStatistics,
  IPostStatisticsGroupItem,
} from 'src/containers/Post/types'
import useStyles from './styles'

interface Props {
  isFetchingTopPVPosts: boolean
  isFechingPostStatistics: boolean
  topPVPosts: IPostItem[]
  postStatistics: IPostStatistics[]
}

const numbersIcon = [
  <LooksOne />,
  <LooksTwo />,
  <Looks3 />,
  <Looks4 />,
  <Looks5 />,
]

const PostStatistics: FC<Props> = ({
  isFetchingTopPVPosts,
  isFechingPostStatistics,
  topPVPosts,
  postStatistics,
}) => {
  const classes = useStyles()

  return (
    <section className={classes.postStatistics}>
      <Paper className={classNames(classes.paper, classes.heatmapPaper)}>
        <CalendarHeatmap
          startDate={new Date(moment().subtract(1, 'y').format('YYYY-MM-DD'))}
          endDate={new Date(moment().format('YYYY-MM-DD'))}
          values={postStatistics.map((postStatisticsItem) => ({
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
      <Paper className={classes.paper}>
        <List className={classes.list}>
          {topPVPosts.map((post, index) => (
            <ListItem key={post._id}>
              <ListItemAvatar>
                <Avatar src={post.posterUrl} />
              </ListItemAvatar>
              <ListItemText primary={`${post.title} (PV: ${post.pv})`} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="number">
                  {numbersIcon[index]}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </section>
  )
}

export default PostStatistics
