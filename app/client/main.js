import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import React from 'react'
import { HashRouter  as Router, Route, Switch } from 'react-router-dom'
import { PageLayoutNotFound } from 'pcmli.umbrella.web-ui'
import { ApolloProvider } from 'react-apollo'

import '../imports/startup/client/index'
import { setupApolloClient, setupReduxStore, }  from '../imports/startup/client/setup'
import { mainRoutes, blankRoutes, defaultRoute } from '../imports/startup/client/config/routes'

const apolloClient = setupApolloClient()
const apollo = apolloClient.reducer()

const store = setupReduxStore({apollo})

Meteor.startup(() => {

  render(
    <ApolloProvider store={store} client={apolloClient}>
      <Router>
        <Switch>
          {defaultRoute}
          {mainRoutes}
          {blankRoutes}
          <Route component={ PageLayoutNotFound }/>
        </Switch>
      </Router>
    </ApolloProvider>, document.getElementById('root'))
})

