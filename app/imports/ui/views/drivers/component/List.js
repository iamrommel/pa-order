import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Tags } from 'pcmli.umbrella.web-ui'
import { withList } from 'pcmli.umbrella.core'

import { listQueryConfig } from '../../../services/driver'
import { DriverViewer } from '../../../components/index'
import { routesDef } from '../../../../imports/startup/client/config/routes'

let TableRow = (props) => {

  let {_id, code, tags, remarks} = props || {}

  return (
    <tr>
      <td>
        <Link to={`${routesDef.DriversDetailPage.altPath}${_id}/${code}`}><h4>{code}</h4></Link>
      </td>
      <td >
        <DriverViewer value={props}/>
      </td>

      <td >
        <Tags dataArray={tags}/>
      </td>

      <td style={{width: '30%'}}>
        <small className="font-italic">{remarks}</small>
      </td>

    </tr>
  )
}

class List extends React.Component {
  constructor (props) {
    super(props)
  }

  createRow = (m, i) => {
    const {onSelectionChange} = this.props
    return <TableRow key={m._id || i}  {...m} onClick={onSelectionChange}/>
  }

  render () {

    let {loadMoreEntries, items, searchString, sortObject, pageInfo, loading} = this.props

    return (

      <Table
        dataArray={items}
        row={this.createRow}
        className="table-space-large"
        stats="drivers"
        pageInfo={pageInfo}
        loading={loading}
        loadMoreEntries={loadMoreEntries}
        searchString={searchString}
        sortObject={sortObject}
      />
    )
  }
  ;
}

List = withList(listQueryConfig())(List)
export { List }