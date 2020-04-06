export interface IMotto {
  _id: string
  weight: number
  content: string
  createdAt: string
  updatedAt: string
}

export interface Query {
  getMottos: IMotto[]
}
