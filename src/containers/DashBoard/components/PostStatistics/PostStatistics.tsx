import React, { FC } from 'react'
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
import { IPostItem } from 'src/containers/Post/types'
import useStyles from './styles'

interface Props {
  isFetchingTopPVPosts: boolean
  topPVPosts: IPostItem[]
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
      <Paper className={classes.paper}>ddd</Paper>
      <Paper className={classes.paper}>
        <List className={classes.list}>
          {topPVPosts.map((post, index) => (
            <ListItem key={post._id}>
              <ListItemAvatar>
                <Avatar src={post.posterUrl} />
              </ListItemAvatar>
              <ListItemText primary={post.title} />
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
