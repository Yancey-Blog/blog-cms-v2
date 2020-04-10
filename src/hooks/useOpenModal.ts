import { useState } from 'react'

export interface Open {
  isOpen: boolean
  id?: string
}

const useOpenModal = () => {
  const [open, setOpen] = useState<Open>({ isOpen: false })

  const handleOpen = (id?: string) => {
    const params: Open = { isOpen: !open.isOpen }
    id ? (params.id = id) : (params.id = '')
    setOpen(params)
  }

  return { open, handleOpen }
}

export default useOpenModal
