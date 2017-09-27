import React from 'react'
import { Icon, IboxTools, Ibox, IboxHeader, IboxContent, Spinner, IboxToolCommonControl } from 'pcmli.umbrella.web-ui'
import { Utils } from 'pcmli.umbrella.uni-core'

import { ItemList } from './ItemList'
import { AddItemFormModal } from './ItemFormModal'

export class ItemPanel extends React.Component {

  constructor (props, context) {
    super(props, context)
  }

  handleSearch = ({searchValue}) => {
    this.setState({searchValue})
  }

  handleSort = ({sortValue}) => {
    this.setState({sortValue})
  }

  render () {

    const {data, loading, pickup = {}} = this.props
    const {searchValue, sortValue} = this.state || {}
    const searchFields = [{name: 'customer.summary'}, {name: 'code'}, {name: 'summary'}, {name: 'remarks'}]
    const sortFields = [
      {name: 'timeStamp', displayName: 'Date/Time'},
      {name: 'customer.summary', displayName: 'Producer'},
      {name: 'weight',},
      {name: 'gradeType',},
      {name: 'temperature',},
      {name: 'code',},
      {name: 'remarks',}
    ]

    const _id = Utils.generateId(17)
    const initialValues = {
      details: {
        $: {
          pickupId: pickup._id,
          _id,
          gradeType: 'A',
          temperature: 28,
          code: Utils.generateId(5),
          timeStamp: pickup.timeStamp,
          weight: 100,
          customer: null
        }
      },
      _id: pickup._id,
      pickup
    }

    let addToolContent = <AddItemFormModal form="AddItemForm" pickup={pickup} initialValues={initialValues} triggerIconName="plus"/>

    let renderContent = null
    if (loading) {
      renderContent = <Spinner/>
    }
    else {
      renderContent = <ItemList data={data}
                                searchValue={searchValue}
                                sortValue={sortValue}
                                pickup={pickup}/>
    }

    return (
      <Ibox>
        <IboxHeader title="Items">
          <IboxTools>
            <IboxToolCommonControl
              addComponent={addToolContent}
              onSort={this.handleSort}
              onSearch={this.handleSearch}
              sortFields={sortFields}
              searchFields={searchFields}
              searchPlaceHolder='Search producer or code or remarks'
            />
          </IboxTools>
        </IboxHeader>
        <IboxContent>
          {renderContent}
        </IboxContent>
      </Ibox>
    )

  }

}
