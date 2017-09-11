import { withFormPanel as  umbrellaWithFormPanel } from 'pcmli.umbrella.web-ui'
import { compose, withProps } from 'recompose'
import { withError } from './withError'
import { withRouter } from 'react-router-dom'

export const withFormPanel = (config = {}) => {
  const {props = {}, form, panel} = config
  return compose(
    withError(),
    withProps(props),
    withRouter,
    umbrellaWithFormPanel({form, panel}))
}

