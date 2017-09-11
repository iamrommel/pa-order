import React from 'react'
import { withProps } from 'recompose'
import WebUi from 'pcmli.umbrella.web-ui'

const options = [
  {
    label: 'Grade A',
    value: 'A'
  },
  {
    label: 'Grade B',
    value: 'B'
  },

]
const innerOptionRenderer = ({option}) => {
  return (
    <div className="autoSelect">
      <h5>{option.value}
        <br/>
        <small style={{marginTop: '5px'}} className="font-italic">
          {option.label}
        </small>
      </h5>
    </div>
  )
}

export const GradeTypeAutoSelect = withProps({
  innerOptionRenderer,
  options,
  valueKey: 'value',
  labelKey: 'label'
})(WebUi.AutoSelect)

export const GradeTypeAutoSelectEditor = (props) => {
  return <WebUi.AutoSelectEditor component={GradeTypeAutoSelect} {...props} />
}
