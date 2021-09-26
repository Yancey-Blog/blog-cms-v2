import { FC } from 'react'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { Popover } from '@mui/material'
import { makeStyles, ClassNameMap, createStyles } from '@mui/styles'
import {
  POPOVER_ANCHOR_ORIGIN,
  POPOVER_TRANSFORM_ORIGIN,
} from 'src/shared/constants'

interface Props {
  imgUrl: string
  imgName: string
}

const useStyles = makeStyles(() =>
  createStyles({
    thumb: {
      width: 150,
      cursor: 'pointer',
    },
    full: {
      display: 'block',
      width: 400,
    },
  }),
)

const ImagePopup: FC<Props> = ({ imgUrl, imgName }) => {
  const classes: ClassNameMap = useStyles()

  return (
    <PopupState variant="popover" popupId="imagePoperOver">
      {(popupState) => (
        <div>
          <img
            className={classes.thumb}
            src={imgUrl}
            alt={imgName}
            {...bindTrigger(popupState)}
          />
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={POPOVER_ANCHOR_ORIGIN}
            transformOrigin={POPOVER_TRANSFORM_ORIGIN}
            disableRestoreFocus
          >
            <img className={classes.full} src={imgUrl} alt={imgName} />
          </Popover>
        </div>
      )}
    </PopupState>
  )
}

export default ImagePopup
