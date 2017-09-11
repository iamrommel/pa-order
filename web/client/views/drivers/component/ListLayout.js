import React from 'react'
import { IboxTools, Ibox, IboxHeader, IboxContent, IboxToolCommonControl, } from 'pcmli.umbrella.web-ui'

import  { AddNewFormModal } from './AddNewFormModal'
import { List } from './List'
import { DriverModel } from '../../../../imports/api/driver/model'

export class ListLayout extends React.Component {

  state = {}

  constructor (props) {
    super(props)
  }

  handleSearch = ({searchString}) => {
    this.setState({searchString})
  }

  handleSort = ({sortObject}) => {
    this.setState({sortObject})
  }

  handleOnSelectionChange = (selectedItem) => {
    this.setState({selectedItem})
  }

  render () {

    let {searchString, sortObject} = this.state
    const initialValues = Object.assign({_type: 'insert'}, DriverModel.createDefault())

    const addComponent = (
      <AddNewFormModal initialValues={initialValues} triggerIconName="plus"/>
    )

    const sortFields = [
      {name: 'name', displayName: 'Name'},
      {name: 'code', displayName: 'Code'},
      {name: 'contact.address1.fullAddress', displayName: 'Address'},
      {name: 'status', displayName: 'Status'},
      {name: 'remarks', displayName: 'RemarksManager'},
    ]

    const searchFields = [
      {name: 'code'},
      {name: 'name'},
      {name: 'summary'},
      {name: 'contact.address1.fullAddress'},
      {name: 'contact.email'},
      {name: 'remarks'},
      {name: 'tags', type: 'Array'},
    ]

    return (
      <Ibox>
        <IboxHeader title="Drivers">
          <IboxTools>
            <IboxToolCommonControl
              addComponent={addComponent}
              onSort={this.handleSort}
              onSearch={this.handleSearch}
              searchFields={searchFields}
              sortFields={sortFields}
            />
          </IboxTools>
        </IboxHeader>
        <IboxContent>

          <List searchString={searchString}
                sortObject={sortObject}
                onSelectionChange={this.handleOnSelectionChange}
          />
        </IboxContent>
      </Ibox>
    )
  }

}