import React from 'react'
import WebUi from 'pcmli.umbrella.web-ui'

export const CustomerProfileImage = ({value, type, name}) => {

  return (
    <WebUi.Image url={value && value.default}
                 name={name}
                 className={`img-${type} img-sm`}/>
  )
}

CustomerProfileImage.defaultProps = {
  type: 'circle'
}

CustomerProfileImage.propTypes = {
  type: React.PropTypes.string,
  value: React.PropTypes.shape({
    default: React.PropTypes.string,
  })
}





