import React from 'react'
import { Platform, StatusBar, View } from 'react-native'
import { Font, AppLoading } from 'expo'
import { ApolloProvider } from 'react-apollo'
import { StyleProvider, getTheme, } from 'native-base'

import Navigation from './AppNavigator'
import theme from './native-base-theme/variables/platform'

import configureStore, { apolloClient } from './configureStore'

export default class App extends React.Component {
  constructor () {
    super()
    this.state = {
      isLoading: false,
      isReady: false,
      store: configureStore(() => this.setState({isLoading: false})),
    }
  }

  async componentWillMount () {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('native-base/Fonts/Ionicons.ttf')
    })

    this.setState({isReady: true})
  }

  render () {

    if (!this.state.isReady) {
      return <AppLoading/>
    }

    return (
      <StyleProvider style={getTheme(theme)}>
        <ApolloProvider store={this.state.store} client={apolloClient()}>
          <Navigation/>
        </ApolloProvider>
      </StyleProvider>
    )
  }
}

const styles = {
  paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
}
