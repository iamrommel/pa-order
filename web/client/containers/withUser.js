import React from 'react'
import { Utils, withDocument } from 'pcmli.umbrella.core'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { compose } from 'recompose'
import wrapDisplayName from 'recompose/wrapDisplayName'
import { withRouter } from 'react-router-dom'
import { gql } from 'react-apollo'
import { routesDef } from '../../imports/startup/client/config/routes'

export const withUser = (config = {}) => {

  let {query} = config
  query = query || gql`query allUsers($filter: String, $options: String) {
  allUsers(filter: $filter, options: $options ) {
    _id
    status
    tenantId
    profile {
      name
      picture
      email
    }
  }
}
`

  return (WrappedComponent) => {
    class With extends React.Component {

      getStatus = () => {
        const {document, _id} = this.props
        const {tenantId, status} = document || {}
        const hasTenant = !!(tenantId)
        const isPending = status === 'pending'
        const isActive = status === 'active'
        const isInActive = status === 'inactive'
        const loggedIn = !!_id

        return {
          loggedIn,
          hasTenant,
          isPending,
          isActive,
          isInActive
        }
      }

      redirectAuthenticatedUser = ({redirectPath} = {}) => {
        const {loggedIn, isPending, hasTenant, isInActive, isActive} = this.getStatus()
        const {history,  loading} = this.props

        if (loading)
          return

        if (loggedIn && hasTenant && isActive) {
          if (redirectPath) {
            history.replace(`${redirectPath}`)
          }
        }
        else if (loggedIn && (!hasTenant || isPending || isInActive)) {

          history.replace(`${routesDef.JoinPage.path}`)
        }
        else {
          history.replace(`${routesDef.LoginPage.path}`)
        }
      }

      _logout = () => {
        const {logout, history} = this.props
        logout && logout({history})
      }

      render () {

        const {document, loading, loggingIn} = this.props
        const status = this.getStatus()

        const user = {
          ...status,
          loading,
          loggingIn,
          logout: this._logout,
          redirectAuthenticatedUser: this.redirectAuthenticatedUser,
          ...document
        }

        return <WrappedComponent user={user} {...this.props} />
      }
    }

    With.displayName = wrapDisplayName(WrappedComponent, 'withUser')
    With = compose(
      withMeteorUser(),
      withDocument({query, entity: 'allUsers'}),
      withRouter,)(With)

    return With

  }

}

//Note: This cannot be at the core because of the dependency on Meteor package
export const withMeteorUser = () => {
  return (WrappedComponent) => {
    return createContainer(() => {
      const userId = Meteor.userId()

      const logout = ({history}) => {
        if (!history) return

        if (userId) {
          Meteor.logout(() => {
            //navigate to login after login or logout
            history.push(routesDef.LoginPage.path)
          })
        }
        else {
          history.push(routesDef.LoginPage.path)
        }
      }

      return {
        _id: userId,
        userId,
        loggingIn: Meteor.loggingIn(),
        logout
      }
    }, WrappedComponent)
  }
}
