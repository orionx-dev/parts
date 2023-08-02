import React from 'react'
import PropTypes from 'prop-types'
import {Tooltip as ReactTooltip} from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

export default function Tooltip(props) {
  const propTypes = {
    children: PropTypes.node,
    content: PropTypes.string,
    place: PropTypes.string
  }

  const id = randomString(12)

  return (
    <div style={{display: 'inline-block'}}>
      <a className={`${id}`}>{props.children}</a>
      <ReactTooltip anchorSelect={`.${id}`} content={props.content} place={props.place} />
    </div>
  )
}

function randomString(chars) {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < chars; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)) }

  return text
}
