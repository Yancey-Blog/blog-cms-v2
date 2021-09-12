import { PopoverOrigin, SnackbarOrigin } from '@material-ui/core'
import { MUIDataTableOptions } from 'mui-datatables'

export const SNACKBAR_ANCHOR_ORIGIN: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'center',
}

export const GOOGLE_RECAPTCHA_URL = `https://www.google.com/recaptcha/api.js?render=${process.env.REACT_APP_RECAPTCHA_KEY}`

export const SNACKBAR_MAX_NUM = 1

export const SNACKBAR_AUTO_HIDE_DURATION = 3000

export const POPOVER_ANCHOR_ORIGIN: PopoverOrigin = {
  vertical: 'bottom',
  horizontal: 'left',
}

export const POPOVER_TRANSFORM_ORIGIN: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'center',
}

export const RECOVERY_CODES_FILE_NAME = 'yancey-blog-cms-recovery-codes.txt'

export const PASSWORD_REGEXP =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/

export const MARKDOWN_EDITOR_TOOLBAR_ITEMS = [
  'heading',
  'bold',
  'italic',
  'strike',
  'divider',
  'hr',
  'quote',
  'divider',
  'ul',
  'ol',
  'task',
  'indent',
  'outdent',
  'divider',
  'table',
  'link',
  'divider',
  'code',
  'codeblock',
]

export const DRAWER_WIDTH = 260

export const FOLDER_DRAWER_WIDTH = 80

export const VIEW_DATE = ['Day', 'Week', 'Month']

export const TABLE_OPTIONS: MUIDataTableOptions = {
  filterType: 'textField',
  rowsPerPage: 10,
  rowsPerPageOptions: [10, 20, 50],
  searchPlaceholder: 'Search...',
}

export const AZURE_BLOB_PATH = 'https://edge.yancey.app/beg'

export const GOOGLE_AUTHENTICATOR_FOR_IOS =
  'https://itunes.apple.com/us/app/google-authenticator/id388497605'

export const GOOGLE_AUTHENTICATOR_FOR_ANDROID =
  'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2'

export const YANCEY_BLOG_URL = 'https://www.yanceyleo.com'

export const YANCEY_GITHUB_URL = 'https://www.github.com/YanceyOfficial'

export const YANCEY_EMAIL_URL = 'yanceyofficial@gmail.com'
