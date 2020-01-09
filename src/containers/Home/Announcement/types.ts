export interface IAnnouncement {
  _id: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface Query {
  getAnnouncements: IAnnouncement[]
}
