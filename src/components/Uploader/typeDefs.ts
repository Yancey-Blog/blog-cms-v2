import { gql } from '@apollo/client'

export const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
      name
    }
  }
`
