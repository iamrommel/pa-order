import React from 'react'
import { CommonScreen, BusyButton } from 'pcmli.umbrella.react-native'
import { Text, Body } from 'native-base'

class Layout extends React.Component {

  render () {

    return (
      <CommonScreen mainToolbar="back" title="Copyright Notice">

        <Body style={{marginTop: 50, marginLeft: 10, marginRight: 10}}>
        <Text>i lab yo dashboard</Text>
        <Text>Copyright 2017, Rommel C. Manalo</Text>
        <Text>All rights reserved</Text>

        <Text style={{marginTop: 30}}>All other trademarks are the property of their respective owner.</Text>
        <Text style={{marginTop: 30}}>Contact the developer manalo.rommel@gmail.com for more information.</Text>

        </Body>


      </CommonScreen>
    )
  }
}

Layout.defaultProps = {

  style: {}
}
Layout.propTypes = {}
export { Layout }
