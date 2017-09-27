import React from 'react'
import _ from 'lodash'
import { Ibox, IboxContent, Table, Icon, IboxHeader, IboxTools, Scrollable } from 'pcmli.umbrella.web-ui'
import { Utils } from 'pcmli.umbrella.core'

import { AddNewPickupPointFormModal } from './AddNewPickupPointFormModal'
import { EditPickupPointFormModal } from './EditPickupPointFormModal'
import { CustomerDisplay } from '../../../components'

const createRow = (m, i, {highlightClassName, onSelect}) => {
  const {_id, position, customer} = m
  const ordinalPosition = Utils.toOrdinal(position || 1)

  return (
    <tr key={_id} className={highlightClassName} onClick={() => onSelect(m)} style={{cursor: 'pointer'}}>
      <td><h3>{ordinalPosition}</h3></td>
      <td>
        <CustomerDisplay value={customer} showType/>
      </td>
    </tr>
  )
}

const RouteDetailList = ({data, onSelectionChange}) => {
  data = _.orderBy(data, ['position'], ['asc'])

  return (
    <Table
      dataArray={data}
      createRow={createRow}
      onSelect={onSelectionChange}
      scrollable
      height={38}
    />
  )
}

export class PickupPoints extends React.Component {

  handleOnRouteDetailChanged = (selectedRouteDetail) => {
    const {onRouteDetailChanged} = this.props
    this.setState({selectedRouteDetail})
    onRouteDetailChanged && onRouteDetailChanged(selectedRouteDetail)
  }

  render () {

    const {route} = this.props
    const {details, _id} = route || {}
    let {selectedRouteDetail} = this.state || {}

    //add the filter condition so it will be used on the filter command of withMutation
    const initialValues = {selectedRouteDetail, _id, filter: {'details._id': selectedRouteDetail && selectedRouteDetail._id}}

    return (
      <Ibox>
        <IboxHeader title="Route pickup points">
          <IboxTools>
            <EditPickupPointFormModal form="EditRouteDetailForm"
                                      initialValues={initialValues}
                                      route={route}
                                      triggerComponent={
                                        <a className="pull-right btn btn-primary btn-xs ">
                                          <Icon name="pencil"/>
                                        </a>
                                      }
            />

            <AddNewPickupPointFormModal
              form="AddRouteDetailForm"
              initialValues={{_id, details}}
              route={route}
              triggerComponent={
                <a className="pull-right btn btn-primary btn-xs ">
                  <Icon name="plus"/>
                </a>
              }
            />

          </IboxTools>
        </IboxHeader>
        <IboxContent>
          <RouteDetailList
            data={details}
            onSelectionChange={this.handleOnRouteDetailChanged}
          />
        </IboxContent>
      </Ibox>
    )
  }
}