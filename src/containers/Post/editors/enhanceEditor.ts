import { RefObject } from 'react'
import { Editor } from '@toast-ui/react-editor'
import { UploaderRes } from 'src/components/Uploader/types'

export const insertImage = (
  editorRef: RefObject<Editor>,
  image: UploaderRes,
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
  // @ts-ignore
  if (!navigator.clipboard || !navigator.clipboard.read) return

  if (editorRef.current) {
    const instance = editorRef.current.getInstance()

    // @ts-ignore
    // Tui.editors listen to `addImageBlobHook` event by default,
    // this event leads to pasted image will be converted to base64,
    // then insert to edit area.
    instance.eventManager.removeEventHandler('addImageBlobHook')

    // @ts-ignore
    instance.eventManager.listen('paste', async () => {
      // @ts-ignore
      // FIXME:
      // Current DOM interface does not support `navigator.clipboard.read`.
      const files = await navigator.clipboard.read()

      let imageType = ''
      const imageFile = files.find((file: any) =>
        file.types.some((type: string) => {
          if (type.startsWith('image/')) {
            imageType = type
            return true
          }

          return false
        }),
      )

      const file: Blob = await imageFile.getType(imageType)
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch(process.env.REACT_APP_UPLOADER_URL, {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      insertImage(editorRef, data)
    })
  }
}
