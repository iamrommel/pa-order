import React from 'react'
import { PageHeader, PageContent, Breadcrumb } from 'pcmli.umbrella.web-ui'

import { SettingsLayout } from './component/SettingsLayout'
import { Page } from '../../components'
import { routesDef } from '../../../imports/startup/client/config/routes'

export const DetailPage = () => {

  const items = [
    routesDef.OverviewPage,
    {name: 'Settings'},
  ]

  return (
    <Page>
      <PageHeader title="Settings" breadcrumbs={<Breadcrumb items={items}/>}/>
      <PageContent>
        <SettingsLayout/>
      </PageContent>
    </Page>
  )
}
