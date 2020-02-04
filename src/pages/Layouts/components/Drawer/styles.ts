import { makeStyles } from '@material-ui/core/styles'
import { drawerWidth, foldDrawerWidth } from '../../constants'
import { transition } from '../../tools'

const useStyles = makeStyles({
  menu: {
    margin: 0,
    padding: 0,
    minWidth: `${drawerWidth}px`,
    minHeight: '100vh',
    backgroundColor: 'green',
  },

  expand: {
    transform: 'translateX(0)',
    transition: transition('transform'),
  },

  shrink: {
    transform: `translateX(-${drawerWidth - foldDrawerWidth}px)`,
    transition: transition('transform'),
  },
})

export default useStyles
