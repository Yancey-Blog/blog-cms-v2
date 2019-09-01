import React from 'react'
import Fab from '@material-ui/core/Fab'
import { Edit, DeleteOutline, Close, Check, AddBox } from '@material-ui/icons'
import styles from './Tables.module.scss'

export const EDITOR = ({ id, text, onExecute }) => {
  if (id === 'edit') {
    return (
      <Fab aria-label='editor' size='small' className={styles.editorIcon}>
        <Edit onClick={onExecute} />
      </Fab>
    )
  } else if (id === 'cancel') {
    return (
      <Fab aria-label='editor' size='small' className={styles.editorIcon}>
        <Close onClick={onExecute} />
      </Fab>
    )
  } else if (id === 'delete') {
    return (
      <Fab aria-label='editor' size='small' className={styles.editorIcon}>
        <DeleteOutline onClick={onExecute} />
      </Fab>
    )
  } else if (id === 'commit') {
    return (
      <Fab aria-label='editor' size='small' className={styles.editorIcon}>
        <Check onClick={onExecute} />
      </Fab>
    )
  } else {
    return (
      <Fab aria-label='editor' size='small' className={styles.editorIcon}>
        <AddBox onClick={onExecute} />
      </Fab>
    )
  }
}
