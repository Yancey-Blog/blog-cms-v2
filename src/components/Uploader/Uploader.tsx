import { FC, useState, ChangeEvent } from 'react'
import { useMutation } from '@apollo/client'
import classNames from 'classnames'
import { Card, CircularProgress, Button } from '@material-ui/core'
import { Add, CloudUpload } from '@material-ui/icons'
import { useSnackbar } from 'notistack'
import { getURLPathName } from 'src/shared/utils'
import { UPLOAD_FILE } from './typeDefs'
import { UploaderResponse, UploaderMutation, Props } from './types'
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
  const { enqueueSnackbar } = useSnackbar()
  const [currFile, setCurrFile] = useState<UploaderResponse>()
  const [uploadFile, { loading }] = useMutation<UploaderMutation>(UPLOAD_FILE, {
    onCompleted(data) {
      const { uploadFile } = data
      setCurrFile(uploadFile)
      onChange(uploadFile)
      enqueueSnackbar(
        <span>
          <span style={{ fontWeight: 'bold' }}>{uploadFile.name}</span> has been
          uploaded successfully.
        </span>,
        {
          variant: 'success',
        },
      )
    },
    onError() {},
  })

  const onUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadFile({ variables: { file: e.target.files[0] } })
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
