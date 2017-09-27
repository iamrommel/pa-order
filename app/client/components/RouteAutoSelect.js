import React from 'react'
import { graphql, gql  } from 'react-apollo'
import WebUi from 'pcmli.umbrella.web-ui'
import { withProps, compose } from 'recompose'

import { RouteModel } from '../../imports/api/route/model'
import { RouteDisplay } from './RouteDisplay'

const innerOptionRenderer = ({option}) => {
  return (
    <div className="autoSelect">
      <RouteDisplay value={option}/>
    </div>
  )
}

//region GraphQL query
const RouteQuery = gql`query allRoutes($filter: String) {
  allRoutes(filter: $filter) {
    _id
    remarks
    distance
    status
  }
}

`
//endregion

const RouteQueryConfig = (additionalOptions, additionalProps) => {
  const config = {
    options: (ownProps) => {

      let searchObj = Object.assign({}, ownProps.searchObject)
      searchObj.status = RouteModel.status.active
      let filter = JSON.stringify(searchObj)

      return {variables: {filter}}
    },
    props: ({data: {loading, allRoutes}}) => ({
      loading,
      options: allRoutes,
    }),
  }

  return Object.assign({}, config, additionalOptions, additionalProps)

}

export const RouteAutoSelect = compose(
  withProps({
    innerOptionRenderer,
    labelKey: 'remarks',
  }),
  graphql(RouteQuery, RouteQueryConfig())
)(WebUi.AutoSelect)

export const RouteAutoSelectEditor = (props) => {
  return <WebUi.AutoSelectEditor component={RouteAutoSelect} {...props} />
}
