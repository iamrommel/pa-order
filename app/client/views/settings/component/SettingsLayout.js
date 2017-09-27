import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { Ibox, IboxContent, } from 'pcmli.umbrella.web-ui'

import { UserInRole } from '../../accounts/component/UserInRole'
import { OrganizationTabItem } from './organization/OrganizationTabItem'

export const SettingsLayout = () => {
  return (
    <div>
      <Ibox>
        <IboxContent>
          <div style={{minHeight: '80vh'}}>
            <Tabs bsStyle='tabs' defaultActiveKey={2} id="setting-detail-layout-tab">
              <Tab eventKey={1} title="User Information">

              </Tab>
              <Tab eventKey={2} title="Organization">
                <OrganizationTabItem/>
              </Tab>
            </Tabs>
          </div>
        </IboxContent>
      </Ibox>
    </div>
  )
}
