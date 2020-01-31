import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Notice from './Notice'

interface INotice {
  key: string
  type: string
  content: string
  onClose: any
}

interface INotificationProps {}

interface INotificationStates {
  notices: INotice[]
}

class Notification extends React.Component<
  INotificationProps,
  INotificationStates
> {
  transitionTime: number

  constructor(props: INotificationProps) {
    super(props)
    this.transitionTime = 300
    this.state = { notices: [] }
    this.removeNotice = this.removeNotice.bind(this)
  }

  public getNoticeKey() {
    const { notices } = this.state
    return `notice-${new Date().getTime()}-${notices.length}`
  }

  public addNotice(notice: any) {
    const { notices } = this.state
    // eslint-disable-next-line
    notice.key = this.getNoticeKey()
    if (notices.every((item: any) => item.key !== notice.key)) {
      if (notice.length > 0 && notices[notice.length - 1].type === 'loading') {
        notices.push(notice)
        setTimeout(() => {
          this.setState({ notices })
        }, this.transitionTime)
      } else {
        notices.push(notice)
        this.setState({ notices })
      }
      if (notice.duration > 0) {
        setTimeout(() => {
          this.removeNotice(notice.key)
        }, notice.duration)
      }
    }
    return () => {
      this.removeNotice(notice.key)
    }
  }

  public removeNotice(key: any) {
    const { notices } = this.state
    this.setState({
      notices: notices.filter((notice: any) => {
        if (notice.key === key) {
          if (notice.onClose) setTimeout(notice.onClose, this.transitionTime)
          return false
        }
        return true
      }),
    })
  }

  public render() {
    const { notices } = this.state
    return (
      <TransitionGroup className="toast-notification">
        {notices.map((notice: any) => (
          <CSSTransition
            key={notice.key}
            classNames="toast-notice-wrapper notice"
            timeout={this.transitionTime}
          >
            <Notice key={notice.key} {...notice} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    )
  }
}

const createNotification = () => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  const ref = React.createRef<any>()
  ReactDOM.render(<Notification ref={ref} />, div)
  return {
    // eslint-disable-next-line
    addNotice(notice: any) {
      if (ref.current) {
        return ref.current.addNotice(notice)
      }
    },
    destroy() {
      ReactDOM.unmountComponentAtNode(div)
      document.body.removeChild(div)
    },
  }
}

export default createNotification()
