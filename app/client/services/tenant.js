import { gql } from 'react-apollo'

export const defaultParamsToDoc = ({params}) => {
  return {
    _id: params._id,
    code: params.code,
    name: params.name
  }
}

export const documentQueryConfig = () => {

  //region GraphQL query
  const query = gql`query allTenants($filter: String, $options: String) {
  allTenants(filter: $filter, options: $options) {
    _id
    code
    name
    users {
      _id
      status
      profile {
        name
        picture
      }
    }
  }
}

`
  //endregion

  return {query, entity: 'allTenants'}
}

//region mutation query
const mutationQuery = gql`mutation mutateTenants($_id: String!, $doc: String, $_type: String) {
  mutateTenants(_id: $_id, doc: $doc, _type: $_type) {
    _id
    code
    name
   }
}
`

//endregion

export const defaultUpdateMutationConfig = (config = {}) => {
  const {paramsToDoc = defaultParamsToDoc} = config
  return {_type: 'update', entity: 'mutateTenants', query: mutationQuery, ...config, paramsToDoc}
}

export const formConfig = {
  form: 'tenantForm',
  validate: (values) => {
    const errors = {}

    if (!values.code)
      errors.code = 'Required'

    if (!values.name)
      errors.name = 'Required'

    return errors
  }
}

export const joinFormConfig = {
  form: 'tenantJoinForm',
  validate: (values) => {
    const errors = {}

    if (!values.code)
      errors.code = 'Required'

    return errors
  }
}
export const addTenantUserMutationConfig = () => {

  const paramsToDoc = ({params}) => ({code: params.code})

  const query = gql`mutation addTenantUser($doc: String!) {
  addTenantUser(doc: $doc) {
    _id
    status
    profile {
      name
    }
  }
}
`

  return {_type: 'update', entity: 'addTenantUser', query, paramsToDoc, refetchQueries: ['allUsers']}
}
