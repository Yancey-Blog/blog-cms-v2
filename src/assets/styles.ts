import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addIconFab: {
      boxShadow: 'none',
      background: 'none',
      color: 'rgba(0, 0, 0, 0.54)',
    },
  }),
)

export default useStyles
