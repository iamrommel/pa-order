import React from 'react'
import { PageHeader, PageContent, Breadcrumb } from 'pcmli.umbrella.web-ui'

import { DetailLayout } from './component/DetailLayout'
import { routesDef } from '../../../imports/startup/client/config/routes'
import { Page } from '../../components'

export const DetailPage = ({match = {}}) => {

  const {params = {}} = match
  const {code} = params

  const items = [
    routesDef.OverviewPage,
    routesDef.CustomersListPage,
    {name: code},
  ]

  return (
    <Page>
      <PageHeader title="Customers" breadcrumbs={<Breadcrumb items={items}/>}/>
      <PageContent>
        <DetailLayout params={params}/>
      </PageContent>
    </Page>
  )
}

