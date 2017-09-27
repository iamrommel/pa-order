import { gql } from 'react-apollo'
import _ from 'lodash'
import { Utils } from 'pcmli.umbrella.core'

export const defaultParamsToDoc = ({params}) => {
  const type = _.get(params, 'type.value') || _.get(params, 'type') || ''

  let result = _.pick(params, ['_id', 'code', 'name', 'title', 'status'])
  result.type = type
  result.contact = Utils.buildContact({params})
  result.summary = `${params.code} - ${params.name}`

  return result
}

export const listQueryConfig = () => {

  //region GraphQL query
  const query = gql`query allCustomers($filter: String, $options: String) {
  allCustomers(filter: $filter, options: $options) {
    _id
    summary
    code
    name
    type
    status
    logo {
      default
    }
    contact {
      address1 {
        fullAddress
      }
    }
    tags
    remarks
    
  }
  pageInfo(filter: $filter, type: "CustomerModel") {
    count
  }
}
`
//endregion

  return {query, entity: 'allCustomers'}
}

//region documentFragment
const documentFragment = ` _id
    summary
    code
    name
    title
    type
    status
    logo {
      default
      large
    }
    contact {
      email
      phone
      address1 {
        street1
        street2
        city
        state
        zip
        fullAddress
        gps {
          lng
          lat
        }
      }
    }
    tags
    remarks
    _histories {
      _id
      timeStamp
      description
      author
      diff
    }
    _syncInfo {
      externalId
    }
    `
//endregion

export const documentQueryConfig = () => {

  //region GraphQL query
  const query = gql`query singleCustomer($filter: String, $options: String) {
  allCustomers(filter: $filter, options: $options) {
    ${documentFragment}
  }
}
`
//endregion

  return {query, entity: 'allCustomers'}
}

//region mutation query
export const mutationQuery = gql`mutation mutateCustomers($_id: String!, $doc: String, $_type: String) {
  mutateCustomers(_id: $_id, doc: $doc, _type: $_type) {
    ${documentFragment}
  }
}
`

//endregion

export const defaultUpdateMutationConfig = {
  _type: 'update', entity: 'mutateCustomers', query: mutationQuery, paramsToDoc: defaultParamsToDoc, refetchQueries: ['singleCustomer']
}

export const defaultCreateMutationConfig = {
  _type: 'create', entity: 'mutateCustomers', query: mutationQuery, paramsToDoc: defaultParamsToDoc
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
