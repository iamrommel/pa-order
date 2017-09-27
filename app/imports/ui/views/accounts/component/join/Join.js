import React from 'react'
import { PageHeader, PageContent, Breadcrumb, IboxContent } from 'pcmli.umbrella.web-ui'

import { Form } from './Form'

let Join = () => {
  return (
    <div className="row">
      <div className="col-md-6 text-white">
        <h2 className="font-bold">Join first to start using</h2>

        <p>
          You need to join specific organization first before you can use this application. You will need the organization code that can be provided by your organization head.
          Please contact them about it.
        </p>

        <p>
          But if you are brave enough to explore the wild you can use <strong>DFT</strong> as the organization code and just wait for the admin to accept your request.
        </p>

        <p>
          And if you are not interested at all, just log-out.
        </p>


      </div>
      <div className="col-md-6">
        <div>
          <IboxContent>
            <div className="row m-sm">
              <Form/>
            </div>
          </IboxContent>
        </div>
      </div>
    </div>
  )
}

export { Join }


