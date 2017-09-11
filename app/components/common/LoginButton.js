import React from 'react'
import { Container, Text, Icon, Button, View, variables, H2, Spinner } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { BusyButton } from 'pcmli.umbrella.react-native'
import { Alert } from 'react-native'

import { withLogin } from '../../containers/withLogin'
import { NavKeys } from '../../utils/Constants'

class LoginButton extends React.Component {

  constructor () {
    super()
    this.state = {logging: false}
  }

  handleLogin = async (type) => {
    const {login} = this.props

    try {
      this.setState({logging: true})
      const loginResult = await login.onLogin(type)
      this.setState({logging: false})

      //navigate to the overview page after the successful login
      if (loginResult.error)
        Alert.alert('Login error', 'You cannot continue using the application.')

      Actions[NavKeys.Overview]()

    }
    catch (e) {
      this.setState({logging: false})

      //should handle the graphql error here
      if (e.graphQLErrors && e.graphQLErrors.length > 0) {
        const message = e.graphQLErrors[0].message

        Alert.alert('Login error', message)

      }

    }

  }

  render () {

    const {logging} = this.state

    return (
      <View>
        <View style={{margin: 20}}>
          <BusyButton icon="google" text="Google Sign In" warning block isBusyText="loading" isBusy={logging} onPress={() => this.handleLogin('google')}/>
        </View>
        <View style={{margin: 20}}>
          <BusyButton icon="facebook" text="Facebook Sign In" warning  block isBusyText="loading" isBusy={logging} onPress={() => this.handleLogin('facebook')}/>
        </View>
      </View>
    )
  }
}

LoginButton = withLogin()(LoginButton)
export { LoginButton }
