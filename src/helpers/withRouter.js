import React from 'react'
import {
  useLocation,
  useNavigate,
  useParams,
  useOutletContext
} from 'react-router-dom'

export default function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation()
    let navigate = useNavigate()
    let params = useParams()
    const contexto = useOutletContext()
    let router = {
      location,
      navigate,
      params,
      push: navigate,
      replace: (to) => navigate(to, {replace: true}),
      go: navigate,
      goBack: (pages = -1) => navigate(pages),
      goForward: (pages = 1) => navigate(pages)
    }
    return (
      <Component
        {...props}
        router={router}
        {...contexto}
        params={params}
      />
    )
  }

  return ComponentWithRouterProp
}
