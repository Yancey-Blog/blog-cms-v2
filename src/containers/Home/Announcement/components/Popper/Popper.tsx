// import React, { FC, useState } from 'react'
// import {
//   Button,
//   DialogActions,
//   DialogTitle,
//   Popper,
//   Fade,
//   Paper,
// } from '@material-ui/core'

// const Poppers: FC = () => {
//   // Popper
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
//   const handlePoperClick = (
//     event: React.MouseEvent<HTMLElement>,
//     id: string,
//   ) => {
//     setAnchorEl(anchorEl ? null : event.currentTarget)
//     setCurId(id)
//   }
//   const onPopperClose = () => {
//     setAnchorEl(null)
//     setCurId('')
//   }
//   const onDeleteARow = () => {
//     deleteAnnouncement({ id: curId })
//     onPopperClose()
//   }
//   return (
//     <Popper open={!!anchorEl} anchorEl={anchorEl} transition>
//       {({ TransitionProps }) => (
//         <Fade {...TransitionProps} timeout={350}>
//           <Paper>
//             <DialogTitle id='form-dialog-title'>
//               Delete the announcement(s)?
//             </DialogTitle>
//             <DialogActions>
//               <Button onClick={onPopperClose} color='primary'>
//                 Cancel
//               </Button>
//               <Button onClick={onDeleteARow} color='primary'>
//                 OK
//               </Button>
//             </DialogActions>
//           </Paper>
//         </Fade>
//       )}
//     </Popper>
//   )
// }

// export default Poppers

import React, { FC, useState } from 'react'
