import React from 'react'
import { graphql } from 'react-apollo'
import WebUi from 'pcmli.umbrella.web-ui'
import { withProps, compose } from 'recompose'

import { CustomerQuery, CustomerQueryConfig, innerOptionRenderer } from './CustomerAutoSelect'
import { CustomerModel } from '../../imports/api/customer/model'

let queryConfig = {
  options: (ownProps) => {
    let searchObj = Object.assign({}, ownProps.searchObject)
    searchObj.status = CustomerModel.status.active
    searchObj.type = CustomerModel.type.milkProducer

    let filter = JSON.stringify(searchObj)

    return {variables: {filter}}
  },
}

//include the setting from the customer query config
queryConfig = {...CustomerQueryConfig, ...queryConfig}

export const ProducerAutoSelect = compose(
  withProps({
    innerOptionRenderer
  }),
  graphql(CustomerQuery, queryConfig)
)(WebUi.AutoSelect)

export const ProducerAutoSelectEditor = (props) => {
  return <WebUi.AutoSelectEditor component={ProducerAutoSelect} {...props} />
}

