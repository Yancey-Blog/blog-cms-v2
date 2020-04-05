export interface IMotto {
  _id: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface Query {
  getMottos: IMotto[]
}
