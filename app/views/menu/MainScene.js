import React from 'react'
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body } from 'native-base'
import { CommonScreen, BusyButton } from 'pcmli.umbrella.react-native'

import { MenuDeck } from './menu-deck'

export const MainScene = () => {
  return (
    <CommonScreen mainToolbar="menu" title="Menu">
      <MenuDeck/>
    </CommonScreen>
  )
}
