import { FC, useState, ChangeEvent } from 'react'
import classNames from 'classnames'
import { Card, CircularProgress, Button } from '@material-ui/core'
import { Add, CloudUpload } from '@material-ui/icons'
import { useSnackbar } from 'notistack'
import { getURLPathName } from 'src/shared/utils'
import { UploaderRes, Props } from './types'
import useclasses from './styles'

const Uploader: FC<Props> = ({
  type = 'avatar',
  variant = 'elevation',
  accept = 'image/*',
  action = process.env.REACT_APP_UPLOADER_URL || '',
  method = 'POST',
  name = 'file',
  defaultFile = '',
  needMarginLeft = true,
  onChange,
  className,
}) => {
  const classes = useclasses()
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

  const avatarContent = () => {
    if (uploading) {
      return <CircularProgress />
    }

    if (defaultFile) {
      return <img src={defaultFile} alt="default" className={classes.img} />
    } else if (curFile) {
      const { name, url } = curFile
      return <img src={url} alt={name} className={classes.img} />
    } else {
      return <Add className={classes.addBtn} />
    }
  }

  const simpleContent = () => {
    if (curFile) {
      const { url } = curFile
      return <p className={classes.simpleContent}>{getURLPathName(url)}</p>
    } else if (defaultFile) {
      return (
        <p className={classes.simpleContent}>{getURLPathName(defaultFile)}</p>
      )
    }
  }

  return (
    <>
      {type === 'avatar' ? (
        <Card
          variant={variant}
          className={classNames(classes.avatarUploader, className, {
            [classes.simpleUploader]: needMarginLeft,
          })}
        >
          {avatarContent()}
          <input
            type="file"
            accept={accept}
            onChange={(e) => onUpload(e)}
            className={classes.customInput}
          />
        </Card>
      ) : (
        <div className={needMarginLeft ? classes.simpleUploader : undefined}>
          <Button
            variant="contained"
            color="primary"
            disabled={uploading}
            startIcon={<CloudUpload />}
          >
            {uploading && (
              <CircularProgress
                size={24}
                className={classes.customLoadingCircle}
              />
            )}
            Upload
            <input
              type="file"
              accept={accept}
              className={classes.customInput}
              onChange={(e) => onUpload(e)}
            />
          </Button>
          {simpleContent()}
        </div>
      )}
    </>
  )
}

export default Uploader
