import React, { FC } from 'react'
import { Paper } from '@material-ui/core'
import 'tui-editor/dist/tui-editor.min.css'
import 'tui-editor/dist/tui-editor-contents.min.css'
import 'codemirror/lib/codemirror.css'
import 'tui-chart/dist/tui-chart.css'
import 'tui-color-picker/dist/tui-color-picker.css'
import uml from '@toast-ui/editor-plugin-uml'
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell'
import chart from '@toast-ui/editor-plugin-chart'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import { Editor } from '@toast-ui/react-editor'
import embededPlugin from 'src/shared/editor-plugin-embeded'
import useStyles from './styles'

const PostConfig: FC = () => {
  const classes = useStyles()

  return (
    <Paper className={classes.editorWrapper}>
      <Editor
        usageStatistics={false}
        initialValue=""
        previewStyle="vertical"
        height="100%"
        initialEditType="markdown"
        hideModeSwitch={true}
        useCommandShortcut={true}
        plugins={[chart, tableMergedCell, uml, colorSyntax, embededPlugin]}
      />
    </Paper>
  )
}

export default PostConfig
