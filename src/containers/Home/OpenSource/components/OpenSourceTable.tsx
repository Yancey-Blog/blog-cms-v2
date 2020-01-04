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
import { useSnackbar } from 'notistack'
import { sortBy } from 'yancey-js-util'
import { OPEN_SOURCES, DELETE_ONE_OPEN_SOURCE, BATCH_DELETE_OPEN_SOURCE } from '../typeDefs'
import { IOpenSource } from '../interfaces/openSource.interface'
import styles from './openSource.module.scss'
import { formatDate, stringfySearch } from '../../../../shared/utils'
import TableWrapper from '../../../../components/TableWrapper/TableWrapper'
import Loading from '../../../../components/Loading/Loading'
import ConfirmPoper from '../../../../components/ConfirmPoper/ConfirmPoper'
import OpenSourceModal from '../components/OpenSourceModal'

const OpenSourceTable: FC = () => {
  const history = useHistory()

  const { pathname } = useLocation()

  const { enqueueSnackbar } = useSnackbar()

  const showModal = (id?: string) => {
    history.push({ pathname, search: stringfySearch({ id, showModal: true }) })
  }

  const { loading: isFetching, error, data } = useQuery(OPEN_SOURCES, {
    notifyOnNetworkStatusChange: true,
  })

  const [deleteOpenSourceById, { loading: isDeleting }] = useMutation(DELETE_ONE_OPEN_SOURCE, {
    update(cache, { data: { deleteOpenSourceById } }) {
      // @ts-ignore
      const { getOpenSources } = cache.readQuery({ query: OPEN_SOURCES })
      cache.writeQuery({
        query: OPEN_SOURCES,
        data: {
          getOpenSources: getOpenSources.filter(
            (openSource: IOpenSource) => openSource._id !== deleteOpenSourceById._id,
          ),
        },
      })
    },
    onCompleted() {
      enqueueSnackbar('delete success!', { variant: 'success' })
    },
  })

  const [deleteOpenSources, { loading: isBatchDeleting }] = useMutation(BATCH_DELETE_OPEN_SOURCE, {
    update(cache, { data: { deleteOpenSources } }) {
      // @ts-ignore
      const { getOpenSources } = cache.readQuery({ query: OPEN_SOURCES })
      cache.writeQuery({
        query: OPEN_SOURCES,
        data: {
          getOpenSources: getOpenSources.filter(
            (openSource: IOpenSource) => !deleteOpenSources.ids.includes(openSource._id),
          ),
        },
      })
    },
    onCompleted() {
      enqueueSnackbar('delete success!', { variant: 'success' })
    },
  })

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
        customBodyRender: (value: string, tableMeta: MUIDataTableMeta) => {
          const curName = tableMeta.rowData[1]
          return (
            <PopupState variant="popover" popupId="imagePoperOver">
              {popupState => (
                <div>
                  <img
                    src={value}
                    style={{ width: '150px' }}
                    alt={curName}
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
                    <img src={value} style={{ width: '800px', display: 'block' }} alt={curName} />
                  </Popover>
                </div>
              )}
            </PopupState>
          )
        },
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
          const curId = tableMeta.rowData[0]
          return (
            <>
              <FormControl>
                <Edit
                  style={{ marginRight: '12px', cursor: 'pointer' }}
                  onClick={() => showModal(curId)}
                />
              </FormControl>
              <FormControl>
                <ConfirmPoper onOk={() => deleteOpenSourceById({ variables: { id: curId } })}>
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
      const ids = selectedRows.data.map((row: any) => data.getOpenSources[row.index]._id)
      return (
        <Fab size="medium" className={styles.addIconFab}>
          <ConfirmPoper onOk={() => deleteOpenSources({ variables: { ids } })}>
            <DeleteOutline className={styles.addIcon} />
          </ConfirmPoper>
        </Fab>
      )
    },
  }

  if (error) return <p>Error :(</p>

  return (
    <>
      <TableWrapper tableName="Open Source" icon="save">
        <MUIDataTable
          title=""
          data={data ? data.getOpenSources.sort(sortBy('updatedAt')).reverse() : []}
          columns={columns}
          options={options}
        />
        {(isFetching || isDeleting || isBatchDeleting) && <Loading />}
      </TableWrapper>

      <OpenSourceModal />
    </>
  )
}

export default OpenSourceTable
