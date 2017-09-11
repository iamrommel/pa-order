import React from 'react'
import { Text, List, ListItem, Body, Right, H3, Icon } from 'native-base'
import { CommonScreen, BusyButton } from 'pcmli.umbrella.react-native'
import { Actions } from 'react-native-router-flux'
import {NavKeys} from '../../utils/Constants'

let Layout = () => {

  const _navigateTo = (routeName) => {
    Actions[routeName]()
  }

  return (
    <CommonScreen mainToolbar="menu" title="Settings">

      <List>

        <ListItem onPress={ () => _navigateTo(NavKeys.SettingCopyrightNotice)}>
          <Body>
          <H3>Copyright Notice</H3>
          <Text note>Show the copyright information about this application.</Text>
          </Body>
          <Right>
            <Icon name="arrow-right"/>
          </Right>
        </ListItem>
        <ListItem onPress={ () => _navigateTo(NavKeys.SettingTermsAndCondition)}>
          <Body>
          <H3>Terms and Condition</H3>
          <Text note>Show the terms and condition in using this application.</Text>
          </Body>
          <Right>
            <Icon name="arrow-right"/>
          </Right>
        </ListItem>

      </List>
    </CommonScreen>
  )
}

Layout.defaultProps = {

  style: {}
}
Layout.propTypes = {}
export { Layout }
