export interface ILiveTour {
  _id: string
  title: string
  showTime: string
  posterUrl: string
  createdAt: string
  updatedAt: string
}

export interface Query {
  getLiveTours: ILiveTour[]
}
