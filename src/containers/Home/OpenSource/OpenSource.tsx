import React, { FC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
  MUIDataTableMeta,
} from 'mui-datatables'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { DeleteOutline, Edit, AddBox } from '@material-ui/icons'
import { FormControl, Fab, Button, Popover } from '@material-ui/core'
import { OPEN_SOURCES, DELETE_ONE_OPEN_SOURCE } from './gql'
import styles from './OpenSource.module.scss'
import { formatDate } from '../../../shared/utils'
import TableWrapper from '../../../components/TableWrapper/TableWrapper'
import Loading from '../../../components/Loading/Loading'
import OpenSourceModal from './components/OpenSourceModal'

const OpenSource: FC = () => {
  const history = useHistory()

  const { pathname } = useLocation()

  const showModal = (id?: string) => {
    history.push(pathname, { showModal: true, id })
  }

  const { loading, error, data } = useQuery(OPEN_SOURCES, {
    // variables: {},
    // skip: !id, // 如果不存在 id, 则跳过该查询
    // pollInterval: 500, // 轮询周期
    notifyOnNetworkStatusChange: true, // 如果因为网络状况导致 query 失败, 告知用户手动 refetch
  })

  const [deleteOpenSourceById] = useMutation(DELETE_ONE_OPEN_SOURCE, {
    update(cache, { data: { deleteOpenSourceById } }) {
      // @ts-ignore
      const { getOpenSources } = cache.readQuery({ query: OPEN_SOURCES })
      cache.writeQuery({
        query: OPEN_SOURCES,
        data: {
          getOpenSources: getOpenSources.filter((v: any) => v._id !== deleteOpenSourceById._id),
        },
      })
    },
  })

  const handleDeleteOneChange = (id: string) => {
    deleteOpenSourceById({ variables: { id } })
  }

  const columns: MUIDataTableColumn[] = [
    { name: '_id', label: 'Id' },
    { name: 'title', label: 'Title' },
    { name: 'description', label: 'Description' },
    {
      name: 'url',
      label: 'Url',
      options: {
        customBodyRender: (value: string) => (
          <Button href={value} color="secondary" target="_blank" rel="noopener noreferrer">
            {value}
          </Button>
        ),
      },
    },
    {
      name: 'posterUrl',
      label: 'PosterUrl',
      options: {
        customBodyRender: (value: string, tableMeta: MUIDataTableMeta) => (
          <PopupState variant="popover" popupId="imagePoperOver">
            {popupState => (
              <div>
                <img
                  src={value}
                  style={{ width: '150px' }}
                  alt={tableMeta.rowData[1]}
                  {...bindTrigger(popupState)}
                />
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  disableRestoreFocus
                >
                  <img
                    src={value}
                    style={{ width: '800px', display: 'block' }}
                    alt={tableMeta.rowData[1]}
                  />
                </Popover>
              </div>
            )}
          </PopupState>
        ),
      },
    },
    {
      name: 'createdAt',
      label: 'CreatedAt',
      options: {
        customBodyRender: (value: string) => <span>{formatDate(value)}</span>,
      },
    },
    {
      name: 'updatedAt',
      label: 'UpdatedAt',
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
          return (
            <>
              <FormControl>
                <Edit
                  style={{ marginRight: '12px', cursor: 'pointer' }}
                  onClick={() => showModal(tableMeta.rowData[0])}
                />
              </FormControl>
              <FormControl>
                <DeleteOutline
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDeleteOneChange(tableMeta.rowData[0])}
                />
              </FormControl>
            </>
          )
        },
      },
    },
  ]

  const options: MUIDataTableOptions = {
    filterType: 'textField',
    responsive: 'stacked',
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 50],
    searchPlaceholder: 'Search...',
    customToolbar() {
      return (
        <Fab size="medium" className={styles.addIconFab}>
          <AddBox className={styles.addIcon} onClick={() => showModal()} />
        </Fab>
      )
    },
    customToolbarSelect(selectedRows) {
      // const ids = selectedRows.data.map((row: any) => getOpenSources[row.index]._id)
      return (
        <Fab size="medium" className={styles.addIconFab}>
          <DeleteOutline className={styles.addIcon} onClick={() => {}} />
        </Fab>
      )
    },
  }

  if (loading) return <Loading />
  if (error) return <p>Error :(</p>

  return (
    <>
      <TableWrapper tableName="Open Source" icon="save">
        <MUIDataTable title="" data={data.getOpenSources} columns={columns} options={options} />
      </TableWrapper>

      <OpenSourceModal />
    </>
  )
}

export default OpenSource
