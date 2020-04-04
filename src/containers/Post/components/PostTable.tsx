import React, { FC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
  MUIDataTableMeta,
} from 'mui-datatables'
import { FormControl, Fab, Switch, Tooltip, Chip } from '@material-ui/core'
import { DeleteOutline, Edit, AddBox } from '@material-ui/icons'
import { sortBy } from 'yancey-js-util'
import styles from '../post.module.scss'
import { formatDate, stringfySearch } from 'src/shared/utils'
import TableWrapper from 'src/components/TableWrapper/TableWrapper'
import Loading from 'src/components/Loading/Loading'
import ConfirmPoper from 'src/components/ConfirmPoper/ConfirmPoper'
import { IPost } from '../types'
import useStyles from '../styles'

interface Props {
  dataSource: IPost[]
  isFetching: boolean
  isDeleting: boolean
  isBatchDeleting: boolean
  deletePostById: Function
  deletePosts: Function
  updatePostById: Function
}

const PostTable: FC<Props> = ({
  dataSource,
  deletePostById,
  deletePosts,
  updatePostById,
  isFetching,
  isDeleting,
  isBatchDeleting,
}) => {
  const history = useHistory()
  const { pathname } = useLocation()
  const toEditPage = (id?: string) => {
    history.push({
      pathname: `${pathname}/config`,
      search: stringfySearch({ id }),
    })
  }

  const classes = useStyles()

  const columns: MUIDataTableColumn[] = [
    { name: '_id', label: 'Id' },
    { name: 'title', label: 'Title' },
    {
      name: 'summary',
      label: 'Summary',
      options: {
        customBodyRender: (value: string) => (
          <Tooltip title={value} placement="top">
            <span>{value.slice(0, 15)}...</span>
          </Tooltip>
        ),
      },
    },
    {
      name: 'tags',
      label: 'Tags',
      options: {
        customBodyRender: (value: string[]) => (
          <>
            {value.map((tag) => (
              <Chip
                className={classes.btn}
                label={tag}
                clickable
                color="primary"
              />
            ))}
          </>
        ),
      },
    },
    {
      name: 'isPublic',
      label: 'IsPublic',
      options: {
        customBodyRender: (value: boolean, tableMeta: MUIDataTableMeta) => {
          const id = tableMeta.rowData[0]

          return (
            <Switch
              checked={value}
              onChange={(e) => {
                updatePostById({
                  variables: { input: { isPublic: e.target.checked, id } },
                })
              }}
            />
          )
        },
      },
    },
    { name: 'like', label: 'Like' },
    { name: 'pv', label: 'PV' },
    {
      name: 'createdAt',
      label: 'CreatedAt',
      options: {
        customBodyRender: (value: string) => <span>{formatDate(value)}</span>,
      },
    },
    {
      name: 'lastModifiedDate',
      label: 'Last Modified Date',
      options: {
        customBodyRender: (value: string) => <span>{formatDate(value)}</span>,
      },
    },
    {
      name: 'action',
      label: 'Action',
      options: {
        filter: false,
        customBodyRender(value, tableMeta) {
          const curId = tableMeta.rowData[0]
          return (
            <>
              <FormControl>
                <Edit
                  style={{ marginRight: '12px', cursor: 'pointer' }}
                  onClick={() => toEditPage(curId)}
                />
              </FormControl>
              <FormControl>
                <ConfirmPoper
                  onOk={() => deletePostById({ variables: { id: curId } })}
                >
                  <DeleteOutline className={styles.addIcon} />
                </ConfirmPoper>
              </FormControl>
            </>
          )
        },
      },
    },
  ]

  const options: MUIDataTableOptions = {
    filterType: 'textField',
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 50],
    searchPlaceholder: 'Search...',
    customToolbar() {
      return (
        <Fab size="medium" className={styles.addIconFab}>
          <AddBox className={styles.addIcon} onClick={() => toEditPage()} />
        </Fab>
      )
    },
    customToolbarSelect(selectedRows) {
      const ids = selectedRows.data.map(
        (row: { index: number; dataIndex: number }) =>
          dataSource[row.index]._id,
      )
      return (
        <Fab size="medium" className={styles.addIconFab}>
          <ConfirmPoper onOk={() => deletePosts({ variables: { ids } })}>
            <DeleteOutline className={styles.addIcon} />
          </ConfirmPoper>
        </Fab>
      )
    },
  }

  return (
    <TableWrapper tableName="Post" icon="save">
      <MUIDataTable
        title=""
        data={dataSource.sort(sortBy('updatedAt')).reverse()}
        columns={columns}
        options={options}
      />
      {(isFetching || isDeleting || isBatchDeleting) && <Loading />}
    </TableWrapper>
  )
}

export default PostTable
