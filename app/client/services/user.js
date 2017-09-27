import { gql } from 'react-apollo'

export const defaultParamsToDoc = ({params}) => {
  return {
    _id: params._id,
    tenantId: params.tenantId
  }
}

//region mutation query
const mutationQuery = gql`mutation users($_id: String!, $doc: String, $_type: String) {
  users(_id: $_id, doc: $doc, _type: $_type) {
    _id
    tenantId
    status
    profile {
      name
    }
   }
}
`

//endregion

export const defaultUpdateMutationConfig = (config = {}) => {
  const {paramsToDoc = defaultParamsToDoc} = config
  return {_type: 'update', entity: 'users', query: mutationQuery, ...config, paramsToDoc}
}

export const formConfig = {
  form: 'OrganizationForm',
  validate: (values) => {
    const errors = {}

    if (!values.name)
      errors.name = 'Required'

    return errors
  }
}
