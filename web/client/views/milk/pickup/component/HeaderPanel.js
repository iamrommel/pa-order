import React from 'react'
import { HeaderFormPanel } from './HeaderFormPanel'

export const HeaderPanel = ({data, loading}) => {
  return (
    <HeaderFormPanel
      loading={loading}
      initialValues={data || {} }
    />
  )
}






