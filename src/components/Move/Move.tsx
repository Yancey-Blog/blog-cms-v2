import { FC } from 'react'
import { MUIDataTableMeta } from 'mui-datatables'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { MoreVert } from '@mui/icons-material'
import { Menu, MenuItem } from '@mui/material'

interface Props {
  dataSource: any[]
  tableMeta: MUIDataTableMeta
  exchangePosition: Function
}

const Move: FC<Props> = ({ dataSource, tableMeta, exchangePosition }) => {
  const move = (
    curId: string,
    nextId: string,
    curWeight: number,
    nextWeight: number,
    closePoper: Function,
  ) => {
    closePoper()

    exchangePosition({
      variables: {
        input: {
          id: curId,
          exchangedId: nextId,
          weight: curWeight,
          exchangedWeight: nextWeight,
        },
      },
    })
  }

  const curId = tableMeta.rowData[0]
  const curWeight = tableMeta.rowData[1]

  const prev = tableMeta.tableData[tableMeta.rowIndex - 1]
  const next = tableMeta.tableData[tableMeta.rowIndex + 1]
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
                {curWeight !== dataSource[0].weight ? (
                  <MenuItem
                    onClick={() =>
                      move(curId, topId, curWeight, topWeight, popupState.close)
                    }
                  >
                    Move to the top
                  </MenuItem>
                ) : null}

                {curWeight !== dataSource[0].weight ? (
                  <MenuItem
                    onClick={() =>
                      move(
                        curId,
                        prevId,
                        curWeight,
                        prevWeight,
                        popupState.close,
                      )
                    }
                  >
                    Move up
                  </MenuItem>
                ) : null}

                {curWeight !== 1 ? (
                  <MenuItem
                    onClick={() =>
                      move(
                        curId,
                        nextId,
                        curWeight,
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
