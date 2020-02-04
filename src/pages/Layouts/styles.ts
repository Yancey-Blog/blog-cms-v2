import { makeStyles } from '@material-ui/core/styles'
import { drawerWidth } from './constants'
import { transition } from './tools'

const useStyles = makeStyles({
  layouts: {
    display: 'flex',
  },

  expand: {
    marginLeft: 0,
    transition: transition('margin-left'),
  },

  shrink: {
    marginLeft: `-${drawerWidth}px`,
    transition: transition('margin-left'),
  },

  main: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
})

export default useStyles
