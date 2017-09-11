import React, { PropTypes, Component } from 'react'

export const K_SIZE = 40

export const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,

  border: '5px solid #f44336',
  borderRadius: K_SIZE,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4,
  cursor: 'pointer'
}

export const greatPlaceStyleHover = {
  ...greatPlaceStyle,
  border: '5px solid #3f51b5',
  color: '#f44336'
}

export class MapPlace extends Component {
  static propTypes = {
    // use hover from controllable
    hover: PropTypes.bool,
    text: PropTypes.string
  }

  render () {

    let {detail, $hover, text} = this.props

    const style = $hover ? greatPlaceStyleHover : greatPlaceStyle

    return (
      <div className="hint hint--html hint--primary hint--top" style={style}>
        <div>
          {text}
          <div className="hint__content">
            <div className="text-left">
              <h5>
                {detail.customer.name}
                <br/>
                <small className="text-white">{detail.customer.contact.address1.fullAddress}</small>
              </h5>

            </div>
          </div>
        </div>
      </div>
    )
  }
}