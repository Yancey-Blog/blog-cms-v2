import { RefObject } from 'react'
import { Editor } from '@toast-ui/react-editor'

export const getMarkdown = (editorRef: RefObject<Editor>) => {
  if (editorRef.current) {
    return editorRef.current.getInstance().getMarkdown()
  }

  return ''
}

// TODO: Temporarily block pre tag
export const getHTML = (editorRef: RefObject<Editor>) => {
  if (editorRef.current) {
    return editorRef.current
      .getInstance()
      .getHtml()
      .replace(/<pre\b[^>]*>([\s\S]*?)<\/pre>/gi, '')
  }

  return ''
}

export const setMarkdown = (editorRef: RefObject<Editor>, content: string) => {
  if (editorRef.current) {
    return editorRef.current.getInstance().setMarkdown(content)
  }

  return ''
}
