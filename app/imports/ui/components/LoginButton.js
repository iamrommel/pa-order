import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose, withProps } from 'recompose'
import { Meteor } from 'meteor/meteor'
import { Icon } from 'pcmli.umbrella.web-ui'
import toastr from 'toastr'

import { routesDef } from '../../imports/startup/client/config/routes'

let LoginButton = ({history}) => {

  const loginCallback = (error) => {

    if (error) {
      const {message} = error
      toastr.error(message)
      return
    }

    history.push(routesDef.JoinPage.path)
  }

  const handleFacebookLogin = () => {
    const options = {
      requestPermissions: ['public_profile', 'email']
    }

    Meteor.loginWithFacebook(options, loginCallback)
  }

  const handleGoogleLogin = () => {
    const options = {
      requestPermissions: ['profile', 'email']
    }

    Meteor.loginWithGoogle(options, loginCallback)
  }

  return (
    <div>
      <a className="btn btn-primary btn-google-plus btn-outline btn-block btn-lg" onClick={handleGoogleLogin}>
        <Icon name="google"/> Sign in with Google
      </a>
    </div>
  )

}

LoginButton = compose(withRouter)(LoginButton)
export { LoginButton }