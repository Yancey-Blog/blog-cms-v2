import React from 'react'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import WarningIcon from '@material-ui/icons/Warning'
import './Toast.css'

interface INoticeProps {
  type: string
  content: string
}

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

class Notice extends React.Component<INoticeProps, {}> {
  render() {
    const { type, content } = this.props
    const Icon = variantIcon[type]

    return (
      <div className={`toast-notice ${type}`}>
        <Icon className='toast-icon' />
        <span>{content}</span>
      </div>
    )
  }
}

export default Notice
