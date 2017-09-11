import { Sidebar as Sb } from 'pcmli.umbrella.web-ui'
import React from 'react'
import { Link } from 'react-router-dom'

import { routesDef } from '../../imports/startup/client/config/routes'
import { UserDisplay } from './UserDisplay'

export const Sidebar = () => {

  const menuItems = [
    {
      url: routesDef.OverviewPage.path,
      icon: 'dashboard',
      name: 'Overview'
    },
    {
      url: routesDef.OrdersListPage.path,
      icon: 'users',
      name: 'Orders'
    },

    {
      url: routesDef.SettingsDetailPage.path,
      icon: 'gears',
      name: 'Settings'
    }
  ]

  const header = (
    <div>
      <UserDisplay/>
      <div className="logo-element">
        <Link to="/app/overview"> <img src="img/logo.png" className="logo-element-image"/> </Link>
      </div>
    </div>
  )

  return <Sb menuItems={menuItems} header={header}/>
}

