import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
  },
  viewSwitcher: {
    position: 'absolute',
    top: '14px',
    right: '24px',
    zIndex: 1,
  },
  customPaper: {
    position: 'relative',
  },
})

export default useStyles
