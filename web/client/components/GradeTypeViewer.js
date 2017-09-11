import React from 'react'

export const GradeTypeViewer = (props) => {

  let {value, color} = props

  if (value == 'A')
    color = color || '#1ab394'
  else if (value == 'B')
    color = color || '#ed5565'
  else color

  let style = {
    display: 'inline-block',
    textDecoration: 'none',
    textTransform: 'uppercase',
    textAlign: 'center',
    padding: '6px 10px',
    marginRight: '10px',
    position: 'relative',
    cursor: 'pointer',
    borderRadius: '5px',
    fontWeight: '600',
    marginBottom: '20px !important',
    backgroundColor: color,
    borderColor: color,
    color: 'white',
    border: '1px solid'
  }

  return (
    <div style={style}>{value}</div>
  )
}


