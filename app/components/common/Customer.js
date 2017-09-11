import React from 'react'
import { gql, graphql } from 'react-apollo'
import { Thumbnail } from 'native-base'
import _ from 'lodash'
import { AutoPickerEditor } from 'pcmli.umbrella.react-native'

import { CommonViewer } from './Display'

//region Customer Profile Image
export const CustomerProfileImage = (props) => {
  let {value} = props

  const imageSource = {uri: value && value.default}
  return (
    <Thumbnail small source={imageSource}/>
  )
}

CustomerProfileImage.propTypes = {
  value: React.PropTypes.shape({
    default: React.PropTypes.string,
  })
}
//endregion

//region Customer Viewer
export const CustomerViewer = (props) => {

  let {value, style} = props
  return (
    <CommonViewer value={value} icon="person" style={style}/>
  )
}
//endregion

//region GraphQL query
const CustomerQuery = gql`query customers($filter: String) {
  customers(filter: $filter) {
    _id
    summary
    status
    type
  }
}

`

const RouteCustomerQuery = gql`query routeCustomer($filter: String) { 
  routes(filter: $filter) {    
    _id
    details {      
      customer {
        _id
        summary
        type
        status
      }
    }
  }
}

`

//endregion

const CustomerQueryConfig = (additionalOptions, additionalProps) => {
  const config = {
    options: (ownProps) => {

      let searchObj = Object.assign({}, ownProps.searchObject)
      searchObj.status = 'Active'
      let filter = JSON.stringify(searchObj)
      const sortObj = {sort: {remarks: -1}}
      let options = JSON.stringify(sortObj)

      return {variables: {filter, options}}

    },
    props: ({data: {loading, customers, refetch}}) => ({
      loading,
      options: customers,
      valueKey: '_id',
      labelKey: 'summary',
      placeholder: 'Select the customer',
      onRefresh: refetch
    }),
  }

  return Object.assign({}, config, additionalOptions, additionalProps)

}

export const CustomerPicker = graphql(CustomerQuery, CustomerQueryConfig())(AutoPickerEditor)

export const CustomerEditor = (props) => {
  return (
    <InputLayout2 {...props}>
      <CustomerPicker {...props} />
    </InputLayout2>
  )
}

const RouteProducerOrPlant = (props) => {

  //region GraphQL config
  const config = {
    options: (ownProps) => {

      let searchObj = Object.assign({}, ownProps.searchObject)
      searchObj.status = 'Active'
      let filter = JSON.stringify(searchObj)

      return {variables: {filter}}

    },
    props: ({data: {loading, routes, refetch}}) => {
      let options = _.get(routes, '[0].details', [])

      options = _.map(options, 'customer')
      options = _.filter(options, props.listLocalFilter)

      return {
        loading,
        options,
        valueKey: '_id',
        labelKey: 'summary',
        placeholder: 'Select the route',
        onRefresh: refetch
      }
    },
  }
  //endregion

  const Picker = graphql(RouteCustomerQuery, config)(AutoPickerEditor)

  return (
    <Picker {...props} />
  )

}

export const RoutePlantEditor = (props) => {
  //filter only the customer that are active and the type is 'Milk Producer'

  const filter = {status: 'Active', type: 'Plant'}

  return <RouteProducerOrPlant {...props} listLocalFilter={filter}/>

}

export const RouteProducerEditor = (props) => {
  //filter only the customer that are active and the type is 'Milk Producer'

  const filter = {status: 'Active', type: 'Milk Producer'}

  return <RouteProducerOrPlant {...props} listLocalFilter={filter}/>

}
