import React, { FC, useRef, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { TextField, Button } from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'
import * as Yup from 'yup'
import { useFormik } from 'formik'
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
import Uploader from 'src/components/Uploader/Uploader'
import UploaderModal from 'src/components/UploaderModal/UploaderModal'
import { UploaderRes } from 'src/components/Uploader/types'
import embededPlugin from 'src/shared/editorEmbededPlugin'
import { enhanceUpload, insertImage } from 'src/shared/enhanceEditor'
import { MARKDOWN_EDITOR_TOOLBAR_ITEMS } from 'src/shared/constants'
import { goBack, parseSearch } from 'src/shared/utils'

import useStyles from './styles'

const PostConfig: FC = () => {
  /* query */
  const { search } = useLocation()
  const { id } = parseSearch(search)

  /* css styles */
  const classes = useStyles()

  /* editor */
  const editorRef = useRef<Editor>(null)
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState<UploaderRes>({ name: '', url: '' })
  const handleEditorImageChange = (file: UploaderRes) => {
    setImage(file)
  }

  useEffect(() => {
    enhanceUpload(editorRef, setOpen)
  }, [])

  /* posterUrl */
  const handlePosterImageChange = (data: UploaderRes) => {
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

  const {
    handleSubmit,
    setFieldValue,
    getFieldProps,
    // setValues,
    resetForm,
    isSubmitting,
    errors,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values)
      if (id) {
        // TODO:
      } else {
        // TODO:
      }
      goBack()
      resetForm()
    },
  })

  return (
    <section className={classes.editorWrapper}>
      <form onSubmit={handleSubmit} className={classes.customForm}>
        <Uploader
          needMarginLeft={false}
          onChange={handlePosterImageChange}
          defaultFile={getFieldProps('posterUrl').value}
        />

        <TextField
          error={!!errors.posterUrl}
          helperText={errors.posterUrl}
          style={{ display: 'none' }}
          required
          label="PosterUrl"
          disabled={true}
          {...getFieldProps('posterUrl')}
        />

        <TextField
          className={classes.txtField}
          error={!!errors.title}
          helperText={errors.title}
          required
          fullWidth
          variant="outlined"
          label="Title"
          {...getFieldProps('title')}
        />

        <TextField
          className={classes.txtField}
          error={!!errors.summary}
          helperText={errors.summary}
          required
          variant="outlined"
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
          className={classes.txtField}
          variant="outlined"
          {...getFieldProps('tags')}
          onChange={(chips) => handleTagChange(chips)}
        />
      </form>

      <Editor
        hideModeSwitch={true}
        useCommandShortcut={true}
        usageStatistics={false}
        initialValue=""
        previewStyle="vertical"
        height="800px"
        initialEditType="markdown"
        toolbarItems={MARKDOWN_EDITOR_TOOLBAR_ITEMS}
        plugins={[
          chartPlugin,
          tableMergedCellPlugin,
          umlPlugin,
          colorSyntaxPlugin,
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

      <div className={classes.btnGroup}>
        <Button className={classes.btn} variant="contained">
          Back
        </Button>
        <Button
          className={classes.btn}
          color="primary"
          variant="contained"
          disabled={isSubmitting}
          type="submit"
        >
          Save and continue editing
        </Button>
        <Button
          className={classes.btn}
          color="primary"
          variant="contained"
          disabled={isSubmitting}
          type="submit"
        >
          Save
        </Button>
      </div>
    </section>
  )
}

export default PostConfig
