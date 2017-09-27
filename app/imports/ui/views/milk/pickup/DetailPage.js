import React from 'react'
import  { PageHeader, PageContent, Breadcrumb } from 'pcmli.umbrella.web-ui'

import { DetailLayout } from './component/DetailLayout'
import { Page } from '../../../components'
import { routesDef } from '../../../../imports/startup/client/config/routes'

export const DetailPage = ({match = {}}) => {

  const {params = {}} = match
  const {ticketNo} = params

  const items = [
    routesDef.OverviewPage,
    routesDef.PickupListPage,
    {name: ticketNo},
  ]

  return (
    <Page>
      <PageHeader title="Milk Pickups" breadcrumbs={<Breadcrumb items={items}/>}/>
      <PageContent>
        <DetailLayout params={params}/>
      </PageContent>
    </Page>
  )

}

