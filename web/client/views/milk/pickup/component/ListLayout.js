import React from 'react'
import  WebUi from 'pcmli.umbrella.web-ui'

import { List } from './List'
import { AddNewFormModal } from './AddNewFormModal'
import { PickupModel } from '../../../../../imports/api/milk/pickup/model'

export class ListLayout extends React.Component {

  constructor (props, context) {
    super(props, context)
    this.state = {sortObject: {sort: {timeStamp: -1}}}
  }

  handleSearch = ({searchString}) => {
    this.setState({searchString})
  }

  handleSort = ({sortObject}) => {
    this.setState({sortObject})
  }

  render () {
    const {searchString, sortObject} = this.state || {}
    const sortFields = [
      {name: 'timeStamp', displayName: 'Pickup Date/Time'},
      {name: 'ticketNo', displayName: 'Ticket No.'},
      {name: 'totalWeight', displayName: 'Weight'}
    ]
    const searchFields = [{name: 'summary'}, {name: 'name'}]

    const initialValues = {
      ...PickupModel.createDefault(),
      _type: 'create'
    }

    return (
      <WebUi.Ibox>
        <WebUi.IboxHeader title="Milk pickups">
          <WebUi.IboxTools>
            <WebUi.IboxToolCommonControl
              addComponent={ <AddNewFormModal form="AddNewPickupForm" initialValues={initialValues} triggerIconName="plus"/>}
              onSort={this.handleSort}
              onSearch={this.handleSearch}
              sortFields={sortFields}
              searchFields={searchFields}
            />
          </WebUi.IboxTools>
        </WebUi.IboxHeader>
        <WebUi.IboxContent>
          <List searchString={searchString} sortObject={sortObject}/>
        </WebUi.IboxContent>
      </WebUi.Ibox>
    )

  }
}

