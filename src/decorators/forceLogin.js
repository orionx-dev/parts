import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MeContext } from '../helpers/contexts/meContext'

export default function (ComposedComponent) {
  return function WithRoles(props) {
    const me = useContext(MeContext)
    const navigate = useNavigate()

    function redirect() {
      navigate('/login', {
        state: { nextPathname: window.location.pathname }
      })
      return <span />
    }

    if (!me) return redirect()
    return <ComposedComponent {...props} />
  }
}
