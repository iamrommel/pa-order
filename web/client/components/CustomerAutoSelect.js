import React from 'react'
import { graphql, gql } from 'react-apollo'
import WebUi from 'pcmli.umbrella.web-ui'
import { withProps, compose } from 'recompose'

import { CustomerModel } from '../../imports/api/customer/model'
import { CustomerDisplay } from './CustomerDisplay'

export const innerOptionRenderer = ({option}) => {
  return (
    <div className="autoSelect">
      <CustomerDisplay value={option} showType/>
    </div>
  )
}

//region GraphQL query
export const CustomerQuery = gql`query allCustomers($filter: String) {
  allCustomers(filter: $filter) {
    _id
    name
    summary
    status
    code
    type
    contact {
      address1 {
        fullAddress
      }
    }
    logo {
      default
    }
  }
}

`
//endregion

export const CustomerQueryConfig = {
  options: (ownProps) => {

    let searchObj = Object.assign({}, ownProps.searchObject)
    searchObj.status = CustomerModel.status.active
    let filter = JSON.stringify(searchObj)

    return {variables: {filter}}
  },
  props: ({data: {loading, allCustomers}}) => ({
    loading,
    options: allCustomers,
  }),
}

export const CustomerAutoSelect = compose(
  withProps({
    innerOptionRenderer
  }),
  graphql(CustomerQuery, CustomerQueryConfig)
)(WebUi.AutoSelect)

export const CustomerAutoSelectEditor = (props) => {
  return <WebUi.AutoSelectEditor component={CustomerAutoSelect} {...props} />
}

