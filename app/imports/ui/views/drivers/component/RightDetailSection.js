import React from 'react'
import { Row, Tabs, Tab } from 'react-bootstrap'
import { AboutTabItem } from './AboutTabItem'
import { Icon } from 'pcmli.umbrella.web-ui'
import { DriverStatus, ActivityDisplay } from '../../../components/index'

const Header = (props) => {
  const {driver} = props
  const {status, name, contact} = driver || {}
  const {address1, phone, email} = contact || {}
  const {fullAddress} = address1 || {}

  return (
    <div style={{minHeight: '150px'}} className="m-l-lg m-b-lg">
      <h2 className="font-bold">
        <DriverStatus value={status}/> {name} <br/>
      </h2>
      <div className="m-l-lg">
        <p >
          {fullAddress &&
          <span><Icon name="map-marker"/> { fullAddress }
            <br/>
                    </span>}
          {phone && <span><Icon name="phone"/> {phone}<br/></span>}
          {email &&
          <a href={'mailto:' + email }><Icon
            name="envelope"/> {email}<br/></a>}
        </p>
      </div>
    </div>
  )
}

export const RightDetailSection = ({driver}) => {
  return (
    <Row>
      <Header driver={driver}/>
      <div>
        <Tabs bsStyle='tabs' defaultActiveKey={1} id="driver-detail-layout-tab">
          <Tab eventKey={1} title="Activity">
            <ActivityDisplay data={driver}/>
          </Tab>
          <Tab eventKey={2} title="About">
            <AboutTabItem driver={driver} initialValues={driver}/>
          </Tab>
        </Tabs>
      </div>
    </Row>
  )
}
