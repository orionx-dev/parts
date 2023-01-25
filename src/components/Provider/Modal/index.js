import React from 'react'
import OutlineModal from './OutlineModal'
import autobind from 'autobind-decorator'
import Button from '../../Button'
import withKeyboardEvent from '../../../decorators/withKeyboardEvent'
import PropTypes from 'prop-types'

const styles = {
  modal: {},
  content: {
    outline: 'none',
    backgroundColor: '#fff',
    padding: 20
  },
  title: {
    fontSize: 26,
    fontWeight: 700,
    marginBottom: 10
  },
  message: {
    marginBottom: 20
  },
  buttons: {
    textAlign: 'right'
  },
  cancelButton: {
    marginRight: 10
  }
}

@withKeyboardEvent('enter', 'confirm')
export default class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  static childContextTypes = {
    showModal: PropTypes.func
  }

  getChildContext() {
    return {
      showModal: this.showModal
    }
  }

  state = {}

  @autobind
  showModal({title, message, confirm, confirmText, cancelText, render}) {
    this.setState({
      title,
      message,
      confirm,
      confirmText,
      cancelText,
      render,
      loading: false,
      open: true
    })
    this.modal.show()
  }

  @autobind
  hideModal() {
    this.modal.hide()
    this.setState({open: false})
  }

  @autobind
  async confirm() {
    if (!this.state.open) return
    this.setState({loading: true})
    const result = await this.state.confirm()
    if (result === false) return this.setState({loading: false})
    this.hideModal()
  }

  render() {
    return (
      <div>
        {this.props.children}
        <OutlineModal ref={(ref) => {this.modal = ref}} keyboard modalStyle={styles.modal} contentStyle={styles.content}>
          <div style={styles.title}>{this.state.title}</div>
          <div style={styles.message}>
            {this.state.render ? this.state.render() : this.state.message}
          </div>
          <div style={styles.buttons}>
            <Button
              disabled={this.state.loading}
              style={styles.cancelButton}
              onClick={this.hideModal}>
              {this.state.cancelText}
            </Button>
            <Button loading={this.state.loading} onClick={this.confirm} danger>
              {this.state.confirmText}
            </Button>
          </div>
        </OutlineModal>
      </div>
    )
  }
}
