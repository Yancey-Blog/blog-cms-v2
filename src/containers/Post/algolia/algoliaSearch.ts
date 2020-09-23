import algoliasearch from 'algoliasearch'
import SnackbarUtils from 'src/components/Toast/Toast'

const {
  REACT_APP_ALGOLIA_APPLICATION_ID,
  REACT_APP_ALGOLIA_ADMIN_API_KEY,
  REACT_APP_ALGOLIA_SEARCH_INDEX,
} = process.env

const client = algoliasearch(
  REACT_APP_ALGOLIA_APPLICATION_ID || '',
  REACT_APP_ALGOLIA_ADMIN_API_KEY || '',
)
const index = client.initIndex(REACT_APP_ALGOLIA_SEARCH_INDEX || '')

export const sendPostToAlgolia = async (
  objectID: string,
  name: string,
  description: string,
  content: string,
  imageUrl: string,
  labels: string[],
) => {
  try {
    await index.saveObject(
      {
        objectID,
        name,
        description,
        content,
        imageUrl,
        labels,
      },
      { autoGenerateObjectIDIfNotExist: true },
    )
  } catch (e) {
    SnackbarUtils.error(e.message)
  }
}

export const deletePostOnAlgolia = async (objectID: string) => {
  try {
    await index.deleteObject(objectID)
  } catch (e) {
    SnackbarUtils.error(e.message)
  }
}

export const deletePostsOnAlgolia = async (objectIDs: string[]) => {
  try {
    await index.deleteObjects(objectIDs)
  } catch (e) {
    SnackbarUtils.error(e.message)
  }
}
