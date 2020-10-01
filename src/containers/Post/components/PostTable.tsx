import React, { FC, useState, ChangeEvent } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import MUIDataTable, {
  MUIDataTableColumn,
  MUIDataTableMeta,
} from 'mui-datatables'
import {
  FormControl,
  Fab,
  Switch,
  Tooltip,
  Chip,
  Select,
  MenuItem,
  Paper,
  IconButton,
  Divider,
  InputBase,
} from '@material-ui/core'
import { DeleteOutline, Edit, AddBox, Search, Clear } from '@material-ui/icons'
import { Pagination } from '@material-ui/lab'
import { formatDate, stringfySearch } from 'src/shared/utils'
import TableWrapper from 'src/components/TableWrapper/TableWrapper'
import Loading from 'src/components/Loading/Loading'
import ConfirmPoper from 'src/components/ConfirmPoper/ConfirmPoper'
import ImagePopup from 'src/components/ImagePopup/ImagePopup'
import globalUseStyles from 'src/shared/globalStyles'
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
      pathname: `${pathname}/edit`,
      search: stringfySearch({ id }),
    })
  }

  const classes = useStyles()
  const globalClasses = globalUseStyles()

  const [searchTitle, setSearchTitle] = useState('')

  const fetchData = (page: number, pageSize: number, title?: string) => {
    fetchPostsByPage({
      variables: {
        input: {
          page,
          pageSize,
          title,
        },
      },
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(e.target.value)
  }

  const handlePageChange = (currentPage: number) => {
    fetchData(currentPage, pageSize, searchTitle)
  }

  const handlePageSizeChange = (e: ChangeEvent<{ value: unknown }>) => {
    fetchData(page, e.target.value as number, searchTitle)
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
        // @ts-ignore
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
          return <ImagePopup imgName={curTitle} imgUrl={value} />
        },
      },
    },
    {
      name: 'isPublic',
      label: 'IsPublic',
      options: {
        // @ts-ignore
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

  return (
    <>
      <Paper className={classes.search}>
        <InputBase
          className={classes.input}
          placeholder="Search Posts by Title"
          inputProps={{ 'aria-label': 'search post by title' }}
          onChange={handleInputChange}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
          onClick={() => fetchData(page, pageSize, searchTitle)}
        >
          <Search />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="clear"
          onClick={() => fetchData(page, pageSize, '')}
        >
          <Clear />
        </IconButton>
      </Paper>
      <TableWrapper tableName="Post" icon="save">
        <MUIDataTable
          title=""
          data={dataSource}
          columns={columns}
          options={{
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
                  <ConfirmPoper
                    onOk={() => deletePosts({ variables: { ids } })}
                  >
                    <DeleteOutline />
                  </ConfirmPoper>
                </Fab>
              )
            },
          }}
        />

        {total === 0 || (
          <div className={classes.pagination}>
            <Select value={pageSize} onChange={handlePageSizeChange}>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
            <Pagination
              count={Math.ceil(total / 10)}
              color="primary"
              page={page}
              onChange={(e, page) => handlePageChange(page)}
            />
          </div>
        )}

        {(isFetching || isDeleting || isBatchDeleting) && <Loading />}
      </TableWrapper>
    </>
  )
}

export default PostTable
