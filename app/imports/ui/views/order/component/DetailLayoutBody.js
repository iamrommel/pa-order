import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { Ibox, IboxContent } from 'pcmli.umbrella.web-ui'

import { ProfileFormPanel } from './ProfileFormPanel'
import { ContactFormPanel } from './ContactFormPanel'

import { ActivityDisplay, TotalMilkIntegration } from '../../../components'
import { defaultUpdateMutationConfig } from '../../../services/order'

export const DetailLayoutBody = ({data}) => {

  return (
    <Tabs bsStyle='tabs' defaultActiveKey={1} id="customer-detail-layout-tab">
      <Tab eventKey={1} title="Activity"> <ActivityDisplay data={data}/></Tab>
      <Tab eventKey={2} title="About">
        <ProfileFormPanel initialValues={data} title="Profile"/>
      </Tab>
      <Tab eventKey={3} title="Contacts">
        <ContactFormPanel initialValues={data} title="Contact Information"/>
      </Tab>
      <Tab eventKey={4} title="Integrations">
        <TotalMilkIntegration initialValues={data} mutationConfig={defaultUpdateMutationConfig}/>
      </Tab>
    </Tabs>
  )
}
