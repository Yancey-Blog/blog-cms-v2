/* Post */
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

export interface CreatePostMutation {
  createPost: IPostItem
}

export interface UpdatePostByIdMutation {
  updatePostById: IPostItem
}

export interface CreatePostVars {
  input: {
    posterUrl: string
    title: string
    summary: string
    content: string
    tags: string[]
    lastModifiedDate: string
    isPublic: boolean
  }
}

export interface UpdatePostVars {
  input: {
    id: string
    posterUrl: string
    title: string
    summary: string
    content: string
    tags: string[]
    lastModifiedDate: string
    isPublic: boolean
  }
}

export enum SaveType {
  DRAFT,
  FINALIZE,
}

/* PostStatistics */

export interface IPostStatisticsGroupItem {
  readonly _id: string
  readonly date: string
  readonly count: number
  readonly items: Array<{
    readonly postId: string
    readonly postName: string
    readonly scenes: string
    readonly operatedAt: string
  }>
}

export interface IPostStatistics {
  readonly _id: string
  readonly postId: string
  readonly postName: string
  readonly scenes: string
  readonly createdAt: string
  readonly updatedAt: string
}

export interface PostStatisticsVars {
  input: {
    postId: string
    postName: string
    scenes: string
  }
}

export interface CreatePostStatisticsMutation {
  createPostStatistics: IPostStatistics
}
