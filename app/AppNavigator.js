import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { variables } from 'native-base'
import { actions } from 'react-native-navigation-redux-helpers'
import { Router, Scene } from 'react-native-router-flux'
import { AppDrawer } from 'pcmli.umbrella.react-native'

import { SigninScene } from './views/login/index'
import { Home } from './views/home/'
import { Overview } from './views/overview/index'
import { MainScene as SettingMainScene, CopyrightScene, TacScene } from './views/setting/index'
import {MainScene as MenuScene} from './views/menu/MainScene'
import SideBar from './components/sidebar'

import { NavKeys } from './utils/Constants'

const {
  popRoute,
} = actions

class AppNavigator extends Component {

  render () {
    return (
      <AppDrawer
        sideBarContent={<SideBar navigator={this._navigator}/>}
      >
        <StatusBar
          hidden={true}
          backgroundColor={variables.statusBarColor}
        />
        <Router>
          <Scene key="root">
            <Scene key={NavKeys.Signin}  hideNavBar component={SigninScene}/>
            <Scene key={NavKeys.Overview}  component={Overview}/>
            <Scene key={NavKeys.Home} initial hideNavBar component={Home}/>
            <Scene key={NavKeys.Menu} component={MenuScene}/>
            <Scene key={NavKeys.Setting} component={SettingMainScene}/>
            <Scene key={NavKeys.SettingCopyrightNotice} component={CopyrightScene}/>
            <Scene key={NavKeys.SettingTermsAndCondition} component={TacScene}/>
          </Scene>
        </Router>
      </AppDrawer>
    )
  }
}

const bindAction = dispatch => ({
  closeDrawer: () => dispatch(closeDrawer()),
  popRoute: key => dispatch(popRoute(key)),
})

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  navigation: state.cardNavigation,
})

export default connect(mapStateToProps, bindAction)(AppNavigator)
