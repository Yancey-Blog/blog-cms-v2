import React, { FC, useRef, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Paper, TextField, FormLabel } from '@material-ui/core'
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
import UploaderModal from 'src/components/UploaderModal/UploaderModal'
import { UploaderRes } from 'src/components/Uploader/types'
import embededPlugin from 'src/shared/editorEmbededPlugin'
import enhanceEditor from 'src/shared/enhanceEditor'
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
  const onOk = () => {
    if (editorRef.current) {
      const instance = editorRef.current.getInstance()
      instance.insertText(`\n\n![${image.name}](${image.url})`)
    }
  }
  useEffect(() => {
    enhanceEditor(editorRef, setOpen)
  }, [])

  /* posterUrl */
  const handlePosterImageChange = (data: UploaderRes) => {
    setFieldValue('posterUrl', data.url)
  }

  /* formik */
  const initialValues = {
    title: '',
    showTime: new Date(),
    posterUrl: '',
  }

  const validationSchema = Yup.object().shape({
    posterUrl: Yup.string().url().required('PostUrl is required.'),
    title: Yup.string().required('Title is required.'),
    summary: Yup.string().required('Summary is required.'),
  })

  const {
    handleSubmit,
    setFieldValue,
    getFieldProps,
    setValues,
    resetForm,
    isSubmitting,
    errors,
    values,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
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
    <Paper className={classes.editorWrapper}>
      <Editor
        hideModeSwitch={true}
        useCommandShortcut={true}
        usageStatistics={false}
        initialValue=""
        previewStyle="vertical"
        height="100%"
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
        onOk={onOk}
      />
    </Paper>
  )
}

export default PostConfig
