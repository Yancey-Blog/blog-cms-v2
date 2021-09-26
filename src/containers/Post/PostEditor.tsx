import { FC, useRef, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { TextField, Button, IconButton, Popover } from '@mui/material'
import { ClassNameMap } from '@mui/styles'
import ChipInput from 'material-ui-chip-input'
import { PhotoCamera } from '@mui/icons-material'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useMutation } from '@apollo/client'
import { useSnackbar } from 'notistack'
import 'tui-editor/dist/tui-editor.min.css'
import 'tui-editor/dist/tui-editor-contents.min.css'
import 'codemirror/lib/codemirror.css'
import 'tui-chart/dist/tui-chart.css'
import 'tui-color-picker/dist/tui-color-picker.css'
import { Editor } from '@toast-ui/react-editor'
import umlPlugin from '@toast-ui/editor-plugin-uml'
import tableMergedCellPlugin from '@toast-ui/editor-plugin-table-merged-cell'
import chartPlugin from '@toast-ui/editor-plugin-chart'
import colorSyntaxPlugin from '@toast-ui/editor-plugin-color-syntax'
import {
  CREATE_ONE_POST,
  UPDATE_ONE_POST,
  CREATE_POST_STATISTICS,
} from './typeDefs'
import Uploader from 'src/components/Uploader/Uploader'
import UploaderModal from 'src/components/UploaderModal/UploaderModal'
import { UploaderResponse } from 'src/components/Uploader/types'
import client from 'src/graphql/apolloClient'
import {
  MARKDOWN_EDITOR_TOOLBAR_ITEMS,
  POPOVER_ANCHOR_ORIGIN,
  POPOVER_TRANSFORM_ORIGIN,
} from 'src/shared/constants'
import { goBack, parseSearch } from 'src/shared/utils'
import embededPlugin from './editors/editorEmbededPlugin'
import {
  enhanceUpload,
  insertImage,
  enhancePasteUpload,
} from './editors/enhanceEditor'
import { getMarkdown, getHTML, setMarkdown } from './editors/editorIO'
import { sendPostToAlgolia } from './algolia/algoliaSearch'
import {
  SaveType,
  PostStatisticsVars,
  CreatePostStatisticsMutation,
  UpdatePostByIdMutation,
  CreatePostVars,
  UpdatePostVars,
  CreatePostMutation,
} from './types'
import useStyles from './styles'

