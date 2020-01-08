import React, { FC, useState, ChangeEvent } from 'react'
import { Card, CircularProgress } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { useSnackbar } from 'notistack'
import { UploaderRes, Props } from './types'
import styles from './uploader.module.scss'

const Uploader: FC<Props> = ({
  accept = 'image/*',
  action = 'http://localhost:3002/uploads',
  method = 'POST',
  disabled = false,
  name = 'file',
  defaultFile = '',
  onChange,
}) => {
  const { enqueueSnackbar } = useSnackbar()

  const [uploading, setUploading] = useState(false)

  const [curFile, setCurFile] = useState<UploaderRes>()

  const onUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setUploading(true)

    const formData = new FormData()

    if (e.target.files) {
      formData.append(name, e.target.files[0])
    }

    const res = await fetch(action, {
      method,
      body: formData,
    })

    const data = await res.json()

    if (data.code) {
      enqueueSnackbar(data.code, { variant: 'error' })
    } else {
      setCurFile(data)
      onChange(data)
      enqueueSnackbar(
        <span>
          <span style={{ fontWeight: 'bold' }}>{data.name}</span> has been
          uploaded successfully.
        </span>,
        {
          variant: 'success',
        },
      )
    }

    setUploading(false)
  }

  const configUploaderContent = () => {
    if (uploading) {
      return <CircularProgress />
    } else {
      if (defaultFile) {
        return <img src={defaultFile} alt="default" className={styles.img} />
      } else if (curFile) {
        const { name, url } = curFile
        return <img src={url} alt={name} className={styles.img} />
      } else {
        return <Add className={styles.addBtn} />
      }
    }
  }

  return (
    <Card className={styles.uploader}>
      {configUploaderContent()}
      <input
        type="file"
        accept={accept}
        disabled={disabled || uploading}
        onChange={e => onUpload(e)}
        className={styles.input}
      />
    </Card>
  )
}

export default Uploader
