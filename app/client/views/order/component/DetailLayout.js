import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Ibox, IboxContent } from 'pcmli.umbrella.web-ui'
import { withDocument } from 'pcmli.umbrella.core'

import { documentQueryConfig, defaultUpdateMutationConfig } from '../../../services/order'
import { DetailLayoutHeader } from './DetailLayoutHeader'
import { DetailLayoutBody } from './DetailLayoutBody'
import { RemarksManager, TagsManager, LogoManager } from '../../../components'
import { StatusButton } from './StatusButton'

const RightDetailSection = ({document}) => {
  return (
    <div className="row">
      <DetailLayoutHeader document={document}/>
      <DetailLayoutBody document={document}/>
    </div>
  )
}

class LeftDetailSection extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const {document} = this.props
    let {logo, remarks, tags, _id} = document || {}

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
            <StatusButton customer={document}/>
          </IboxContent>
        </Ibox>
      </div>
    )
  }
}

let DetailLayout = ({item: document}) => {
  return (
    <Row>
      <Col md={4} lg={3}>
        <LeftDetailSection document={document}/>
      </Col>
      <Col md={8} lg={9}>
        <RightDetailSection document={document}/>
      </Col>
    </Row>
  )
}

DetailLayout = withDocument(documentQueryConfig())(DetailLayout)

export { DetailLayout }