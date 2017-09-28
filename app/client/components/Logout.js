import React from 'react'
import { Icon } from 'pcmli.umbrella.web-ui'
import { withRouter } from 'react-router-dom'
import { withUser } from '../containers/withUser'
import { compose } from 'recompose'

let LogoutText = ({user = {}}) => {
  const {logout} = user
  return (
    <a onClick={logout}>
      <Icon name="sign-out"/> Sign out
    </a>
  )
}
LogoutText = compose(withRouter, withUser)(LogoutText)
export { LogoutText }

let LogoutButton = ({user = {}, text = 'Sign out'}) => {
  const {logout} = user
  return (
    <a className="btn btn-outline btn-primary   btn-block btn-lg" onClick={logout}>
      <Icon name="sign-out"/> {text}
    </a>
  )
}
LogoutButton = compose(withRouter, withUser)(LogoutButton)
export { LogoutButton }

