export interface IBaseParams {
  _id: string
  createdAt: string
  updatedAt: string
}

export interface IBatchDeleteRes {
  n: number
  ok: number
  deletedCount: number
}
