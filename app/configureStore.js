import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { ApolloClient, createNetworkInterface } from 'react-apollo'
import { AsyncStorage } from 'react-native'

import reducer from './reducers'

export const apolloClient = () => {

  //const uri = 'https://97d7f670.ngrok.io/graphql'
  const uri ='https://haulerbeta.totalmilk.com/graphql'

  const networkInterface = createNetworkInterface({uri})
  networkInterface.use([{
    applyMiddleware (req, next) {
      if (!req.options.headers) {
        req.options.headers = {}  // Create the header object if needed.
      }

      // get the authentication token from local storage if it exists
      AsyncStorage.getItem('haulerApp.token', (error, token) => {


        //if there is no available token or there is an error then just do next
        token = JSON.parse(token)
        if (!token || error) next()

        // add the login token to the request headers
        req.options.headers['meteor-login-token'] = token.accessToken
        next()
      })

    }
  }])

  const client = new ApolloClient({
    networkInterface,
    addTypename: true,
    dataIdFromObject: (result) => {
      if (result._id && result.__typename) {
        return result.__typename + result._id
      }
      return null
    },
    useMeteorAccounts: true,
  })

  return client
}

export default function configureStore (onCompletion) {

  const enhancer = compose(applyMiddleware(thunk))

  const store = createStore(reducer, {}, enhancer)
  return store
}
