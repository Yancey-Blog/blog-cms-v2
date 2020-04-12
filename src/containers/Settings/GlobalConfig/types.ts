import { IPostItem } from 'src/containers/Post/types'

export interface PostFilterProps {
  id: string
  isFetching: boolean
  isSubmitting: boolean
  fetchPosts: Function
  updateGlobalSettingById: Function
  posts: IPostItem[]
}

export interface IGlobalSetting {
  _id: string
  releasePostId: string
  cvPostId: string
  isGrayTheme: boolean
  createdAt: string
  updatedAt: string
}

export interface Query {
  getGlobalSetting: IGlobalSetting
}
