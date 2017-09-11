import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { reducer as reduxFormReducer } from 'redux-form'
import { routerReducer, } from 'react-router-redux'
import {ApolloClient} from 'react-apollo'
import { meteorClientConfig } from 'meteor/apollo'

export const setupReduxStore = (externalReducer) => {

  const defaultReducers = {
    form: reduxFormReducer,
    routing: routerReducer
  }

  const withExternalReducer = Object.assign({}, defaultReducers, externalReducer)

  const reducers = combineReducers(withExternalReducer)

  const enhancer = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  )
  return createStore(reducers, {}, enhancer)

}

export const setupApolloClient = () => {
  const client = new ApolloClient(meteorClientConfig())

  return client
}


