export interface IBestAlbum {
  readonly _id: string
  readonly title: string
  readonly artist: string
  readonly coverUrl: string
  readonly mvUrl: string
  readonly releaseDate: string
  readonly createdAt: string
  readonly updatedAt: string
}

export interface Query {
  getBestAlbum: IBestAlbum[]
}
