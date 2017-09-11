import React from 'react'
import { ListItem, Text, Icon, Left } from 'native-base'
import { Actions } from 'react-native-router-flux'

import { withLogin } from '../../containers/withLogin'
import { NavKeys } from '../../utils/Constants'

class LogoutMenuItem extends React.Component {

  constructor () {
    super()
    this.state = {logging: false}
  }

  handleLogout = async () => {
    const {login, after} = this.props

    try {
      this.setState({logging: true})
      await login.onLogout()
      this.setState({logging: false})

      Actions[NavKeys.Signin]()
      after()

    }
    catch (e) {
      this.setState({logging: false})
    }

  }

  render () {

    const {logging} = this.state
    const {style} = this.props

    return (
      <ListItem button noBorder onPress={this.handleLogout}>
        <Left>
          <Icon active name="sign-out" style={style.icon}/>
          <Text>Logout</Text>
        </Left>
      </ListItem>
    )
  }
}

LogoutMenuItem.defaultProps = {
  style: {
    icon: {
      color: '#66B237',
      fontSize: 26,
      width: 30
    }
  }
}
LogoutMenuItem = withLogin()(LogoutMenuItem)
export { LogoutMenuItem }
