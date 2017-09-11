import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { Ibox, IboxContent } from 'pcmli.umbrella.web-ui'

import { ProfileFormPanel } from './ProfileFormPanel'
import { ContactFormPanel } from './ContactFormPanel'

import { ActivityDisplay } from '../../../components'

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

    </Tabs>
  )
}
