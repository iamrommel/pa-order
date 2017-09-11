import React, { Component } from 'react'
import { Image, View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { Container, Button, H3, H2, Text } from 'native-base'

import { openDrawer } from '../../actions/drawer'
import styles from './styles'

const launchscreenBg = require('../../assets/img/launchscreen-bg.png')
const launchscreenLogo = require('../../assets/img/logo-kitchen-sink.png')

class Home extends Component { // eslint-disable-line

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  render () {
    return (
      <Container>
        <StatusBar barStyle='light-content'/>
        <Image source={launchscreenBg} style={styles.imageContainer}>
          <View style={styles.logoContainer}>
            <Image source={launchscreenLogo} style={styles.logo}/>
          </View>
          <View style={{alignItems: 'center', marginBottom: 50, backgroundColor: 'transparent'}}>
            <H3 style={styles.text}>App to showcase</H3>
            <View style={{marginTop: 8}}/>
            <H2 style={styles.text}>i lab Yo</H2>
            <H3 style={styles.text}>frozen yogurt</H3>

          </View>
          <View style={{marginBottom: 80}}>
            <Button
              style={{backgroundColor: '#6FAF98', alignSelf: 'center'}}
              onPress={this.props.openDrawer}
            >
              <Text>Lets Go!</Text>
            </Button>
          </View>
        </Image>
      </Container>
    )
  }
}

function bindActions (dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  }
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  routes: state.drawer.routes,
})

Home = connect(mapStateToProps, bindActions)(Home)
export { Home }