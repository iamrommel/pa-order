import React from 'react'
import { Icon } from 'pcmli.umbrella.web-ui'
import { withRouter } from 'react-router-dom'
import { withUser } from '../containers/withUser'
import { compose } from 'recompose'


let LogoutText = ({logout}) => {
  return (
    <a onClick={logout}>
      <Icon name="log-out"/> Sign out
    </a>
  )
}
LogoutText = compose(withRouter, withUser())(LogoutText)
export { LogoutText }

let LogoutButton = ({logout, text = 'Sign out'}) => {
  return (
    <a className="btn btn-outline btn-primary   btn-block btn-lg" onClick={logout}>
      <Icon name="log-out"/> {text}
    </a>
  )
}
LogoutButton = compose(withRouter, withUser())(LogoutButton)
export { LogoutButton }

