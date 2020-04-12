import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tip: {
      top: 72,
      color: '#5f6368',
      width: 460,
      position: 'absolute',
      fontSize: 14,
    },

    checkboxLabel: {
      fontSize: 14,
      color: 'rgba(0,0,0,0.65)',
    },

    sureToDeleteAccount: {
      display: 'block',
      position: 'relative',
      left: -12,
      margin: '36px 0 12px',
    },

    input: {
      display: 'block',
      marginBottom: theme.spacing(2.5),
      width: 450,
    },
  }),
)

export default useStyles
