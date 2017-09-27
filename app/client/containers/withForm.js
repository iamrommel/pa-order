import { withForm as umbrellaWithForm } from 'pcmli.umbrella.core'

import { compose, withProps } from 'recompose'
import { withError } from './withError'

export const withForm = (config={}) => {
  const {props={}} = config
  return compose(
    withError(),
    withProps(props),
    umbrellaWithForm()
  )
}

