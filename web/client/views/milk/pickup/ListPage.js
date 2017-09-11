import React from 'react'
import { PageHeader, PageContent, Breadcrumb } from 'pcmli.umbrella.web-ui'

import { Page } from '../../../components'
import { ListLayout } from './component/ListLayout'
import { routesDef } from '../../../../imports/startup/client/config/routes'

export const ListPage = () => {

  const items = [
    routesDef.OverviewPage,
    routesDef.PickupListPage,
  ]

  return (
    <Page>
      <PageHeader title="Milk Pickups" breadcrumbs={<Breadcrumb items={items}/>}/>
      <PageContent>
        <ListLayout/>
      </PageContent>
    </Page>
  )
}

