import { FC } from 'react'
import { Paper, Chip } from '@mui/material'
import { makeStyles, ClassNameMap, createStyles } from '@mui/styles'

interface Props {
  tags: string[]
  loading: boolean
}

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      padding: 16,
      overflowY: 'scroll',
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
  const classes: ClassNameMap = useStyles()

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
