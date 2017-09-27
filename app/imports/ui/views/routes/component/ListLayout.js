import React from 'react'
import { IboxTools, Ibox, IboxHeader, IboxContent, IboxToolCommonControl, } from 'pcmli.umbrella.web-ui'

import  { AddNewFormModal } from './AddNewFormModal'
import { List } from './List'
import { RouteModel } from '../../../../imports/api/route/model'

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
    const initialValues = Object.assign({_type: 'insert'}, RouteModel.createDefault())

    const addComponent = (
      <AddNewFormModal initialValues={initialValues} triggerIconName="plus"/>
    )

    const searchFields = [
      {name: 'code'},
      {name: 'remarks'},
      {name: 'tags', type: 'Array'},
    ]

    return (
      <Ibox>
        <IboxHeader title="Routes">
          <IboxTools>
            <IboxToolCommonControl
              addComponent={addComponent}
              onSort={this.handleSort}
              onSearch={this.handleSearch}
              searchFields={searchFields}
            />
          </IboxTools>
        </IboxHeader>
        <IboxContent>

          <List
            searchString={searchString}
            sortObject={sortObject}
            onSelectionChange={this.handleOnSelectionChange}
          />
        </IboxContent>
      </Ibox>
    )
  }

}