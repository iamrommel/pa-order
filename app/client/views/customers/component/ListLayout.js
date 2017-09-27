import React from 'react'
import WebUi from 'pcmli.umbrella.web-ui'

import { AddNewFormModal } from './AddNewFormModal'
import { CustomerModel } from '../../../../imports/api/customer/model'
import { List } from './List'

export class ListLayout extends React.Component {

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
    const {onSelectionChange} = this.props
    this.setState({selectedItem})
    onSelectionChange && onSelectionChange({selectedItem})

  }

  render () {

    const initialValues = Object.assign({_type: 'create'}, CustomerModel.createDefault())

    let {selectedItem, searchString, sortObject, style} = this.state || {}

    const addComponent = (
      <AddNewFormModal initialValues={initialValues} triggerIconName="plus"/>
    )

    const sortFields = [
      {name: 'name'},
      {name: 'code'},
      {name: 'contact.address1.fullAddress', displayName: 'Address'},
      {name: 'status'},
      {name: 'type'},
      {name: 'remarks'},
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
      <WebUi.Ibox>
        <WebUi.IboxHeader title="Customers">
          <WebUi.IboxTools>
            <WebUi.IboxToolCommonControl
              addComponent={addComponent}
              onSort={this.handleSort}
              onSearch={this.handleSearch}
              sortFields={sortFields}
              searchFields={searchFields}
            />
          </WebUi.IboxTools>
        </WebUi.IboxHeader>
        <WebUi.IboxContent>
          <List onSelectionChange={this.handleOnSelectionChange}
                searchString={searchString} sortObject={sortObject}
                selectedItem={selectedItem}
                style={style}/>
        </WebUi.IboxContent>
      </WebUi.Ibox>
    )
  }

}