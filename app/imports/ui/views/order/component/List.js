import React from 'react'
import { Link } from 'react-router-dom'
import { Utils } from 'pcmli.umbrella.uni-core'
import { Label } from 'pcmli.umbrella.web-ui'
import WebUi from 'pcmli.umbrella.web-ui'
import Core from 'pcmli.umbrella.core'

import { listQueryConfig } from '../../../services/order'
import { routesDef } from '../../../../startup/client/config/routes'
import { CustomerDisplay } from '../../../components'
import { OrderStatusLabel } from './OrderStatusLabel'

let TableRow = (props) => {

  let {_id, code, status, timeStamp, netAmount, details, tags, remarks} = props || {}

  //take only 2 tags
  tags = tags && tags.slice(0, 2)

  return (
    <tr>

      <td style={{width: '8%'}}>
        <Link to={`${routesDef.CustomersDetailPage.altPath}${_id}/${code}`}><h3>#{code}</h3></Link>
      </td>
      <td>
        {Utils.formatDateTime(timeStamp)}
      </td>
      <td>
        <CustomerDisplay value={props}/>
      </td>
      <td>
        <OrderStatusLabel status={status}/>
      </td>
      <td>
        <WebUi.Tags dataArray={tags}/>
      </td>
      <td style={{width: '15%'}}>
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

    <WebUi.Table
      dataArray={items}
      createRow={createRow}
      stats="customers"
      pageInfo={pageInfo}
      loading={loading}
      loadMoreEntries={loadMoreEntries}
      searchString={searchString}
      sortObject={sortObject}
    />
  )

  return result
}

List = Core.withList(listQueryConfig())(List)
export { List }

