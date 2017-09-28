import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { Ibox, IboxContent } from 'pcmli.umbrella.web-ui'

export const DetailLayoutBody = ({data}) => {

  return (
    <Tabs bsStyle='tabs' defaultActiveKey={1} id="customer-detail-layout-tab">
      <Tab eventKey={1} title="Details">

      </Tab>
    </Tabs>
  )
}
