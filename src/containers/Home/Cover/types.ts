export interface ICover {
  _id: string
  title: string
  coverUrl: string
  isPublic: boolean
  weight: number
  createdAt: string
  updatedAt: string
}

export interface Query {
  getCovers: ICover[]
}
