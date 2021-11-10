import { RefObject } from 'react'
import { Editor } from '@toast-ui/react-editor'
import { UploaderResponse } from 'src/components/Uploader/types'
import toast from 'src/components/Toast/Toast'

export const insertImage = (
  editorRef: RefObject<Editor>,
  image: UploaderResponse,
) => {
  if (editorRef.current) {
    const instance = editorRef.current.getInstance()
    instance.insertText(`\n\n![${image.name}](${image.url})`)
  }
}

export const insertEmbeded = (editorRef: RefObject<Editor>) => {
  if (editorRef.current) {
    const instance = editorRef.current.getInstance()
    instance.insertText('```embeded\n\n```')
  }
}

export const enhanceUpload = (
  editorRef: RefObject<Editor>,
  setOpen: Function,
) => {
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
      insertEmbeded(editorRef)
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

export const enhancePasteUpload = (editorRef: RefObject<Editor>) => {
  // TODO:
  toast.error('暂不支持复制上传图片')
}