const PostEditor: FC = () => {
  /* message bar */
  const { enqueueSnackbar } = useSnackbar()

  /* graphql */
  const [createPostStatistics] = useMutation<
    CreatePostStatisticsMutation,
    PostStatisticsVars
  >(CREATE_POST_STATISTICS)

  const [createPost, { loading: isCreatingPost }] = useMutation<
    CreatePostMutation,
    CreatePostVars
  >(CREATE_ONE_POST, {
    onCompleted(data) {
      const { _id, title, isPublic, summary, posterUrl, tags } = data.createPost
      enqueueSnackbar('Create success!', { variant: 'success' })

      createPostStatistics({
        variables: {
          input: {
            postId: _id,
            postName: title,
            scenes: `created and ${isPublic ? 'public' : 'hide'}`,
          },
        },
      })

      if (isPublic) {
        sendPostToAlgolia(
          _id,
          title,
          summary,
          getHTML(editorRef),
          posterUrl,
          tags,
        )
      }
    },
    onError() {},
  })

  const [updatePostById, { loading: isUpdatingPost }] = useMutation<
    UpdatePostByIdMutation,
    UpdatePostVars
  >(UPDATE_ONE_POST, {
    onCompleted(data) {
      const { _id, title, summary, isPublic, posterUrl, tags } =
        data.updatePostById
      enqueueSnackbar('Update success!', { variant: 'success' })

      createPostStatistics({
        variables: {
          input: {
            postId: _id,
            postName: title,
            scenes: `updated and ${isPublic ? 'public' : 'hide'}`,
          },
        },
      })

      if (isPublic) {
        sendPostToAlgolia(
          _id,
          title,
          summary,
          getHTML(editorRef),
          posterUrl,
          tags,
        )
      }
    },
    onError() {},
  })

  /* query */
  const { search } = useLocation()
  const { id } = parseSearch(search)

  /* css styles */
  const classes: ClassNameMap = useStyles()

  /* editor */
  const editorRef = useRef<Editor>(null)
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState<UploaderResponse>({ name: '', url: '' })
  const handleEditorImageChange = (file: UploaderResponse) => setImage(file)

  /* posterUrl */
  const handlePosterImageChange = (data: UploaderResponse) => {
    setFieldValue('posterUrl', data.url)
  }

  /* tags */
  const handleTagChange = (chips: string[]) => {
    setFieldValue('tags', chips)
  }

  /* formik */
  const initialValues = {
    posterUrl: '',
    title: '',
    summary: '',
    tags: [],
  }

  const validationSchema = Yup.object().shape({
    posterUrl: Yup.string().url().required('PostUrl is required.'),
    title: Yup.string().required('Title is required.'),
    summary: Yup.string().required('Summary is required.'),
    tags: Yup.array().required('Tags is required.'),
  })

  const { setFieldValue, getFieldProps, setValues, resetForm, values, errors } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit() {},
    })

  const onSubmit = async (type: SaveType) => {
    const content = getMarkdown(editorRef)

    if (!values.posterUrl) {
      enqueueSnackbar('Please upload a poster.', { variant: 'warning' })
      return
    }

    if (values.tags.length === 0) {
      enqueueSnackbar('Please specify at least one tag for the post.', {
        variant: 'warning',
      })
      return
    }

    if (!content) {
      enqueueSnackbar('Write something...', { variant: 'warning' })
      return
    }

    const lastModifiedDate = new Date().toISOString()

    const params = { ...values, content, lastModifiedDate }
    const _params =
      type === SaveType.DRAFT
        ? { ...params, isPublic: false }
        : { ...params, isPublic: true }

    if (id) {
      await updatePostById({
        variables: { input: { ..._params, id } } as UpdatePostVars,
      })
    } else {
      await createPost({
        variables: {
          input: _params,
        },
      })
    }
    window.localStorage.removeItem('post_content')
    goBack()
    resetForm()
  }

  useEffect(() => {
    enhanceUpload(editorRef, setOpen)
    enhancePasteUpload(editorRef)

    if (id) {
      const {
        title,
        content,
        summary,
        tags,
        posterUrl,
        // @ts-ignore
      } = client.cache.data.data[`PostItemModel:${id}`]

      setValues({
        title,
        summary,
        tags,
        posterUrl,
      })

      setMarkdown(editorRef, content)
    } else {
      const content = window.localStorage.getItem('post_content')
      if (content) {
        setMarkdown(editorRef, content)
      }
    }

    return () => {
      resetForm()
    }
  }, [id, resetForm, setValues])

  useEffect(() => {
    const timer = setInterval(() => {
      window.localStorage.setItem('post_content', getMarkdown(editorRef))
    }, 5000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <section className={classes.editorWrapper}>
      <form>
        <div className={classes.header}>
          <TextField
            error={!!errors.title}
            helperText={errors.title}
            required
            fullWidth
            label="Title"
            {...getFieldProps('title')}
          />

          <div className={classes.publishTools}>
            <TextField
              error={!!errors.posterUrl}
              helperText={errors.posterUrl}
              style={{ display: 'none' }}
              required
              label="PosterUrl"
              disabled={true}
              {...getFieldProps('posterUrl')}
            />
            <PopupState variant="popover" popupId="lrcPoperOver">
              {(popupState) => (
                <div>
                  <IconButton
                    className={classes.uploadImageIcon}
                    aria-label="upload-image"
                    {...bindTrigger(popupState)}
                  >
                    <PhotoCamera />
                  </IconButton>

                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={POPOVER_ANCHOR_ORIGIN}
                    transformOrigin={POPOVER_TRANSFORM_ORIGIN}
                    disableRestoreFocus
                  >
                    <Uploader
                      needMarginLeft={false}
                      onChange={handlePosterImageChange}
                      defaultFile={getFieldProps('posterUrl').value}
                    />
                  </Popover>
                </div>
              )}
            </PopupState>

            <Button
              className={classes.btn}
              color="primary"
              disabled={isCreatingPost || isUpdatingPost}
              onClick={() => onSubmit(SaveType.FINALIZE)}
            >
              Publish
            </Button>

            <Button
              className={classes.btn}
              color="secondary"
              disabled={isCreatingPost || isUpdatingPost}
              onClick={() => onSubmit(SaveType.DRAFT)}
            >
              Save as Draft
            </Button>

            <Button className={classes.btn} onClick={goBack}>
              Back
            </Button>
          </div>
        </div>

        <div className={classes.summary}>
          <TextField
            className={classes.summaryTxtFiled}
            error={!!errors.summary}
            helperText={errors.summary}
            required
            label="Summary"
            fullWidth
            multiline
            rows="5"
            {...getFieldProps('summary')}
          />

          <ChipInput
            error={!!errors.tags}
            helperText={errors.tags}
            label="Tags"
            defaultValue={values.tags}
            fullWidth
            onChange={(chips) => handleTagChange(chips)}
          />
        </div>
      </form>

      <Editor
        useCommandShortcut={true}
        usageStatistics={false}
        initialValue=""
        previewStyle="vertical"
        height="1000px"
        initialEditType="markdown"
        toolbarItems={MARKDOWN_EDITOR_TOOLBAR_ITEMS}
        plugins={[
          chartPlugin,
          umlPlugin,
          colorSyntaxPlugin,
          // @ts-ignore
          tableMergedCellPlugin,
          embededPlugin,
        ]}
        ref={editorRef}
      />

      <UploaderModal
        open={open}
        onClose={setOpen}
        onChange={handleEditorImageChange}
        onOk={() => insertImage(editorRef, image)}
      />
    </section>
  )
}

export default PostEditor
