import { makeStyles, createStyles } from '@mui/styles'

const useStyles = makeStyles(() =>
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
      marginBottom: '40px',
      width: 450,
    },
  }),
)

export default useStyles
