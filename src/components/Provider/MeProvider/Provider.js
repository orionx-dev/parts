import React from 'react'
import PropTypes from 'prop-types'
import { MeContext } from '../../../helpers/contexts/meContext'
import { ResendVerificationEmailContext } from '../../../helpers/contexts/resendVerificationEmailContext'

function Component (props) {
  return (
    <MeContext.Provider value={props.me}>
      <ResendVerificationEmailContext.Provider value={props.resendVerificationEmail}>
        {props.children}
      </ResendVerificationEmailContext.Provider>
    </MeContext.Provider>
  )
}

Component.propTypes = {
  me: PropTypes.object,
  children: PropTypes.node,
  resendVerificationEmail: PropTypes.func
}

export default Component
