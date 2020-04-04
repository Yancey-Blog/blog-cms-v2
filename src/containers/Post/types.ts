export interface IPost {
  readonly _id: string
  readonly title: string
  readonly summary: string
  readonly posterUrl: string
  readonly tags: string[]
  readonly content: string
  readonly createdAt: string
  readonly updatedAt: string
}
