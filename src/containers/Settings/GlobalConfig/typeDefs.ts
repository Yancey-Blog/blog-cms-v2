import { gql } from '@apollo/client'

const GLOBAL_SETTING_FRAGMENT = gql`
  fragment GlobalSettingFragment on GlobalSettingModel {
    _id
    releasePostId
    cvPostId
    isGrayTheme
  }
`

export const GLOBAL_SETTING = gql`
  query GetGlobalSetting {
    getGlobalSetting {
      ...GlobalSettingFragment
    }
  }
  ${GLOBAL_SETTING_FRAGMENT}
`

export const UPDATE_GLOBAL_SETTING_BY_ID = gql`
  mutation UpdateGlobalSettingById($input: UpdateGlobalSettingInput!) {
    updateGlobalSettingById(input: $input) {
      ...GlobalSettingFragment
    }
  }
  ${GLOBAL_SETTING_FRAGMENT}
`
