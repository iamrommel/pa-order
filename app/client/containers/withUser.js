import React from 'react'
import { Utils, withDocument, withUser as withUserCore } from 'pcmli.umbrella.core'
import {withAuthRedirect} from 'pcmli.umbrella.web-ui'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { routesDef } from '../../imports/startup/client/config/routes'


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

export const withUser = compose(
  withMeteorUser(),
  withAuthRedirect(),
  withRouter,
  withUserCore()
)