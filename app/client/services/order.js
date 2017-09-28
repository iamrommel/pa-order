import { gql } from 'react-apollo'
import _ from 'lodash'
import { Utils } from 'pcmli.umbrella.core'

export const defaultParamsToDoc = ({params}) => ({...params})

export const listQueryConfig = () => {

  //region GraphQL query
  const query = gql`query allOrder($filter: String, $options: String) {
  allOrder(filter: $filter, options: $options) {
    _id
    code
    status
    tags
    remarks
    timeStamp
    netAmount
    details {
      _id
    }
  }
  allOrderMeta(filter: $filter) {
    count
  }
}
`
//endregion

  return {query, entity: 'allOrder'}
}

//region documentFragment
const documentFragment = `   _id
    code
    status
    tags
    remarks
    timeStamp
    netAmount
    `
//endregion

export const documentQueryConfig = () => {

  //region GraphQL query
  const query = gql`query singleOrder($filter: String, $options: String) {
  allOrder(filter: $filter, options: $options) {
    ${documentFragment}
  }
}
`
//endregion

  return {query, entity: 'allOrder'}
}

//region mutation query
export const mutationQuery = gql`mutation mutateCustomers($_id: String!, $doc: String, $_type: String) {
  mutateCustomers(_id: $_id, doc: $doc, _type: $_type) {
    ${documentFragment}
  }
}
`

//endregion
export const updateMutationQuery = gql`mutation updateOrder($input: String!, $filter:String) {
  updateOrder(input: $input, filter: $filter) {
     ${documentFragment}
  }
}`
export const defaultUpdateMutationConfig = {
  _type: 'update', entity: 'updateOrder', query: updateMutationQuery, paramsToDoc: defaultParamsToDoc, refetchQueries: ['singleCustomer', 'allOrder']
}

export const createMutationQuery = gql`mutation createOrder($input: String!) {
  createOrder(input: $input) {
     ${documentFragment}
  }
}`
export const defaultCreateMutationConfig = {
  _type: 'create', entity: 'createOrder', query: createMutationQuery, paramsToDoc: defaultParamsToDoc, refetchQueries: ['allOrder']
}

export const formConfig = {
  form: 'CustomerForm',
  validate: (values) => {
    const errors = {}

    if (!values.code)
      errors.code = 'Required'

    if (!values.type)
      errors.type = 'Required'

    if (!values.name)
      errors.name = 'Required'

    return errors
  }
}
