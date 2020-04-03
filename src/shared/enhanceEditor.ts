import { RefObject } from 'react'
import { Editor } from '@toast-ui/react-editor'

export default (editorRef: RefObject<Editor>, setOpen: Function) => {
  if (editorRef.current) {
    const instance = editorRef.current.getInstance()
    const toolbar = instance.getUI().getToolbar()

    //@ts-ignore
    instance.eventManager.addEventType('uploadImg')
    //@ts-ignore
    instance.eventManager.listen('uploadImg', () => {
      setOpen(true)
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
