export interface IPost {
  readonly page: number
  readonly pageSize: number
  readonly total: number
  readonly items: IPostItem[]
}

export interface IPostItem {
  readonly _id: string
  readonly posterUrl: string
  readonly title: string
  readonly summary: string
  readonly content: string
  readonly tags: string[]
  readonly lastModifiedDate: string
  readonly like: number
  readonly pv: number
  readonly isPublic: boolean
  readonly createdAt: string
  readonly updatedAt: string
}

export interface Query {
  getPosts: IPost
}
