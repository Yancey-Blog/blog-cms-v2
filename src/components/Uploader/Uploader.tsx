import { FC, useState, ChangeEvent } from 'react'
import classNames from 'classnames'
import { Card, CircularProgress, Button } from '@material-ui/core'
import { Add, CloudUpload } from '@material-ui/icons'
import { useSnackbar } from 'notistack'
import { getURLPathName } from 'src/shared/utils'
import { UploaderResponse, Props } from './types'
import useclasses from './styles'

const Uploader: FC<Props> = ({
  type = 'avatar',
  variant = 'elevation',
  accept = 'image/*',
  defaultFile = '',
  needMarginLeft = true,
  onChange,
  className,
}) => {
  const classes = useclasses()
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const [currFile, setCurrFile] = useState<UploaderResponse>()

  const onUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const file = files[0]
      const formData = new FormData()
      formData.append('file', file)
      setLoading(true)

      try {
        const res = await fetch(process.env.REACT_APP_UPLOADER_URL || '', {
          method: 'POST',
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        })
        const data: UploaderResponse = await res.json()
        setCurrFile(data)
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
      } catch (e) {
        enqueueSnackbar('Uppload failed', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }
  }

  const avatarContent = () => {
    if (loading) {
      return <CircularProgress />
    }

    if (defaultFile) {
      return <img src={defaultFile} alt="default" className={classes.img} />
    } else if (currFile) {
      const { name, url } = currFile
      return <img src={url} alt={name} className={classes.img} />
    } else {
      return <Add className={classes.addBtn} />
    }
  }

  const simpleContent = () => {
    if (currFile) {
      const { url } = currFile
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
            disabled={loading}
            startIcon={<CloudUpload />}
          >
            {loading && (
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
