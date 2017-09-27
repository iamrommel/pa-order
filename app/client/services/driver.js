import { gql } from 'react-apollo'

export const defaultParamsToDoc = ({params}) => {
  return {
    _id: params._id,
    code: params.code,
    status: params.status,
    logo: params.logo,
    name: params.name,
    }
}

export const listQueryConfig = () => {

  //region GraphQL query
  const query = gql`query allDrivers($filter: String, $options: String) {
  allDrivers(filter: $filter, options: $options) {
     _id
    code
    name
    tags
    remarks
    status
    contact {
      address1 {
        fullAddress
      }
    }
    logo {
      default  
    }
  }
  
  pageInfo(filter: $filter, type: "DriverModel") {
    count
  }
}
`
  //endregion

  return {query, entity: 'allDrivers'}
}

//region documentFragment
const documentFragment = `
 _id
    code
    name
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
`
//endregion

export const documentQueryConfig = () => {

  //region GraphQL query
  const query = gql`query singleDriver($filter: String, $options: String) {
  allDrivers(filter: $filter, options: $options) {
    ${documentFragment}
  }
}

`
  //endregion

  return {query, entity: 'allDrivers'}
}

//region Mutation Query
const mutationQuery = gql`mutation mutateDrivers($_id: String!, $doc: String, $_type: String) {
  mutateDrivers(_id: $_id, doc: $doc, _type: $_type) {
     ${documentFragment}
  }
}
`
//endregion

export const defaultUpdateMutationConfig = {
  _type: 'update', entity: 'mutateDrivers', query: mutationQuery, paramsToDoc: defaultParamsToDoc, refetchQueries: ['singleDriver']
}

export const defaultCreateMutationConfig = {
  _type: 'create', entity: 'mutateDrivers', query: mutationQuery, paramsToDoc: defaultParamsToDoc
}

export const formConfig = {
  form: 'DriverAddForm',
  validate: (values) => {
    const errors = {}

    if (!values.code)
      errors.code = 'Required'

    if (!values.name)
      errors.name = 'Required'

    return errors
  }
}
