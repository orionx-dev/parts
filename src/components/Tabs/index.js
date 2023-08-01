import React from 'react'
import PropTypes from 'prop-types'
import {withRouter, Link} from 'react-router'
import autobind from 'autobind-decorator'
import sleep from '../../helpers/sleep'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import parseColor from '../../helpers/parseColor'

@withRouter
export default class Tabs extends React.Component {
  static propTypes = {
    router: PropTypes.object,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.node.isRequired,
        path: PropTypes.string.isRequired
      })
    ),
    backgroundColor: PropTypes.string
  }

  static defaultProps = {
    backgroundColor: '#fafafa'
  }

  state = {}

  async componentDidMount() {
    this.inner.addEventListener('scroll', this.checkScroll)
    window.addEventListener('resize', this.checkScroll)
    this.checkScroll()
    await sleep(200)
    if (this.inner) {
      this.checkScroll()
    }
  }

  componentWillUnmount() {
    this.inner.removeEventListener('scroll', this.checkScroll)
    window.removeEventListener('resize', this.checkScroll)
  }

  @autobind
  checkScroll() {
    const element = this.inner
    const width = element.offsetWidth
    const innerWidth = element.scrollWidth
    const scrollLeft = element.scrollLeft
    const offsetRight = innerWidth - scrollLeft - width

    if (width >= innerWidth) {
      this.setState({
        isSmall: window.innerWidth <= 1220,
        showShadows: false,
        showArrowLeft: false,
        showArrowRight: false
      })
    } else {
      this.setState({
        isSmall: window.innerWidth <= 1220,
        showShadows: true,
        showArrowLeft: scrollLeft > 10,
        showArrowRight: offsetRight > 10
      })
    }
  }

  renderItems() {
    const items = this.props.items.map((item, index) => {
      const pathname = this.props.router.location.pathname
      const active = pathname === item.path
      const classNames = ['os-tabs-item']
      if (active) classNames.push('os-tabs-itemActive')
      return (
        <div key={index} className={classNames.join(' ')}>
          <Link to={item.path}>{item.title}</Link>
        </div>
      )
    })

    const classNames = ['os-tabs-inner']
    if (this.state.isSmall) {
      classNames.push('os-tabs-inner-small')
    }
    return (
      <div className={classNames.join(' ')} ref={(ref) => { this.inner = ref }}>
        {items}
      </div>
    )
  }

  renderShadow() {
    if (!this.state.showShadows) return
    const {red, green, blue} = parseColor(this.props.backgroundColor)
    const color = [red, green, blue].join(', ')
    const element = this.inner
    const top = element.getBoundingClientRect().top + window.scrollY
    const left = element.getBoundingClientRect().left + window.scrollX
    const right = element.getBoundingClientRect().right - window.scrollX
    const getStyle = isLeft => {
      return {
        top,
        left: isLeft ? left : right - 30,
        background: `-webkit-gradient(linear,${isLeft ? '100' : '0'}% 50%,${isLeft
          ? '0'
          : '100'}% 50%,color-stop(0%, rgba(${color}, 0)),color-stop(100%, rgba(${color}, 1)))`
      }
    }
    return [
      <div key="left" className="os-tabs-shadow" style={getStyle(true)} />,
      <div key="right" className="os-tabs-shadow" style={getStyle(false)} />
    ]
  }

  renderMdChevronRight() {
    const element = this.inner
    if (!element) return
    const top = element.getBoundingClientRect().top + window.scrollY
    const right = element.getBoundingClientRect().right - window.scrollX
    return (
      <div
        className="os-tabs-icon"
        style={{opacity: this.state.showArrowRight ? 1 : 0, top, left: right - 30}}>
        <MdChevronRight size={30} />
      </div>
    )
  }

  renderMdChevronLeft() {
    const element = this.inner
    if (!element) return
    const top = element.getBoundingClientRect().top + window.scrollY
    const left = element.getBoundingClientRect().left + window.scrollX
    return (
      <div
        className="os-tabs-icon"
        style={{opacity: this.state.showArrowLeft ? 1 : 0, top, left: left}}>
        <MdChevronLeft size={30} />
      </div>
    )
  }

  render() {
    return (
      <div className="os-tabs-container">
        {this.renderItems()}
        {this.renderShadow()}
        {this.renderMdChevronLeft()}
        {this.renderMdChevronRight()}
      </div>
    )
  }
}
