import React, { FC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
  MUIDataTableMeta,
} from 'mui-datatables'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import {
  FormControl,
  Fab,
  Switch,
  Tooltip,
  Chip,
  Popover,
} from '@material-ui/core'
import { DeleteOutline, Edit, AddBox } from '@material-ui/icons'
import { Pagination } from '@material-ui/lab'
import { sortBy } from 'yancey-js-util'
import { formatDate, stringfySearch } from 'src/shared/utils'
import TableWrapper from 'src/components/TableWrapper/TableWrapper'
import Loading from 'src/components/Loading/Loading'
import ConfirmPoper from 'src/components/ConfirmPoper/ConfirmPoper'
import {
  POPOVER_ANCHOR_ORIGIN,
  POPOVER_TRANSFORM_ORIGIN,
} from 'src/shared/constants'
import globalUseStyles from 'src/shared/styles'
import { IPostItem } from '../types'
import useStyles from '../styles'

interface Props {
  page: number
  pageSize: number
  total: number
  dataSource: IPostItem[]
  isFetching: boolean
  isDeleting: boolean
  isBatchDeleting: boolean
  fetchPostsByPage: Function
  deletePostById: Function
  deletePosts: Function
  updatePostById: Function
}

const PostTable: FC<Props> = ({
  page,
  pageSize,
  total,
  dataSource,
  deletePostById,
  deletePosts,
  updatePostById,
  fetchPostsByPage,
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
  const globalClasses = globalUseStyles()

  const onChangePage = (currentPage: number) => {
    fetchPostsByPage({
      variables: {
        input: {
          page: currentPage,
          pageSize,
        },
      },
    })
  }

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
                key={tag}
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
      name: 'posterUrl',
      label: 'Poster Url',
      options: {
        customBodyRender: (value: string, tableMeta: MUIDataTableMeta) => {
          const curTitle = tableMeta.rowData[1]
          return (
            <PopupState variant="popover" popupId="imagePoperOver">
              {(popupState) => (
                <div>
                  <img
                    src={value}
                    style={{ width: '150px' }}
                    alt={curTitle}
                    {...bindTrigger(popupState)}
                  />
                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={POPOVER_ANCHOR_ORIGIN}
                    transformOrigin={POPOVER_TRANSFORM_ORIGIN}
                    disableRestoreFocus
                  >
                    <img
                      src={value}
                      style={{ height: '400px', display: 'block' }}
                      alt={curTitle}
                    />
                  </Popover>
                </div>
              )}
            </PopupState>
          )
        },
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
                  optimisticResponse: {
                    __typename: 'Mutation',
                    updatePostById: {
                      id,
                      __typename: 'PostItemModel',
                      isPublic: e.target.checked,
                    },
                  },
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
                  className={globalClasses.editIcon}
                  onClick={() => toEditPage(curId)}
                />
              </FormControl>
              <FormControl>
                <ConfirmPoper
                  onOk={() => deletePostById({ variables: { id: curId } })}
                >
                  <DeleteOutline />
                </ConfirmPoper>
              </FormControl>
            </>
          )
        },
      },
    },
  ]

  const options: MUIDataTableOptions = {
    search: false,
    pagination: false,
    filterType: 'textField',
    searchPlaceholder: 'Search...',
    customToolbar() {
      return (
        <Fab size="medium" className={globalClasses.addIconFab}>
          <AddBox onClick={() => toEditPage()} />
        </Fab>
      )
    },
    customToolbarSelect(selectedRows) {
      const ids = selectedRows.data.map(
        (row: { index: number; dataIndex: number }) =>
          dataSource[row.index]._id,
      )
      return (
        <Fab size="medium" className={globalClasses.addIconFab}>
          <ConfirmPoper onOk={() => deletePosts({ variables: { ids } })}>
            <DeleteOutline />
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
      <Pagination
        className={classes.pagination}
        count={Math.ceil(total / 10)}
        color="primary"
        onChange={(e, page) => onChangePage(page)}
      />
      {(isFetching || isDeleting || isBatchDeleting) && <Loading />}
    </TableWrapper>
  )
}

export default PostTable
