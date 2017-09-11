import React from 'react'
import { Spinner, } from 'pcmli.umbrella.web-ui'
import { withDocument } from 'pcmli.umbrella.core'
import { compose } from 'recompose'

import { withUser } from '../../../../containers/withUser'
import { documentQueryConfig } from '../../../../services/tenant'
import { UserList } from './UserList'
import { Form } from './Form'

let OrganizationLayout = ({currentUser, loading, document = {}}) => {
  if (loading)
    return <Spinner/>

  return (
    <div>
      <Form initialValues={{...document}}/>
      <UserList currentUser={currentUser} {...document}/>
    </div>
  )
}

OrganizationLayout = compose(withDocument(documentQueryConfig()))(OrganizationLayout)

let OrganizationTabItem = ({user = {}}) => {
  const {tenantId} = user
  return <OrganizationLayout currentUser={user} _id={tenantId}/>
}

OrganizationTabItem = compose(withUser())(OrganizationTabItem)
export { OrganizationTabItem }




