import React from 'react'
import { Icon, Label, } from 'pcmli.umbrella.web-ui'

export const DetailLayoutHeader = ({data = {}}) => {

  const {status, name, contact, type, title} = data

  return (
    <div style={{minHeight: '150px'}} className="m-l-lg m-b-lg">
      <h2 className="font-bold">
        {title && <small className="m-l-lg">{title}</small>}
      </h2>

    </div>
  )
}
