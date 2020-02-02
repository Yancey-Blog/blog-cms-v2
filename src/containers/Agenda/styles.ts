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
  navigationButtonSpace: {
    margin: '0 4px',
  },
  customTitle: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate3d(-50%, -50%, 0)',
    fontSize: '34px',
    fontWeight: 300,
  },
})

export default useStyles
