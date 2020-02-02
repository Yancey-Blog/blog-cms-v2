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
    top: '18px',
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
    top: '34px',
    transform: 'translate3d(-50%, -50%, 0)',
    fontSize: '34px',
    fontWeight: 300,
  },
  customBtn: {
    borderRadius: '24px',
    textTransform: 'capitalize',
  },
})

export default useStyles
