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

export const addPostToAlgolia = async (
  objectID: string,
  name: string,
  description: string,
  content: string,
) => {
  try {
    await index.saveObject(
      {
        objectID,
        name,
        description,
        content,
      },
      { autoGenerateObjectIDIfNotExist: true },
    )
  } catch (e) {
    SnackbarUtils.error(e.message)
  }
}
