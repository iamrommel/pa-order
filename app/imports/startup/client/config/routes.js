import React from 'react'
import { Route } from 'react-router-dom'
import { Page, PageLayoutBlank, PageLayoutMain, PageLayoutNotFound } from 'pcmli.umbrella.web-ui'
import _ from 'lodash'

import { Sidebar, Footer, TopHeader } from '../../../../client/components'

import { OverviewPage } from '../../../../client/views/overview/index'
import { OrderListPage, OrderDetailPage } from '../../../../client/views/order'
import { SettingsDetailPage } from '../../../../client/views/settings/index'
import { LoginPage, JoinPage } from '../../../../client/views/accounts'

export const routesDef = {
  OverviewPage: {name: 'Overview', path: '/app/overview', component: OverviewPage, exact: true, layout: 'main'},
  OrderListPage: {name: 'Order List', path: '/app/orders/list', component: OrderListPage, exact: true, layout: 'main'},
  CustomersDetailPage: {name: 'Order details', path: '/app/orders/detail/:id/:code', altPath: '/app/orders/detail/', component: OrderDetailPage, exact: true, layout: 'main'},

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
