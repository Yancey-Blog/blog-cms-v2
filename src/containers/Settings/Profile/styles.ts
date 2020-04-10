import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      marginBottom: theme.spacing(2),
      flex: 1,
    },
  }),
)

export default useStyles
