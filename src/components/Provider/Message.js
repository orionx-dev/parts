import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    toast.info(options.message)
  }

  render () {
    return (
      <div>
        {this.props.children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    )
  }
}
