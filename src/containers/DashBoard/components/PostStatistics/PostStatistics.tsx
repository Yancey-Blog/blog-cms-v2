import React, { FC } from 'react'
import classNames from 'classnames'
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
import { IPostItem, IPostStatistics } from 'src/containers/Post/types'
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

const PostStatistics: FC<Props> = ({ isFetchingTopPVPosts, topPVPosts }) => {
  const classes = useStyles()

  return (
    <section className={classes.postStatistics}>
      <Paper className={classNames(classes.paper, classes.heatmapPaper)}>
        <CalendarHeatmap
          startDate={new Date('2020-01-01')}
          endDate={new Date('2020-12-31')}
          values={[
            { date: '2020-04-12', count: 12 },
            { date: '2020-04-13', count: 122 },
            { date: '2020-04-14', count: 38 },
            // ...and so on
          ]}
        />
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
