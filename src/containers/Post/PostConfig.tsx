import React, { FC, useRef, useEffect } from 'react'
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
import useStyles from './styles'

const PostConfig: FC = () => {
  const classes = useStyles()
  const editorRef = useRef<Editor>(null)

  const enhanceMarkdownEditor = () => {
    if (editorRef.current) {
      const instance = editorRef.current.getInstance()
      const toolbar = instance.getUI().getToolbar()

      //@ts-ignore
      instance.eventManager.addEventType('uploadImg')
      //@ts-ignore
      instance.eventManager.listen('uploadImg', () => {
        alert('Click!')
      })

      //@ts-ignore
      instance.eventManager.addEventType('insertEmbeded')
      //@ts-ignore
      instance.eventManager.listen('insertEmbeded', () => {
        instance.insertText('```embeded\n\n```')
      })

      toolbar.insertItem(16, {
        type: 'button',
        options: {
          className: 'tui-image',
          event: 'uploadImg',
          tooltip: 'Insert Image',
        },
      })

      toolbar.insertItem(21, {
        type: 'button',
        options: {
          className: 'tui-emebed-icon',
          event: 'insertEmbeded',
          tooltip: 'Insert Embeded Block',
          text: 'EB',
        },
      })
    }
  }

  useEffect(() => {
    enhanceMarkdownEditor()
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
    </Paper>
  )
}

export default PostConfig
