import React from 'react'
import { compose } from 'recompose'
import wrapDisplayName from 'recompose/wrapDisplayName'

import { withUser } from './withUser'

export const withSignin = (config = {}) => {

  return (WrappedComponent) => {
    class With extends React.Component {


      ensureSignIn = () => {
        const {redirectPath, user = {}} = this.props

        if (!user.loading) {
          const {redirectAuthenticatedUser} = user
          redirectAuthenticatedUser && redirectAuthenticatedUser({redirectPath})
        }
      }

      componentDidMount () {
        this.ensureSignIn()
      }

      componentWillReceiveProps () {
        this.ensureSignIn()
      }

      render () {
        return <WrappedComponent
          {...this.props}/>
      }
    }

    With = compose(withUser)(With)

    With.displayName = wrapDisplayName(WrappedComponent, 'withSignin')

    return With

  }

}