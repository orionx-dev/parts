import React from 'react'
import NotificationSystem from 'react-notification-system'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'

export default class WithMessage extends React.Component {

  static propTypes = {
    children: PropTypes.node
  }

  static childContextTypes = {
    showMessage: PropTypes.func
  }

  getChildContext () {
    return {
      showMessage: this.showMessage
    }
  }

  @autobind
  showMessage (message, passedOptions) {
    const options = {
      message: typeof message === 'string' ? message.replace('GraphQL error: ', '') : message,
      level: 'info',
      ...passedOptions
    }
    this.notificationSystem.addNotification(options)
  }

  getStyle () {
    return {
      NotificationItem: {
        DefaultStyle: {
          margin: '10px 5px 2px 1px',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          borderTop: 'none',
          boxShadow: 'none'
        },
        error: {
          backgroundColor: '#be0606'
        }
      },
      Dismiss: {
        DefaultStyle: {
          display: 'none'
        }
      },
      Action: {
        DefaultStyle: {
          outline: 'none',
          cursor: 'pointer'
        },
        info: {
          backgroundColor: '#fff',
          color: '#000'
        }
      }
    }
  }

  render () {
    return (
      <div>
        {this.props.children}
        <NotificationSystem ref={(ref)=>{this.notificationSystem = ref}} style={this.getStyle()} />
      </div>
    )
  }
}
