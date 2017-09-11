import React from 'react'
import { Image } from 'react-native'
import { Container, Text, Icon, Button, View, variables, H2, Spinner } from 'native-base'

import { version } from '../../package.json'
import { LoginButton } from '../../components/common/LoginButton'

class SigninScene extends React.Component {

  constructor () {
    super()
  }

  render () {

    const {style} = this.props

    return (
      <Container style={style.container}>
        <Image source={style.launchscreenBg} style={style.imageContainer}>
          <View style={style.content}>
            <View style={style.textCenter}>
              <H2 style={style.text}>Welcome to </H2>
              <H2 style={style.text}>i lab YO</H2>
              <Text style={style.text}>v {version}</Text>
            </View>
            <LoginButton/>
          </View>
        </Image>
      </Container>
    )
  }
}

SigninScene.defaultProps = {
  style: {
    container: {},
    content: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 40,
      marginRight: 40
    },
    text: {
      color: variables.inverseTextColor
    },
    textCenter: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loginButton: {
      marginTop: 20, marginBottom: 20
    },

    launchscreenBg: require('../../assets/img/launchscreen-bg.png'),
    imageContainer: {
      flex: 1,
      width: null,
      height: null,
    },

  },

}

export { SigninScene }
