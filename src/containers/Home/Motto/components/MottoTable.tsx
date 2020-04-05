import React, { FC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
} from 'mui-datatables'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { DeleteOutline, Edit, AddBox, MoreVert } from '@material-ui/icons'
import { FormControl, Fab, Menu, MenuItem } from '@material-ui/core'
import { formatDate, stringfySearch } from 'src/shared/utils'
import TableWrapper from 'src/components/TableWrapper/TableWrapper'
import Loading from 'src/components/Loading/Loading'
import ConfirmPoper from 'src/components/ConfirmPoper/ConfirmPoper'
import useStyles from 'src/shared/styles'
import { IMotto } from '../types'

interface Props {
  dataSource: IMotto[]
  isFetching: boolean
  isDeleting: boolean
  isExchanging: boolean
  isBatchDeleting: boolean
  deleteMottoById: Function
  deleteMottos: Function
  exchangePosition: Function
}

const MottoTable: FC<Props> = ({
  dataSource,
  deleteMottoById,
  deleteMottos,
  exchangePosition,
  isFetching,
  isDeleting,
  isExchanging,
  isBatchDeleting,
}) => {
  const history = useHistory()
  const { pathname } = useLocation()
  const showModal = (id?: string) => {
    history.push({ pathname, search: stringfySearch({ id, showModal: true }) })
  }

  const classes = useStyles()

  const move = (
    curId: string,
    nextId: string,
    curWright: number,
    nextWeight: number,
    closePoper: Function,
  ) => {
    closePoper()

    exchangePosition({
      variables: {
        input: {
          id: curId,
          exchangedId: nextId,
          weight: curWright,
          exchangedWeight: nextWeight,
        },
      },
    })
  }

  const columns: MUIDataTableColumn[] = [
    { name: '_id', label: 'Id' },
    { name: 'weight', label: 'Weight' },
    { name: 'content', label: 'Content' },
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
          const curWright = tableMeta.rowData[1]

          const prev = tableMeta.tableData[dataSource.length - curWright - 1]
          const next = tableMeta.tableData[dataSource.length - curWright + 1]
          const top = tableMeta.tableData[0]

          // @ts-ignore
          const prevId = prev && prev[0]
          // @ts-ignore
          const prevWeight = prev && prev[1]

          // @ts-ignore
          const nextId = next && next[0]
          // @ts-ignore
          const nextWeight = next && next[1]

          // @ts-ignore
          const topId = top[0]
          // @ts-ignore
          const topWeight = top[1]

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
                  onOk={() => deleteMottoById({ variables: { id: curId } })}
                >
                  <DeleteOutline className={classes.editIcon} />
                </ConfirmPoper>
              </FormControl>

              {dataSource.length < 2 || (
                <PopupState variant="popover" popupId="movePoperOver">
                  {(popupState) => (
                    <>
                      <MoreVert
                        style={{ cursor: 'pointer' }}
                        {...bindTrigger(popupState)}
                      />

                      <Menu {...bindMenu(popupState)}>
                        {curWright !== dataSource.length ? (
                          <MenuItem
                            onClick={() =>
                              move(
                                curId,
                                topId,
                                curWright,
                                topWeight,
                                popupState.close,
                              )
                            }
                          >
                            Move to the top
                          </MenuItem>
                        ) : null}

                        {curWright !== dataSource.length ? (
                          <MenuItem
                            onClick={() =>
                              move(
                                curId,
                                prevId,
                                curWright,
                                prevWeight,
                                popupState.close,
                              )
                            }
                          >
                            Move up
                          </MenuItem>
                        ) : null}

                        {curWright !== 1 ? (
                          <MenuItem
                            onClick={() =>
                              move(
                                curId,
                                nextId,
                                curWright,
                                nextWeight,
                                popupState.close,
                              )
                            }
                          >
                            Move down
                          </MenuItem>
                        ) : null}
                      </Menu>
                    </>
                  )}
                </PopupState>
              )}
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
        <Fab size="medium" className={classes.addIconFab}>
          <ConfirmPoper onOk={() => deleteMottos({ variables: { ids } })}>
            <DeleteOutline />
          </ConfirmPoper>
        </Fab>
      )
    },
  }

  return (
    <TableWrapper tableName="Motto" icon="save">
      <MUIDataTable
        title=""
        data={dataSource}
        columns={columns}
        options={options}
      />
      {(isFetching || isDeleting || isBatchDeleting || isExchanging) && (
        <Loading />
      )}
    </TableWrapper>
  )
}

export default MottoTable
