import React, { FC, useRef, useEffect, useState } from 'react'
import { Paper } from '@material-ui/core'
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
import embededPlugin from 'src/shared/editorEmbededPlugin'
import enhanceEditor from 'src/shared/enhanceEditor'
import UploaderModal from 'src/components/UploaderModal/UploaderModal'
import { UploaderRes } from 'src/components/Uploader/types'
import useStyles from './styles'

const PostConfig: FC = () => {
  const classes = useStyles()
  const editorRef = useRef<Editor>(null)

  const [open, setOpen] = useState(false)
  const [image, setImage] = useState<UploaderRes>({ name: '', url: '' })

  const handleChange = (file: UploaderRes) => {
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
        toolbarItems={[
          'heading',
          'bold',
          'italic',
          'strike',
          'divider',
          'hr',
          'quote',
          'divider',
          'ul',
          'ol',
          'task',
          'indent',
          'outdent',
          'divider',
          'table',
          'link',
          'divider',
          'code',
          'codeblock',
        ]}
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
        onChange={handleChange}
        onOk={onOk}
      />
    </Paper>
  )
}

export default PostConfig
