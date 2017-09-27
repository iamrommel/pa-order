import React from 'react'
import { Route } from 'react-router-dom'
import { Page, PageLayoutBlank, PageLayoutMain, PageLayoutNotFound } from 'pcmli.umbrella.web-ui'
import _ from 'lodash'

import { Sidebar, Footer, TopHeader } from '../../../ui/components'

import { OverviewPage } from '../../../ui/views/overview/index'
import { CustomersDetailPage, CustomersListPage } from '../../../ui/views/customers/index'
import { SettingsDetailPage } from '../../../ui/views/settings/index'
import { LoginPage, JoinPage } from '../../../ui/views/accounts'

export const routesDef = {
  OverviewPage: {name: 'Overview', path: '/app/overview', component: OverviewPage, exact: true, layout: 'main'},
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