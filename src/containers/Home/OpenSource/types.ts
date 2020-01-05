export interface IOpenSource {
  _id: string
  title: string
  description: string
  url: string
  posterUrl: string
  createdAt: string
  updatedAt: string
}

export interface Query {
  getOpenSources: IOpenSource[]
}
