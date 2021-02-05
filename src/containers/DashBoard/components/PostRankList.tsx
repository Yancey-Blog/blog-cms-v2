import { FC } from 'react'
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
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { IPostItem } from 'src/containers/Post/types'
import { PostRankListType } from '../types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'grid',
    },

    list: {
      width: '100%',
    },

    header: {
      marginTop: 16,
      marginLeft: 16,
      fontSize: 16,
      fontWeight: 600,
    },
  }),
)

interface Props {
  type: PostRankListType
  topPosts: IPostItem[]
  loading: boolean
}

const numbersIcon = [
  <LooksOne />,
  <LooksTwo />,
  <Looks3 />,
  <Looks4 />,
  <Looks5 />,
]

const PostRankList: FC<Props> = ({ type, topPosts }) => {
  const classes = useStyles()

  const renderType = (post: IPostItem) => {
    if (type === PostRankListType.PV) {
      return `(PV: ${post.pv})`
    }

    return `(Like: ${post.like})`
  }

  return (
    <Paper className={classes.paper}>
      <header className={classes.header}>
        TOP 5 POSTS BY {type === PostRankListType.PV ? 'PV' : 'LIKE'}
      </header>
      <List className={classes.list}>
        {topPosts.map((post, index) => (
          <ListItem key={post._id}>
            <ListItemAvatar>
              <Avatar src={post.posterUrl} />
            </ListItemAvatar>
            <ListItemText primary={`${post.title} ${renderType(post)}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="number">
                {numbersIcon[index]}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default PostRankList
