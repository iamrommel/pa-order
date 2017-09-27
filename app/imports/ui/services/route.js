import { gql } from 'react-apollo'
import _ from 'lodash'

export const defaultParamsToDoc = ({params}) => {
  return _.pick(params, ['_id', 'code', 'remarks', 'distance', 'tags', 'status'])
}

export const listQueryConfig = () => {

  //region GraphQL query
  const query = gql`query allRoutes($filter: String, $options: String) {
  allRoutes(filter: $filter, options: $options) {
    _id
    code
    remarks
    status
    distance
    tags
    details {
      _id    
    }
  }
  pageInfo(filter: $filter, type: "RouteModel") {
    count
  }
}
`
  //endregion

  return {query, entity: 'allRoutes'}
}

//region documentFragment
const documentFragment = ` _id
    code
    status
    tags
    remarks
    distance
    details {
      _id
      position
      customer {
        _id
        code
        name
        summary
        status
        type
        logo {
          default
        }
        contact {
          email
          phone
          address1 {
            gps {
              lng
              lat
            }
            fullAddress
          }
        }
      }
    }`
//endregion

export const documentQueryConfig = () => {

  //region GraphQL query
  const query = gql`query singleRoute($filter: String, $options: String) {
  allRoutes(filter: $filter, options: $options) {
   ${documentFragment}
  }
}

`
  //endregion

  return {query, entity: 'allRoutes'}
}

//region Mutation Query
const mutationQuery = gql`mutation mutateRoutes($_id: String!, $doc: String, $_type: String, $filter: String) {
  mutateRoutes(_id: $_id, doc: $doc, _type: $_type, filter: $filter) {
    ${documentFragment}
  }
}
`
//endregion

export const defaultUpdateMutationConfig = {
  _type: 'update', entity: 'mutateRoutes', query: mutationQuery, paramsToDoc: defaultParamsToDoc, refetchQueries: ['singleRoute']
}

export const defaultCreateMutationConfig = {
  _type: 'create', entity: 'mutateRoutes', query: mutationQuery, paramsToDoc: defaultParamsToDoc,
}

export const formConfig = {
  form: 'RouteForm',
  validate: (values) => {
    const errors = {}

    if (!values.code)
      errors.code = 'Required'

    if (!values.remarks)
      errors.remarks = 'Required'

    return errors
  }
}
