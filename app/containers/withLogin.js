import React from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'
import { Facebook, Google } from 'expo'
import { AsyncStorage } from 'react-native'
import { gql, graphql } from 'react-apollo'
import { compose } from 'recompose'

const loginQuery = gql`mutation loginWithAccessTokenAndEmail($accessToken: String!, $email: String!) {
  loginWithAccessTokenAndEmail(accessToken: $accessToken, email: $email) {
    _id
    auth {
      token
      when
    }
  }
}`
const logoutQuery = gql`mutation logoutWithAccessTokenAndEmail($accessToken: String!, $email: String!) {
  logoutWithAccessTokenAndEmail(accessToken: $accessToken, email: $email) {
    _id
    auth {
      token
      when
    }
  }
}
`

const loginMutationConfig = {
  name: 'loginWithAccessTokenAndEmail',
  props: ({ownProps, loginWithAccessTokenAndEmail}) => ({
    onLoginWithAccessTokenAndEmail: (params) => {
      return loginWithAccessTokenAndEmail({variables: {...params}})
    }

  })
}
const logoutMutationConfig = {
  name: 'logoutWithAccessTokenAndEmail',
  props: ({ownProps, logoutWithAccessTokenAndEmail}) => ({
    onLogoutWithAccessTokenAndEmail: (params) => {
      return logoutWithAccessTokenAndEmail({variables: {...params}})
    }

  })
}

export const withLogin = () => {

  return (WrappedComponent) => {
    class With extends React.Component {

      handleTokenResult = (loginResult, type) => {
        let accessToken = null, email = '', error = null

        if (loginResult.error || loginResult.cancelled) {
          error = loginResult.error || loginResult.cancelled
        }
        else {
          if (type === 'facebook') {
            accessToken = loginResult.token
            email = loginResult.user.email

          }
          else if (type === 'google') {
            accessToken = loginResult.idToken
            email = loginResult.user.email
          }

        }

        return {
          accessToken,
          email,
          error
        }
      }

      onGoogle = async () => {
        try {
          const result = await Google.logInAsync({
            androidClientId: '413094183873-t0ui9t3iebavlsjgr1tqvm5n8vpg8fni.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
          })

          if (result.type === 'success') {
            return result
          } else {
            return {cancelled: true}
          }
        } catch (e) {
          return {error: true}
        }
      }
      onFacebook = async () => {

        try {
          const {type, token} = await Facebook.logInWithReadPermissionsAsync(
            '388536118173525', {
              permissions: ['public_profile', 'email'],
            })

          if (type === 'success') {
            return {success: true, token}
          }
        }
        catch (err) {
          throw new Error({message: 'Facebook error login' + JSON.stringify(err)})
        }

      }
      onLogin = async (type) => {

        let tokenResult = null, result = null
        if (type === 'google') {
          result = await this.onGoogle()
          tokenResult = this.handleTokenResult(result, 'google')

        }
        else if (type === 'facebook') {
          result = await this.onFacebook()
          tokenResult = this.handleTokenResult(result, 'facebook')
        }

        if (tokenResult.error) {
          return tokenResult
        }
        else {
          //set the credentials on the local storage
          AsyncStorage.setItem('haulerApp.token', JSON.stringify(tokenResult))

          //call the hauler.service login
          const {onLoginWithAccessTokenAndEmail} = this.props

          const loginResult = await onLoginWithAccessTokenAndEmail(tokenResult)

          console.log(loginResult, 'loginResult ')

          //if there some error in loginResult pass it over to tokenResult
          if (loginResult.errors)
            tokenResult.error = loginResult.errors

          return tokenResult

        }

      }
      onLogout = async () => {
        const {onLogoutWithAccessTokenAndEmail} = this.props

        let tokenResult = await AsyncStorage.getItem('haulerApp.token')
        tokenResult = JSON.parse(tokenResult)
        return onLogoutWithAccessTokenAndEmail(tokenResult)

      }

      render () {

        const login = {
          onGoogle: this.onGoogle,
          onFacebook: this.onFacebook,
          onLogout: this.onLogout,
          onLogin: this.onLogin

        }

        return <WrappedComponent login={login} {...this.props} />
      }
    }

    With.displayName = wrapDisplayName(WrappedComponent, 'withLogin')

    With = compose(
      graphql(loginQuery, loginMutationConfig),
      graphql(logoutQuery, logoutMutationConfig),
    )(With)

    return With

  }

}
