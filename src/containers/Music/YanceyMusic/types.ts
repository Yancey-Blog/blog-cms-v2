export interface IYanceyMusic {
  readonly _id: string
  readonly title: string
  readonly soundCloudUrl: string
  readonly posterUrl: string
  readonly releaseDate: string
  readonly createdAt: string
  readonly updatedAt: string
}

export interface Query {
  getYanceyMusic: IYanceyMusic[]
}
