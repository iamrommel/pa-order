import { gql } from 'react-apollo'
import Moment from 'moment'
import { Utils } from 'pcmli.umbrella.core'
import _ from 'lodash'

export const defaultParamsToDoc = ({params, ownProps}) => {
  return _.pick(params, ['_id', 'timeStamp', 'ticketNo'])
}

export const headerParamsToDoc = ({params}) => {

  let route = _.pick(params, ['route._id'])
  route = _.isEmpty(route) ? {route} : route

  const result = {
    $set: {
      ...defaultParamsToDoc({params}),
      ...route
    }
  }
  return result
}

export const listQueryConfig = () => {

  //region GraphQL query
  const query = gql`query allPickups($filter: String, $options: String) {
  allPickups(filter: $filter, options: $options) {
    _id
    timeStamp
    ticketNo
    totalWeight
    details(end: 5) {
      customer {
        summary
         logo {
          default
        }
      }
    }
    deliveries {
      customer {
        summary
        logo {
          default
        }
      }
    }
  }
  
  pageInfo(filter: $filter, type: "PickupModel") {
    count
  }
}
`
  //endregion

  return {query, entity: 'allPickups'}
}

//region documentFragment
const documentFragment = `
  _id
    ticketNo
    timeStamp
    route {
        _id
        remarks
        distance
        status
    }
    totalWeight
    deliveries {
      _id
      customer {
        _id
        summary
        logo {
          default
        }
      }
      weight
      timeStamp
    }
    details {
      _id
      customer {
        _id
        summary
        logo {
          default
        }
        contact {
          address1 {
            street1
            fullAddress
          }
        }
      }
      gradeType
      weight
      temperature
      code
      timeStamp
      remarks
    }`
//endregion

export const documentQueryConfig = () => {

  //region GraphQL query
  const query = gql`query singlePickup($filter: String, $options: String) {
  allPickups(filter: $filter, options: $options) {
   ${documentFragment}
  }
}
`
  //endregion

  const extraOptions = {
    pollInterval: 20000
  }

  return {query, entity: 'allPickups', extraOptions}
}

//region mutation query
const mutationQuery = gql`mutation mutatePickups($_id: String!, $doc: String, $_type: String, $filter: String) {
  mutatePickups(_id: $_id, doc: $doc, _type: $_type, filter : $filter) {
    ${documentFragment}
  }
}

`
//endregion

export const defaultUpdateMutationConfig = {
  _type: 'update', entity: 'mutatePickups', query: mutationQuery, paramsToDoc: defaultParamsToDoc, refetchQueries: ['singlePickup']
}

export const defaultCreateMutationConfig = {
  _type: 'create', entity: 'mutatePickups', query: mutationQuery, paramsToDoc: defaultParamsToDoc

}

export const defaultDeleteMutationConfig = {
  _type: 'delete', entity: 'mutatePickups', query: mutationQuery, paramsToDoc: defaultParamsToDoc, refetchQueries: ['singlePickup']
}

export const formConfig = {
  form: 'PickupAddForm',
  validate: (values) => {
    const errors = {}

    if (!values.ticketNo)
      errors.ticketNo = 'Required'

    if (!values.timeStamp)
      errors.timeStamp = 'Required'

    return errors
  }
}

export const deliveryFormConfig = {
  form: 'PickupDeliveryForm',
  validate: (values) => {
    const errors = {deliveries: {$: {}}}

    if (!values.deliveries.$.customer)
      errors.deliveries.$.customer = 'Required'

    if (!values.deliveries.$.timeStamp)
      errors.deliveries.$.timeStamp = 'Required'

    if (!values.deliveries.$.weight)
      errors.deliveries.$.weight = 'Required'

    return errors
  }

}

export const itemFormConfig = {
  form: 'PickupItemForm',
  validate: (values, ownProps) => {
    const errors = {details: {$: {}}}

    if (!values.details.$.timeStamp)
      errors.details.$.timeStamp = 'Required'

    //get the pickup timeStamp
    const pickupTimeStamp = new Moment(ownProps.pickup && ownProps.pickup.timeStamp)
    const detailTimeStamp = new Moment(values.details.$.timeStamp)

    if (pickupTimeStamp && detailTimeStamp) {
      const diff = detailTimeStamp.diff(pickupTimeStamp, 'days')

      if (diff < -3) {
        errors.details.$.timeStamp = 'You pickup too early!'
      }
      else if (diff > 3) {
        errors.details.$.timeStamp = `Spoiled milk! You're date should not 3 days after ${Utils.formatDateTime(pickupTimeStamp)   }!`
      }

    }

    if (!values.details.$.weight)
      errors.details.$.weight = 'Required'

    if (!values.details.$.customer)
      errors.details.$.customer = 'Required'

    if (!values.details.$.gradeType)
      errors.details.$.gradeType = 'Required'

    if (!values.details.$.code)
      errors.details.$.code = 'Required'

    return errors
  }
}


