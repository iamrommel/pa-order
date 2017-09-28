import React from 'react'
import { Link } from 'react-router-dom'
import { Utils } from 'pcmli.umbrella.uni-core'
import { Label, Table, Tags } from 'pcmli.umbrella.web-ui'
import { withList } from 'pcmli.umbrella.core'

import { listQueryConfig } from '../../../services/order'
import { routesDef } from '../../../../imports/startup/client/config/routes'
import { OrderStatusLabel } from './OrderStatusLabel'

let TableRow = (props) => {

  let {_id, code, status, timeStamp, netAmount, details, tags, remarks} = props || {}

  //take only 2 tags
  tags = tags && tags.slice(0, 3)

  return (
    <tr>
      <td style={{width: '8%'}}>
        <Link to={`${routesDef.OrderDetailPage.altPath}${_id}/${code}`}>#{code}</Link>
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
        <Label type="default"><strong>{details.length || 0}</strong></Label> item(s)
      </td>
      <td>
        <Tags dataArray={tags}/>
      </td>
      <td style={{width: '10%'}}>
        <small className="font-italic text-warning">{remarks}</small>
      </td>
    </tr>
  )
}

const headerRow = () => {

  return (
    <thead className="bg-gray">
    <tr>
      <th>#</th>
      <th>Net Amount</th>
      <th>Date</th>
      <th>Status</th>
      <th>Items Count</th>
      <th>Tags</th>
      <th>Remarks</th>
    </tr>
    </thead>
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
      head={headerRow()}
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

List = withList(listQueryConfig())(List)
export { List }

