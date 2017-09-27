import React from 'react'
import { Route } from 'react-router-dom'
import { Page, PageLayoutBlank, PageLayoutMain, PageLayoutNotFound } from 'pcmli.umbrella.web-ui'
import _ from 'lodash'

import { Sidebar, Footer, TopHeader } from '../../../../client/components/index'

import { OverviewPage } from '../../../../client/views/overview/index'
import { PickupListPage, PickupDetailPage } from '../../../../client/views/milk/pickup/index'
import { CustomersDetailPage, CustomersListPage } from '../../../../client/views/customers/index'
import { DriversDetailPage, DriversListPage } from '../../../../client/views/drivers/index'
import { RoutesListPage, RoutesDetailPage } from '../../../../client/views/routes/index'
import { SettingsDetailPage } from '../../../../client/views/settings/index'
import { LoginPage, JoinPage } from '../../../../client/views/accounts'

export const routesDef = {
  OverviewPage: {name: 'Overview', path: '/app/overview', component: OverviewPage, exact: true, layout: 'main'},
  PickupListPage: {name: 'Pickup List', path: '/app/pickups/list', component: PickupListPage, exact: true, layout: 'main'},
  PickupDetailPage: {name: 'Pickup details', path: '/app/pickups/detail/:id/:ticketNo', altPath: '/app/pickups/detail/', component: PickupDetailPage, exact: true, layout: 'main'},
  DriversListPage: {name: 'Driver List', path: '/app/drivers/list', component: DriversListPage, exact: true, layout: 'main'},
  DriversDetailPage: {name: 'Driver details', path: '/app/drivers/detail/:id/:code', altPath: '/app/drivers/detail/', component: DriversDetailPage, exact: true, layout: 'main'},
  RoutesListPage: {name: 'Route List', path: '/app/routes/list', component: RoutesListPage, exact: true, layout: 'main'},
  RoutesDetailPage: {name: 'Routes details', path: '/app/routes/detail/:id/:code', altPath: '/app/routes/detail/', component: RoutesDetailPage, exact: true, layout: 'main'},
  CustomersListPage: {name: 'Customer List', path: '/app/customers/list', component: CustomersListPage, exact: true, layout: 'main'},
  CustomersDetailPage: {name: 'Customer details', path: '/app/customers/detail/:id/:code', altPath: '/app/customers/detail/', component: CustomersDetailPage, exact: true, layout: 'main'},
  SettingsDetailPage: {name: 'Settings', path: '/app/settings', component: SettingsDetailPage, exact: true, layout: 'main'},
  LoginPage: {name: 'Login', path: '/account/login', component: LoginPage, exact: true, layout: 'blank'},
  JoinPage: {name: 'Join', path: '/account/join', component: JoinPage, exact: true, layout: 'blank'},

}

export const routesArray = _.values(routesDef)

export const MainLayoutRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      <PageLayoutMain footer={<Footer/>} sideBar={<Sidebar/>} topHeader={<TopHeader/>}>
        <Component {...props}/>
      </PageLayoutMain>
    )}/>
  )
}

export const BlankLayoutRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      <PageLayoutBlank>
        <Component {...props}/>
      </PageLayoutBlank>
    )}/>
  )
}

const mapMainLayoutRoute = (arr) => {
  return arr.map((m, i) => {
    return <MainLayoutRoute key={i} {...m}/>
  })
}

const mapBlankLayoutRoute = (arr) => {
  return arr.map((m, i) => {
    return <BlankLayoutRoute key={i} {...m}/>
  })
}

export const defaultRoute = (<MainLayoutRoute {...routesDef.OverviewPage} path="/"/>)
export const mainRoutes = mapMainLayoutRoute(_.filter(routesArray, {layout: 'main'}))
export const blankRoutes = mapBlankLayoutRoute(_.filter(routesArray, {layout: 'blank'}))
