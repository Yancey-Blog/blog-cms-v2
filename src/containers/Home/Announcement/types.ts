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
