import { Open } from 'src/hooks/useOpenModal'

export interface IAnnouncement {
  _id: string
  weight: number
  content: string
  createdAt: string
  updatedAt: string
}

export interface Query {
  getAnnouncements: IAnnouncement[]
}

export interface CreateAnnouncementMutation {
  createAnnouncement: IAnnouncement
}

export interface CreateAnnouncementVars {
  input: {
    content: string
  }
}

export interface DeleteAnnouncementByIdMutation {
  deleteAnnouncementById: IAnnouncement
}

export interface DeleteAnnouncementByIdVars {
  id: string
}

export interface AnnouncementTableProps {
  dataSource: IAnnouncement[]
  isFetching: boolean
  isDeleting: boolean
  isExchanging: boolean
  isBatchDeleting: boolean
  createAnnouncement: Function
  updateAnnouncementById: Function
  deleteAnnouncementById: Function
  deleteAnnouncements: Function
  exchangePosition: Function
}

export interface AnnouncementModalProps {
  open: Open
  handleOpen: Function
  createAnnouncement: Function
  updateAnnouncementById: Function
}
