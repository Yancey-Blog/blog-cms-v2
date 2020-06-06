import React, { FC } from 'react'
import { Paper, Chip } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

interface Props {
  tags: string[]
  loading: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: 16,
      overflowY: 'scroll',
    },

    chip: {
      margin: 8,
    },
  }),
)

const TagsCloud: FC<Props> = ({ tags }) => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      {tags.map((tag) => (
        <Chip key={tag} label={tag} color="primary" className={classes.chip} />
      ))}
    </Paper>
  )
}

export default TagsCloud
