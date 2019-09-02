import React from 'react'
import Fab from '@material-ui/core/Fab'
import Button from '@material-ui/core/Button'
import {
  Edit,
  DeleteOutline,
  Close,
  Check,
  AddBox,
  Delete,
  DateRange,
} from '@material-ui/icons'
import {
  Plugin,
  Template,
  TemplatePlaceholder,
  Getter,
} from '@devexpress/dx-react-core'
import { DataTypeProvider } from '@devexpress/dx-react-grid'
import {
  TableFilterRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui'
import { formatJSONDate } from 'shared/utils'
import styles from './Tables.module.scss'

export const CustomEditorColumnTxt = ({ id, text, onExecute }) => {
  if (id === 'edit') {
    return (
      <Fab aria-label='editor' size='small' className={styles.editorIcon}>
        <Edit onClick={onExecute} />
      </Fab>
    )
  } else if (id === 'cancel') {
    return (
      <Fab aria-label='editor' size='small' className={styles.editorIcon}>
        <Close onClick={onExecute} />
      </Fab>
    )
  } else if (id === 'delete') {
    return (
      <Fab aria-label='editor' size='small' className={styles.editorIcon}>
        <DeleteOutline onClick={onExecute} />
      </Fab>
    )
  } else if (id === 'commit') {
    return (
      <Fab aria-label='editor' size='small' className={styles.editorIcon}>
        <Check onClick={onExecute} />
      </Fab>
    )
  } else {
    return (
      <Fab aria-label='editor' size='small' className={styles.editorIcon}>
        <AddBox onClick={onExecute} />
      </Fab>
    )
  }
}

export const BatchDelete = ({ length, onClick }) => (
  <Plugin name='customToolbarMarkup'>
    <Template name='toolbarContent'>
      <TemplatePlaceholder />
      <Button
        variant='contained'
        color='secondary'
        disabled={length === 0}
        onClick={onClick}
      >
        <Delete className={styles.batchdeleteIcon} />
        Batch Delete
      </Button>
    </Template>
  </Plugin>
)

export const FilterIcon = ({ type, ...restProps }) => {
  if (type === 'month') return <DateRange {...restProps} />
  return <TableFilterRow.Icon type={type} {...restProps} />
}

export const DateFormatter = ({
  value,
}: DataTypeProvider.ValueFormatterProps) => <span>{formatJSONDate(value)}</span>

export const getHiddenColumnsFilteringExtensions = hiddenColumnNames =>
  hiddenColumnNames.map(columnName => ({
    columnName,
    predicate: () => false,
  }))

export const getRowId = (row: any) => row._id

export const CustomEditorColumn = () => (
  <Getter
    name='tableColumns'
    computed={({ tableColumns }) => {
      const result = [
        ...tableColumns.filter(c => c.type !== TableEditColumn.COLUMN_TYPE),
        {
          key: 'editCommand',
          type: TableEditColumn.COLUMN_TYPE,
          width: 160,
        },
      ]
      return result
    }}
  />
)
