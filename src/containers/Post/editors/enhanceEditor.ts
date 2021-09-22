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
  // @ts-ignore
  if (!navigator.clipboard || !navigator.clipboard.read) return

  if (editorRef.current) {
    const instance = editorRef.current.getInstance()

    // @ts-ignore
    // Tui.editors listen to `addImageBlobHook` event by default,
    // this event will convert `the pasted image` to base64,
    // and insert it to edit area.
    instance.eventManager.removeEventHandler('addImageBlobHook')

    // @ts-ignore
    instance.eventManager.listen('paste', async (e) => {
      const items = e.data.clipboardData && e.data.clipboardData.items
      const token = localStorage.getItem('token')
      let file = null

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.includes('image')) {
          file = items[i].getAsFile()
          break
        }
      }

      const formData = new FormData()
      formData.append(
        'operations',
        '{"operationName":"UploadFile","variables":{"file":null},"query":"mutation UploadFile($file: Upload!) {\n  uploadFile(file: $file) {\n    url\n    name\n    __typename\n  }\n}\n"}',
      )
      formData.append('map', '{ "0": ["variables.file"] }')
      formData.append('0', file)

      if (!file || !token) return

      try {
        toast.info('Uploading...')

        const res = await fetch(process.env.REACT_APP_GRAPHQL_URL, {
          method: 'POST',
          headers: {
            authorization: `Bearer ${token}`,
            'content-type': 'multipart/form-data',
          },
          body: formData,
        })
        const data = await res.json()
        insertImage(editorRef, data.uploadFile)
        toast.success('Upload Success')
      } catch (e) {
        toast.error('Upload Error')
      }
    })
  }
}
