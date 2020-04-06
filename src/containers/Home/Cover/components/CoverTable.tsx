import React, { FC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
  MUIDataTableMeta,
} from 'mui-datatables'
import { DeleteOutline, Edit, AddBox, UpdateOutlined } from '@material-ui/icons'
import { FormControl, Fab, Popover, Switch } from '@material-ui/core'
import { formatDate, stringfySearch } from 'src/shared/utils'
import TableWrapper from 'src/components/TableWrapper/TableWrapper'
import Loading from 'src/components/Loading/Loading'
import ConfirmPoper from 'src/components/ConfirmPoper/ConfirmPoper'
import Move from 'src/components/Move/Move'
import useStyles from 'src/shared/styles'
import {
  POPOVER_ANCHOR_ORIGIN,
  POPOVER_TRANSFORM_ORIGIN,
} from 'src/shared/constants'
import { ICover } from '../types'

interface Props {
  dataSource: ICover[]
  isFetching: boolean
  isDeleting: boolean
  isExchanging: boolean
  isBatchDeleting: boolean
  isPublicingCovers: boolean
  deleteCoverById: Function
  deleteCovers: Function
  updateCoverById: Function
  exchangePosition: Function
  publicCovers: Function
}

const CoverTable: FC<Props> = ({
  dataSource,
  deleteCoverById,
  deleteCovers,
  updateCoverById,
  exchangePosition,
  publicCovers,
  isFetching,
  isDeleting,
  isExchanging,
  isBatchDeleting,
  isPublicingCovers,
}) => {
  const history = useHistory()
  const { pathname } = useLocation()
  const showModal = (id?: string) => {
    history.push({ pathname, search: stringfySearch({ id, showModal: true }) })
  }

  const classes = useStyles()

  const columns: MUIDataTableColumn[] = [
    { name: '_id', label: 'Id' },
    { name: 'weight', label: 'Weight' },
    { name: 'title', label: 'title' },
    {
      name: 'coverUrl',
      label: 'Cove rUrl',
      options: {
        customBodyRender: (value: string, tableMeta: MUIDataTableMeta) => {
          const curName = tableMeta.rowData[2]
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
      name: 'isPublic',
      label: 'IsPublic',
      options: {
        customBodyRender: (value: boolean, tableMeta: MUIDataTableMeta) => {
          const id = tableMeta.rowData[0]

          return (
            <Switch
              checked={value}
              onChange={(e) => {
                updateCoverById({
                  variables: { input: { isPublic: e.target.checked, id } },
                  optimisticResponse: {
                    __typename: 'Mutation',
                    updateCoverById: {
                      id,
                      __typename: 'CoverModel',
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
                  className={classes.editIcon}
                  onClick={() => showModal(curId)}
                />
              </FormControl>
              <FormControl>
                <ConfirmPoper
                  onOk={() => deleteCoverById({ variables: { id: curId } })}
                >
                  <DeleteOutline />
                </ConfirmPoper>
              </FormControl>

              <Move
                dataSource={dataSource}
                tableMeta={tableMeta}
                exchangePosition={exchangePosition}
              />
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
        <Fab size="medium" className={classes.addIconFab}>
          <AddBox onClick={() => showModal()} />
        </Fab>
      )
    },
    customToolbarSelect(selectedRows) {
      const ids = selectedRows.data.map(
        (row: { index: number; dataIndex: number }) =>
          dataSource[row.index]._id,
      )
      return (
        <div>
          <Fab size="medium" className={classes.addIconFab}>
            <ConfirmPoper onOk={() => deleteCovers({ variables: { ids } })}>
              <DeleteOutline />
            </ConfirmPoper>
          </Fab>
          <Fab size="medium" className={classes.addIconFab}>
            <UpdateOutlined
              onClick={() => publicCovers({ variables: { ids } })}
            />
          </Fab>
        </div>
      )
    },
  }

  return (
    <TableWrapper tableName="Cover" icon="save">
      <MUIDataTable
        title=""
        data={dataSource}
        columns={columns}
        options={options}
      />
      {(isFetching ||
        isDeleting ||
        isBatchDeleting ||
        isExchanging ||
        isPublicingCovers) && <Loading />}
    </TableWrapper>
  )
}

export default CoverTable
