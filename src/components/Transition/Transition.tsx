import { forwardRef, Ref, ReactElement } from 'react'
import { TransitionProps } from '@material-ui/core/transitions'
import { Slide } from '@material-ui/core'

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default Transition
