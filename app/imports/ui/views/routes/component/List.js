import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Label, Tags } from 'pcmli.umbrella.web-ui'
import { withList } from 'pcmli.umbrella.core'

import { RouteDisplay } from '../../../components'
import { routesDef } from '../../../../imports/startup/client/config/routes'
import { listQueryConfig } from '../../../services/route'

let TableRow = (props) => {

  let {_id, code, tags, details} = props || {}

  const detailsCount = (details && details.length) || 0

  return (
    <tr>
      <td style={{width: '8%'}}>
        <Link to={`${routesDef.RoutesDetailPage.altPath}${_id}/${code}`}><h3>#{code}</h3></Link>
      </td>
      <td>
        <RouteDisplay value={props}/>
      </td>

      <td>
        <Label type="success">{detailsCount} routes</Label>
      </td>
      <td>
        <Tags dataArray={tags}/>
      </td>

    </tr>
  )
}

let List = ({onSelectionChange, loadMoreEntries, items, searchString, sortObject, pageInfo, loading}) => {

  const createRow = (m, i) => {
    return <TableRow key={m._id || i}  {...m} onClick={onSelectionChange}/>
  }

  return (

    <Table
      dataArray={items}
      row={createRow}
      className="table-space-large"
      stats="routes"
      pageInfo={pageInfo}
      loading={loading}
      loadMoreEntries={loadMoreEntries}
      searchString={searchString}
      sortObject={sortObject}
    />
  )
}

List = withList(listQueryConfig())(List)
export { List }