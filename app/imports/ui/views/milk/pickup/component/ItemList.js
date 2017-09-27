import React from 'react'
import { Image, Icon, Table, DateViewer } from 'pcmli.umbrella.web-ui'
import { Utils } from 'pcmli.umbrella.core'
import { TemperatureBarViewer, GradeTypeViewer } from '../../../../components/index'
import _ from 'lodash'
import { EditItemFormModal } from './ItemFormModal'

let Row = (props) => {
  const {customer, weight, temperature, code, timeStamp, gradeType, pickupId, _id, remarks, pickup} = props || {}
  let initialValues = {
    details: {
      $: {
        customer, weight, timeStamp, gradeType, temperature, code, pickupId, _id, remarks
      }
    },
    _id: pickupId,
    filter: {'details._id': _id},
    pickup
  }
  const formatterWeight = Utils.formatNumber(weight) + ' lbs.'

  let fullAddress = _.get(customer, 'contact.address1.fullAddress')
  const customerLogo = _.get(customer, 'logo.default')
  const customerSummary = _.get(customer, 'summary')

  return (
    <tr>
      <td style={{width: '32px'}}>
        <Image url={customerLogo} className="img-circle img-sm"/>
      </td>
      <td>
        <EditItemFormModal pickup={pickup} form={`EditItemForm${_id}`} initialValues={initialValues} triggerComponent={<a><h4>{customerSummary}</h4></a>}/>
        <div className="text-primary font-italic">
          <small><Icon name="map-marker"/>{fullAddress}</small>
        </div>
      </td>
      <td>
        <h4>{formatterWeight}</h4>
      </td>
      <td>
        <GradeTypeViewer value={gradeType}/>
      </td>
      <td>
        <TemperatureBarViewer value={temperature}/>
      </td>
      <td>
        <h4>{code}</h4>
      </td>
      <td>
        <DateViewer value={timeStamp} includeTime/>
      </td>

      <td style={{width: '10%'}}>
        <small className="font-italic">{remarks}</small>
      </td>
    </tr>
  )
}

export const ItemList = (props) => {
  const {data, searchValue, sortValue, pickup} = props

  let filteredData = _.filter(data, (item) => {
    if (!searchValue) return true

    return (item.remarks && item.remarks.match(new RegExp(searchValue, 'i')) ) ||
      (item.customer && item.customer.summary && item.customer.summary.match(new RegExp(searchValue, 'i'))) ||
      (item.code && item.code.match(new RegExp(searchValue, 'i')))
  })

  //get the stats
  const pickupCount = filteredData.length || 0
  const gradeTypeList = _.countBy(filteredData, 'gradeType')
  const gradeTypeKeys = Object.keys(gradeTypeList)
  let gradeTypeString = ''
  gradeTypeKeys.forEach((m) => {
    const dataPerGrade = _.filter(filteredData, {gradeType: m})
    let gradeWeight = _.sumBy(dataPerGrade, 'weight')
    gradeTypeString = `${gradeTypeString} | Grade ${m} ${Utils.formatNumber(gradeWeight)} lbs. `

  })
  const totalWeight = _.sumBy(filteredData, 'weight')

  //do sorting if the values are available
  if (sortValue) {
    let {name, direction} = sortValue
    direction = direction === -1 ? 'asc' : 'desc'
    filteredData = _.orderBy(filteredData, [name], [direction])
  }

  let createRow = (m, i) => {
    return (
      <Row key={m._id || i} pickup={pickup}  {...m}/>
    )
  }

  return (

    <div>
      <div className="m-b-md">
        <strong>Showing : {pickupCount} Milk Pickups {gradeTypeString} | Total {Utils.formatNumber(totalWeight)} lbs.</strong>
      </div>

      <Table dataArray={filteredData} createRow={createRow} className="table-space-medium"/>

    </div>

  )
}