import { PopoverOrigin, SnackbarOrigin } from '@material-ui/core'
import { MUIDataTableOptions } from 'mui-datatables'

export const RECAPTCHA_KEY = '6LdLTDgUAAAAAPq-N2YNVoqcYPLyDTypJ8SMvCEj'

export const SNACKBAR_ANCHOR_ORIGIN: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'center',
}

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

export const PASSWORD_REGEXP = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/

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
