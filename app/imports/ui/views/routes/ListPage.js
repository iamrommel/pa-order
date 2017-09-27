import React from 'react'
import { PageHeader, PageContent, Breadcrumb } from 'pcmli.umbrella.web-ui'

import { ListLayout } from './component/ListLayout'
import { Page } from '../../components'
import { routesDef } from '../../../imports/startup/client/config/routes'

export const ListPage = () => {
  const items = [
    routesDef.OverviewPage,
    {name: 'Route List'},
  ]

  return (
    <Page>
      <PageHeader title="Routes" breadcrumbs={<Breadcrumb items={items}/>}/>
      <PageContent>
        <ListLayout/>
      </PageContent>
    </Page>
  )
}

