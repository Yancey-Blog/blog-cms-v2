import React, { FC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
  MUIDataTableMeta,
} from 'mui-datatables'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { DeleteOutline, Edit, AddBox } from '@material-ui/icons'
import { FormControl, Fab, Popover, Button } from '@material-ui/core'
import { sortBy } from 'yancey-js-util'
import styles from '../bestAlbum.module.scss'
import { formatDate, stringfySearch } from 'src/shared/utils'
import TableWrapper from 'src/components/TableWrapper/TableWrapper'
import Loading from 'src/components/Loading/Loading'
import ConfirmPoper from 'src/components/ConfirmPoper/ConfirmPoper'
import {
  POPOVER_ANCHOR_ORIGIN,
  POPOVER_TRANSFORM_ORIGIN,
} from 'src/shared/constants'
import { IBestAlbum } from '../types'

interface Props {
  dataSource: IBestAlbum[]
  isFetching: boolean
  isDeleting: boolean
  isBatchDeleting: boolean
  deleteBestAlbumById: Function
  deleteBestAlbums: Function
}

const BestAlbumTable: FC<Props> = ({
  dataSource,
  deleteBestAlbumById,
  deleteBestAlbums,
  isFetching,
  isDeleting,
  isBatchDeleting,
}) => {
  const history = useHistory()

  const { pathname } = useLocation()

  const showModal = (id?: string) => {
    history.push({ pathname, search: stringfySearch({ id, showModal: true }) })
  }

  const columns: MUIDataTableColumn[] = [
    { name: '_id', label: 'Id' },
    { name: 'title', label: 'Title' },
    { name: 'artist', label: 'Artist' },
    {
      name: 'mvUrl',
      label: 'mvUrl',
      options: {
        customBodyRender: (value: string) => (
          <Button
            href={value}
            color="secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {value.slice(0, 20)}...
          </Button>
        ),
      },
    },
    {
      name: 'coverUrl',
      label: 'CoverUrl',
      options: {
        customBodyRender: (value: string, tableMeta: MUIDataTableMeta) => {
          const curName = tableMeta.rowData[1]
          return (
            <PopupState variant="popover" popupId="imagePoperOver">
              {(popupState) => (
                <div>
                  <img
                    src={value}
                    style={{ width: '150px' }}
                    alt={curName}
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
                      style={{ width: '400px', display: 'block' }}
                      alt={curName}
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
      name: 'releaseDate',
      label: 'ReleaseDate',
      options: {
        customBodyRender: (value: string) => <span>{formatDate(value)}</span>,
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
                <ConfirmPoper
                  onOk={() => deleteBestAlbumById({ variables: { id: curId } })}
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
          <AddBox className={styles.addIcon} onClick={() => showModal()} />
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
          <ConfirmPoper onOk={() => deleteBestAlbums({ variables: { ids } })}>
            <DeleteOutline className={styles.addIcon} />
          </ConfirmPoper>
        </Fab>
      )
    },
  }

  return (
    <TableWrapper tableName="Best Album" icon="save">
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

export default BestAlbumTable
