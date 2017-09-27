import React from 'react'
import { graphql, gql } from 'react-apollo'
import WebUi from 'pcmli.umbrella.web-ui'
import { withProps, compose } from 'recompose'

import { DriverViewer } from './DriverViewer'
import { DriverModel } from '../../imports/api/driver/model'

const innerOptionRenderer = ({option}) => {
  return (
    <div className="autoSelect">
      <DriverViewer value={option}/>
    </div>
  )
}

//region GraphQL query
const DriverQuery = gql`query allDrivers($filter: String) {
  allDrivers(filter: $filter) {
    _id
    status
    name
    logo {
      default
    }
    contact {
      address1 {
        fullAddress
      }
    }
  }
}
`
//endregion

const queryConfig = {
  options: (ownProps) => {

    let searchObj = Object.assign({}, ownProps.searchObject)
    searchObj.status = DriverModel.status.active
    let filter = JSON.stringify(searchObj)

    return {variables: {filter}}
  },
  props: ({data: {loading, allDrivers}}) => ({
    loading,
    options: allDrivers,
  }),
}

export const DriverAutoSelect = compose(
  withProps({
    innerOptionRenderer
  }),
  graphql(DriverQuery, queryConfig)
)(WebUi.AutoSelect)

export const DriverAutoSelectEditor = (props) => {
  return <WebUi.AutoSelectEditor component={DriverAutoSelect} {...props} />
}


