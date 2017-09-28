import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Ibox, IboxContent } from 'pcmli.umbrella.web-ui'
import { withDocument } from 'pcmli.umbrella.core'

import { documentQueryConfig, defaultUpdateMutationConfig } from '../../../services/order'
import { DetailLayoutHeader } from './DetailLayoutHeader'
import { DetailLayoutBody } from './DetailLayoutBody'
import { RemarksManager, TagsManager, LogoManager } from '../../../components'
import { StatusButton } from './StatusButton'

const RightDetailSection = ({data}) => {
  return (
    <div className="row">
      <DetailLayoutHeader data={data}/>
      <DetailLayoutBody data={data}/>
    </div>
  )
}

class LeftDetailSection extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const {data} = this.props
    let {logo, remarks, tags, _id} = data || {}

    return (
      <div>
        <Ibox>
          <IboxContent className="no-margins no-padding">
            <LogoManager logo={logo} _id={_id} mutationConfig={defaultUpdateMutationConfig}/>
          </IboxContent>
          <IboxContent>
            <div className="row">
              <RemarksManager _id={_id} remarks={remarks} mutationConfig={defaultUpdateMutationConfig}/>
              <TagsManager _id={_id} tags={tags} mutationConfig={defaultUpdateMutationConfig}/>
            </div>
          </IboxContent>
        </Ibox>
        <Ibox>
          <IboxContent>
            <StatusButton customer={data}/>
          </IboxContent>
        </Ibox>
      </div>
    )
  }
}

let DetailLayout = ({item}) => {
  return (
    <Row>
      <Col md={4} lg={3}>
        <LeftDetailSection data={item}/>
      </Col>
      <Col md={8} lg={9}>
        <RightDetailSection data={item}/>
      </Col>
    </Row>
  )
}

DetailLayout = withDocument(documentQueryConfig())(DetailLayout)

export { DetailLayout }