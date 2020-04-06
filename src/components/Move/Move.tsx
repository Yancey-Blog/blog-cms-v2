import React, { FC } from 'react'
import { MUIDataTableMeta } from 'mui-datatables'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { MoreVert } from '@material-ui/icons'
import { Menu, MenuItem } from '@material-ui/core'

interface Props {
  dataSource: any[]
  tableMeta: MUIDataTableMeta
  exchangePosition: Function
}

const Move: FC<Props> = ({ dataSource, tableMeta, exchangePosition }) => {
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
                      move(curId, topId, curWright, topWeight, popupState.close)
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
}

export default Move
