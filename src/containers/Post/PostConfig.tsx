import React, { FC } from 'react'
import { Paper } from '@material-ui/core'
import 'tui-editor/dist/tui-editor.min.css'
import 'tui-editor/dist/tui-editor-contents.min.css'
import 'codemirror/lib/codemirror.css'
import { Editor } from '@toast-ui/react-editor'
import useStyles from './styles'

const PostConfig: FC = () => {
  const classes = useStyles()

  return (
    <Paper className={classes.editorWrapper}>
      <Editor
        initialValue=""
        previewStyle="vertical"
        height="100%"
        initialEditType="markdown"
        useCommandShortcut={true}
        // @ts-ignore
        exts={['scrollSync', 'colorSyntax', 'uml', 'mark', 'table']}
      />
    </Paper>
  )
}

export default PostConfig
