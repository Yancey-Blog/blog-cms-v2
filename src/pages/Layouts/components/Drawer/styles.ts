import { makeStyles } from '@material-ui/core/styles'
import { drawerWidth } from '../../constants'
import { transition } from '../../tools'

const useStyles = makeStyles({
  menu: {
    margin: 0,
    padding: 0,
    width: `${drawerWidth}px`,
    height: '100vh',
    backgroundColor: 'green',
  },

  expand: {
    transform: 'translateX(0)',
    transition: transition('transform'),
  },

  shrink: {
    transform: `translateX(-${drawerWidth}px)`,
    transition: transition('transform'),
  },
})

export default useStyles
