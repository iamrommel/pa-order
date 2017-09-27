import React from 'react'
import { ImagePicker, FormUtil } from 'pcmli.umbrella.web-ui'
import { withForm, withMutation } from 'pcmli.umbrella.core'
import { compose } from 'recompose'

const updateQueryConfig = {
  paramsToDoc: ({params}) => {
    return {
      $set: {
        _id: params._id,
        logo: params.logo
      }
    }
  },
  after: FormUtil.afterUpdate({successMessage: 'Successfully updated the logo!'})
}

const LogoForm = ({_id, logo, handleSubmit, formProps}) => {
  const onPick = ({image}) => {
    const {onUpdate} = formProps
    const params = {
      _id,
      logo: image
    }

    return handleSubmit(onUpdate(params))
  }

  return (
    <ImagePicker value={logo} onPick={onPick}/>
  )
}

let LogoManager = ({_id, logo, mutationConfig}) => {

  mutationConfig = {...mutationConfig, ...updateQueryConfig}
  const form = {
    form: 'logoForm',
  }

  const EnhanceLogoForm = compose(
    withMutation(mutationConfig),
    withForm(form)
  )(LogoForm)

  return (
    <EnhanceLogoForm _id={_id} logo={logo}/>
  )
}

export { LogoManager }