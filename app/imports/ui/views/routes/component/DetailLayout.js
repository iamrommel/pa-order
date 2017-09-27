import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { withDocument } from 'pcmli.umbrella.core'

import { LeftDetailSection } from './LeftDetailSection'
import { RightDetailSection } from './RightDetailSection'
import { documentQueryConfig } from '../../../services/route'

class DetailLayout extends React.Component {

  constructor (props) {
    super(props)
  }

  handleOnRouteDetailChanged = (selectedRouteDetail) => {
    this.setState({selectedRouteDetail})
  }

  render () {
    let {item} = this.props
    let {selectedRouteDetail} = this.state || {}

    return (
      <Row >
        <Col lg={3} md={5}>
          <LeftDetailSection data={item} onRouteDetailChanged={this.handleOnRouteDetailChanged}/>
        </Col>
        <Col lg={9} md={7}>
          <RightDetailSection selectedRouteDetail={selectedRouteDetail} route={item}/>
        </Col>
      </Row>
    )
  }
}

DetailLayout = withDocument(documentQueryConfig())(DetailLayout)
export { DetailLayout }
