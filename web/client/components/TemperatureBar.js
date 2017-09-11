import React from 'react'
import { withFormEditor } from 'pcmli.umbrella.web-ui'

let temperatureColor = (maxValue, value) => {
  const containerValue = maxValue / 100
  const progressValue = value / containerValue

  let progressColor = ''
  if (progressValue <= 50) {
    progressColor = 'warning'
  }
  else if (progressValue > 50 && progressValue <= 75) {
    progressColor = 'primary'
  }
  else if (progressValue > 75) {
    progressColor = 'danger'
  }

  return progressColor

}

export const TemperatureBarViewer = (props) => {
  let {value, maxValue} = props

  maxValue = maxValue || 40

  const containerValue = maxValue / 100
  const progressValue = value / containerValue

  let style = {
    width: progressValue + '%',

  }

  let containerStyle = {
    border: '1px solid lightgray'
  }

  let progressColor = 'progress-bar-' + temperatureColor(maxValue, value)

  return (
    <div className="progress  m-t-sm" style={containerStyle}>
      <div style={style}
           className={'progress-bar ' + progressColor}>
        {value}&deg;C
      </div>

    </div>
  )
}

let TemperatureBarEditor = ({formEditor = {}, maxValue, minValue}) => {
  const {input = {}} = formEditor
  const {name, value, onChange,} = input

  maxValue = maxValue || 40
  minValue = minValue || 0

  let progressColor = 'range-' + temperatureColor(maxValue, value)

  return (
    <div>
      <div className={'range ' + progressColor}>
        <input type="range"
               name={name}
               onChange={onChange}
               value={value}
               max={maxValue}
               min={minValue}
               step={1}/>
        <output>{value}&deg;C</output>
      </div>
    </div>

  )
}

TemperatureBarEditor = withFormEditor()(TemperatureBarEditor)
export { TemperatureBarEditor }