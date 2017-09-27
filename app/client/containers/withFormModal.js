import { withFormModal as  umbrellaWithFormModal } from 'pcmli.umbrella.web-ui'
import { compose, withProps } from 'recompose'
import { withError } from './withError'
import { withRouter } from 'react-router-dom'

export const withFormModal = (config = {}) => {
  const {props = {}, form} = config
  return compose(
    withError(),
    withProps(props),
    withRouter,
    umbrellaWithFormModal({form}))
}

