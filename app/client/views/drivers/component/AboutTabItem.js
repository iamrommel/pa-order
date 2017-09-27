import React from 'react'
import { Icon, IboxContent, Ibox, withFormPanel } from 'pcmli.umbrella.web-ui'
import { withMutation } from 'pcmli.umbrella.core'

import { ProfileFormPanel } from './ProfileFormPanel'
import { ContactFormPanel } from './ContactFormPanel'

export const AboutTabItem = (props) => {
  return (
    <div>
      <ProfileFormPanel {...props} title="Profile"/>
      <ContactFormPanel {...props} title="Contact Information"/>
    </div>
  )
}
