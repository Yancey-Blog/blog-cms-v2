// import React, { FC, useState } from 'react'
// import {
//   TextField,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   DialogContentText,
// } from '@material-ui/core'

// const Modals: FC = () => {
//   const [open, setOpen] = useState(false)
//   const onModalOpen = (id?: string) => {
//     setOpen(true)
//     if (id) {
//       setCurId(id)
//       setAnnouncementValue(byId[id].announcement)
//     }
//   }
//   const onModalClose = () => {
//     setCurId('')
//     setOpen(false)
//     setAnnouncementValue('')
//   }
//   const onModalSubmit = () => {
//     if (curId) {
//       updateAnnouncement({ id: curId, announcement: announcementValue })
//     } else {
//       addAnnouncement({ announcement: announcementValue })
//     }
//     onModalClose()
//   }
//   return (
//     <Dialog
//       open={open}
//       onClose={onModalClose}
//       aria-labelledby='form-dialog-title'
//     >
//       <DialogTitle id='form-dialog-title'>
//         {!curId ? 'Add' : 'Update'} Announcement
//       </DialogTitle>
//       <DialogContent>
//         <DialogContentText>
//           To subscribe to this website, please enter your email address here. We
//           will send updates occasionally.
//         </DialogContentText>
//         <TextField
//           autoFocus
//           margin='dense'
//           label='Announcement'
//           type='text'
//           fullWidth
//           value={announcementValue}
//           onChange={handleAnnouncementChange}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onModalClose} color='primary'>
//           Cancel
//         </Button>
//         <Button onClick={onModalSubmit} color='primary'>
//           Submit
//         </Button>
//       </DialogActions>
//     </Dialog>
//   )
// }

// export default Modals

import React, { FC, useState } from 'react'