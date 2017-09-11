import { Accounts } from 'meteor/accounts-base'
import { Utils } from 'pcmli.umbrella.core'
import { Meteor } from 'meteor/meteor'

Accounts.onCreateUser(function (options, user) {
  user.profile = options.profile || {}

  let picture = `${Meteor.absoluteUrl()}/img/female.jpg`
  let email = 'unknown@mailinator.com'
  if (user.services && user.services.facebook) {
    picture = `https://graph.facebook.com/${user.services.facebook.id}/picture/?type=normal`
    email = user.services.facebook.email
  }
  else if (user.services && user.services.google) {
    picture = user.services.google.picture
    email = user.services.google.email
  }

  user.profile.picture = picture
  user.status = 'pending'
  user.profile.email = email
  return user
})

const userByEmail = (email) => {
  const userByProfileEmail = Meteor.users.findOne({'profile.email': email})
  if (!userByProfileEmail)
    throw new Meteor.Error('USER_DOES_NOT_EXISTS', 'Cannot find the user with specified email address from the users profile.')

  return userByProfileEmail
}

const hashAccessToken = (accessToken) => {
  return Accounts._hashLoginToken(accessToken)
}

export const loginWithAccessTokenAndEmail = ({accessToken, email} = {}) => {

  const stampedToken = {
    token: accessToken,
    when: new Date()
  }

  //get the user
  const userByProfileEmail = userByEmail(email)

  //check if the user status is active
  if (userByProfileEmail.status === 'pending')
    throw new Meteor.Error('PENDING_USER', 'Your status is still pending, ask your admin to activate it.')

  //if the user exists then do this login
  Accounts._insertLoginToken(userByProfileEmail._id, stampedToken)

  return {
    ...userByProfileEmail,
    auth: {
      token: accessToken
    }
  }

}

export const logoutWithAccessTokenAndEmail = ({accessToken, email} = {}) => {

  const userByProfileEmail = userByEmail(email)

  const withHashAccessToken = hashAccessToken(accessToken)
  Accounts.destroyToken(userByProfileEmail._id, withHashAccessToken)

  return {
    ...userByProfileEmail,
    auth: {
      token: accessToken
    }
  }
}