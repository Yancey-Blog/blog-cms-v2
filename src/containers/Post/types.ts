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

export interface IPostStatistics {
  readonly _id: string
  readonly postId: string
  readonly postName: string
  readonly scenes: string
  readonly createdAt: string
  readonly updatedAt: string
}

export interface Query {
  getPosts: IPost
}

export enum SaveType {
  DRAFT,
  FINALIZE,
}
