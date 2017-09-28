import React from 'react'
import { Link } from 'react-router-dom'
import { Utils } from 'pcmli.umbrella.uni-core'
import { Label, Table, Tags } from 'pcmli.umbrella.web-ui'
import WebUi from 'pcmli.umbrella.web-ui'
import Core from 'pcmli.umbrella.core'

import { listQueryConfig } from '../../../services/order'
import { routesDef } from '../../../../startup/client/config/routes'
import { OrderStatusLabel } from './OrderStatusLabel'

let TableRow = (props) => {

  let {_id, code, status, timeStamp, netAmount, details, tags, remarks} = props || {}

  //take only 2 tags
  tags = tags && tags.slice(0, 2)

  return (
    <tr>
      <td style={{width: '8%'}}>
        <Link to={`${routesDef.CustomersDetailPage.altPath}${_id}/${code}`}>#{code}</Link>
      </td>
      <td>
        <h4>
          {Utils.formatNumber(netAmount, 'Php 0,0.00')}
        </h4>
      </td>
      <td>
        {Utils.formatDateTime(timeStamp)}
      </td>
      <td>
        <OrderStatusLabel status={status}/>
      </td>
      <td>
        <p>
          <Label type="default"><strong>{details.length || 0}</strong></Label> items
        </p>
      </td>

      <td>
        <Tags dataArray={tags}/>
        <br/>
        <small className="font-italic">{remarks}</small>
      </td>
    </tr>
  )
}

let List = ({loadMoreEntries, items, searchString, sortObject, pageInfo, loading}) => {

  let createRow = (m, i) => {
    return (
      <TableRow key={m._id || i}  {...m} />
    )
  }

  let result = (

    <Table
      dataArray={items}
      createRow={createRow}
      stats="orders"
      pageInfo={pageInfo}
      loading={loading}
      loadMoreEntries={loadMoreEntries}
      searchString={searchString}
      sortObject={sortObject}
      className="table-space-small"
    />
  )

  return result
}

List = Core.withList(listQueryConfig())(List)
export { List }

