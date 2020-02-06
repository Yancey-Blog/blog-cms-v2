import { makeStyles } from '@material-ui/core/styles'
import { drawerWidth, foldDrawerWidth } from './constants'

export const transition = (props: 'margin-left' | 'transform') =>
  `${props} 300ms cubic-bezier(0.4, 0, 0.6, 1) 0ms`

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
    width: `calc(100% - ${foldDrawerWidth}px)`,
  },
})

export default useStyles
