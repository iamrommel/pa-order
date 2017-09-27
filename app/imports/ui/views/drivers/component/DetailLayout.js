import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { withDocument } from 'pcmli.umbrella.core'

import { LeftDetailSection } from './LeftDetailSection'
import { RightDetailSection } from './RightDetailSection'
import { documentQueryConfig } from '../../../services/driver'

let DetailLayout = ({item}) => {

  return (
    <Row >
      <Col lg={2} md={4}>
        <LeftDetailSection driver={item}/>
      </Col>
      <Col lg={10} md={8}>
        <RightDetailSection driver={item}/>
      </Col>
    </Row>
  )
}

DetailLayout = withDocument(documentQueryConfig())(DetailLayout)
export { DetailLayout }