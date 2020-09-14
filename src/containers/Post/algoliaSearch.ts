import algoliasearch from 'algoliasearch'
import SnackbarUtils from 'src/components/Toast/Toast'

const {
  REACT_APP_ALGOLIA_APPLICATION_ID,
  REACT_APP_ALGOLIA_ADMIN_API_KEY,
  REACT_APP_ALGOLIA_SEARCH_INDEX,
} = process.env

const client = algoliasearch(
  REACT_APP_ALGOLIA_APPLICATION_ID as string,
  REACT_APP_ALGOLIA_ADMIN_API_KEY as string,
)
const index = client.initIndex(REACT_APP_ALGOLIA_SEARCH_INDEX as string)

export const addPostToAlgolia = async (
  objectID: string,
  title: string,
  content: string,
) => {
  try {
    await index.saveObject(
      {
        objectID,
        title,
        content,
      },
      { autoGenerateObjectIDIfNotExist: true },
    )
  } catch (e) {
    SnackbarUtils.error(e.message)
  }
}
