import React from 'react'
import { Utils } from 'pcmli.umbrella.core'
import { RouteStatus } from './RouteStatus'

export const RouteDisplay = ({value = {}}) => {
  const {status, distance, remarks} = value
  return (
    <div>
      <h4><RouteStatus value={status}/> {remarks} <br/>
        <small>total distance : {Utils.formatNumber(distance)} km.</small>
      </h4>
    </div>
  )

}

