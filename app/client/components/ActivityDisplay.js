import React from 'react'
import { Ibox, IboxContent, HistoryList } from 'pcmli.umbrella.web-ui'

export const ActivityDisplay = ({data}) => {
  const {_histories} = data || {}
  return (
    <Ibox>
      <IboxContent>
        <HistoryList data={_histories}/>
      </IboxContent>
    </Ibox>
  )
}