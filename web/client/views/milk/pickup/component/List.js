import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Images, DateViewer } from 'pcmli.umbrella.web-ui'
import { Utils, withList } from 'pcmli.umbrella.core'

import { CustomerProfileImage } from '../../../../components/index'
import { routesDef } from '../../../../../imports/startup/client/config/routes'
import { listQueryConfig } from '../../../../services/pickup'

let TableRow = (props) => {

  let {totalWeight, timeStamp, deliveries, details, ticketNo, _id} = props
  totalWeight = Utils.formatNumber(totalWeight) + ' lbs.'

  let producers = details && details.map(m => {
    const {summary, logo} = m.customer || {}
    return {
      name: summary,
      value: logo
    }
  })

  let plants = deliveries && deliveries.map(m => {
    const {summary, logo} = m.customer || {}
    return {
      name: summary,
      value: logo
    }
  })

  let renderPlantImage = (m, i) => {
    return (
      <CustomerProfileImage type="thumbnail" value={m.value} name={m.name} key={i}/>
    )
  }

  let renderCustomerImage = (m, i) => {
    return (
      <CustomerProfileImage value={m.value} name={m.name} key={i}/>
    )
  }

  return (
    <tr>
      <td style={{width: '8%'}}>
        <Link to={`${routesDef.PickupDetailPage.altPath}${_id}/${ticketNo}`}><h3>#{ticketNo}</h3></Link>
      </td>
      <td>
        <DateViewer value={timeStamp} includeTime/>
      </td>
      <td>
        <h4>{totalWeight}</h4>
      </td>
      <td>
        <Images dataArray={producers} renderImage={renderCustomerImage}/>
      </td>
      <td>
        <Images dataArray={plants} renderImage={renderPlantImage}/>
      </td>

    </tr>
  )
}

class List extends React.Component {

  createRow = (m, i) => {
    return <TableRow key={m._id || i}  {...m} />
  }

  render () {
    const {loadMoreEntries, items, searchString, sortObject, pageInfo, loading} = this.props

    return (
      <Table
        dataArray={items}
        row={this.createRow}
        className="table-space-large"
        stats="milk pickups"
        pageInfo={pageInfo}
        loading={loading}
        loadMoreEntries={loadMoreEntries}
        searchString={searchString}
        sortObject={sortObject}
      />
    )
  }
}

List = withList(listQueryConfig())(List)
export { List }


