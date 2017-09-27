import React from 'react'
import { Row } from 'react-bootstrap'
import { Ibox, IboxContent, ImagePicker } from 'pcmli.umbrella.web-ui'

import { StatusButton } from './StatusButton'
import { defaultUpdateMutationConfig } from '../../../services/driver'
import { RemarksManager, TagsManager, LogoManager } from '../../../components'

export class LeftDetailSection extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {

    const {driver} = this.props
    let {logo, remarks, tags=[], _id} = driver || {}

    return (
      <div>
        <Ibox>
          <IboxContent className="no-margins no-padding">
            <LogoManager logo={logo} _id={_id} mutationConfig={defaultUpdateMutationConfig}/>

          </IboxContent>
          <IboxContent>
            <Row>
              <RemarksManager _id={_id} remarks={remarks} mutationConfig={defaultUpdateMutationConfig}/>
              <TagsManager _id={_id} tags={tags} mutationConfig={defaultUpdateMutationConfig}/>
            </Row>
          </IboxContent>
        </Ibox>

        <Ibox>
          <IboxContent>
            <StatusButton driver={driver}/>
          </IboxContent>
        </Ibox>
      </div>
    )

  }
}
