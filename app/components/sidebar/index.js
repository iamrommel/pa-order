import React, { Component } from 'react'
import { Image } from 'react-native'
import { connect } from 'react-redux'
import { Content, List, Container, View } from 'native-base'

import { MenuItem } from 'pcmli.umbrella.react-native'
import { Actions } from 'react-native-router-flux'
import { NavKeys } from '../../utils/Constants'
import { closeDrawer } from '../../actions/drawer'
import navigateTo from '../../actions/sideBarNav'
import { LogoutMenuItem } from '../../components/common/LogoutMenuItem'

const logo = require('../../assets/img/logo.png')

class SideBar extends Component {

  static propTypes = {
    navigateTo: React.PropTypes.func,
    themeState: React.PropTypes.string,
    changePlatform: React.PropTypes.func,
    changeMaterial: React.PropTypes.func,
  }

  static defaultProps = {
    styles: {
      headerLogo: {
        alignSelf: 'center',
        resizeMode: 'cover',
        position: 'relative',
        marginBottom: 10,
      },
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
    }
  }


  menuItemStyle = {
    icon: {
      color: '#66B237',
      fontSize: 26,
      width: 30
    }
  }


  render () {
    return (
      <Content
        bounces={false}
        style={{flex: 1, backgroundColor: '#fff', top: -1}}
      >
        <View>
          <Image source={logo} style={this.props.styles.headerLogo}/>
        </View>

        <List>
          <MenuItem name="Overview" iconName="dashboard" style={this.menuItemStyle} onPress={() => {
            Actions[NavKeys.Overview]()
            this.props.closeDrawer()
          }}/>

          <MenuItem name="Menu" iconName="book" style={this.menuItemStyle} onPress={() => {
            Actions[NavKeys.Menu]()
            this.props.closeDrawer()
          }}/>

          <MenuItem name="Settings" iconName="cog" style={this.menuItemStyle} onPress={() => {
            Actions[NavKeys.Setting]()
            this.props.closeDrawer()
          }}/>

          <LogoutMenuItem after={this.props.closeDrawer} />


        </List>

      </Content>
    )
  }
}

function bindAction (dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    closeDrawer: () => dispatch(closeDrawer()),
  }
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
})

export default connect(mapStateToProps, bindAction)(SideBar)
