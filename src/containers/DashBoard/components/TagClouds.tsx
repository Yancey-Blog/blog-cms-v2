import { FC } from 'react'
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
      boxShadow:
        'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px',
      borderRadius: 16,
    },

    chip: {
      margin: 8,
    },

    header: {
      marginBottom: 16,
      fontSize: 16,
      fontWeight: 600,
    },
  }),
)

const TagClouds: FC<Props> = ({ tags }) => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <header className={classes.header}>Tag Clouds</header>
      {tags.map((tag) => (
        <Chip key={tag} label={tag} color="primary" className={classes.chip} />
      ))}
    </Paper>
  )
}

export default TagClouds
