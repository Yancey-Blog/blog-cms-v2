import React, { FC } from 'react'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import WarningIcon from '@material-ui/icons/Warning'
import './Toast.css'

interface INoticeProps {
  type: string
  content: string
}

const variantIcon: any = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

const Notice: FC<INoticeProps> = ({ type, content }) => {
  // @ts-ignore
  const Icon = variantIcon[type]

  return (
    <div className={`toast-notice ${type}`}>
      <Icon className="toast-icon" />
      <span>{content}</span>
    </div>
  )
}

export default Notice
