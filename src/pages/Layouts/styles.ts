import { makeStyles } from '@material-ui/core/styles'
import { drawerWidth, foldDrawerWidth } from './constants'
import { transition } from './tools'

const useStyles = makeStyles({
  layouts: {
    display: 'flex',
    overflowX: 'hidden',
  },

  expand: {
    marginLeft: 0,
    transition: transition('margin-left'),
  },

  shrink: {
    marginLeft: `-${drawerWidth - foldDrawerWidth}px`,
    transition: transition('margin-left'),
  },

  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: `calc(100% - ${drawerWidth}px)`,
  },
})

export default useStyles
