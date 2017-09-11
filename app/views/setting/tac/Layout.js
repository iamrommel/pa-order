import React from 'react'
import { CommonScreen, BusyButton } from 'pcmli.umbrella.react-native'
import { Text, Body, H3, variables } from 'native-base'

//import styles from './../../../../native-base-theme/variables/main'

class Layout extends React.Component {

  render () {
    return (
      <CommonScreen mainToolbar="back" title="Terms and Condition">

      </CommonScreen>
    )
  }
}

Layout.defaultProps = {

  style: {}
}
Layout.propTypes = {}
export { Layout }
