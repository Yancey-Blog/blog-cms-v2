export interface IPlayer {
  readonly _id: string
  readonly title: string
  readonly artist: string
  readonly lrc: string
  readonly coverUrl: string
  readonly musicFileUrl: string
  readonly isPublic: boolean
  readonly createdAt: Date
  readonly updatedAt: Date
}

export interface Query {
  getPlayers: IPlayer[]
}
