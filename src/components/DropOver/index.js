import React from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import PropTypes from 'prop-types'

export default class DropOver extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    children: PropTypes.node
  }

  renderMenu() {
    if (!this.props.open) return
    return (
      <CSSTransition classNames="os_dropover" key="menu" timeout={{enter: 200, exit: 200}}>
        {this.props.children}
      </CSSTransition>
    )
  }

  render() {
    return (
      <TransitionGroup>
        {this.renderMenu()}
      </TransitionGroup>
    )
  }
}
