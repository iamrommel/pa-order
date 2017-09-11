import React from 'react'
import { Icon } from 'pcmli.umbrella.web-ui'
import { LogoutText } from './Logout'

function smoothlyMenu () {
  if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
    // Hide menu in order to smoothly turn on when maximize menu
    $('#side-menu').hide()
    // For smoothly turn on menu
    setTimeout(
      function () {
        $('#side-menu').fadeIn(400)
      }, 200)
  } else if ($('body').hasClass('fixed-sidebar')) {
    $('#side-menu').hide()
    setTimeout(
      function () {
        $('#side-menu').fadeIn(400)
      }, 100)
  } else {
    // Remove all inline style from jquery fadeIn function to reset menu state
    $('#side-menu').removeAttr('style')
  }
}

function toggleMiniNav (e) {
  e && e.preventDefault()
  $('body').toggleClass('mini-navbar')
  smoothlyMenu()
}

export const TopHeader = () => {

  const toggleNavigation = (e) => {
    toggleMiniNav(e)
  }

  return (
    <div className="row border-bottom">
      <nav className="navbar navbar-static-top white-bg" role="navigation" style={{marginBottom: 0}}>
        <div className="navbar-header">
          <a className="navbar-minimalize minimalize-styl-2 btn btn-primary "
             onClick={toggleNavigation} href="#"><Icon name="bars"/> </a>
        </div>

        <div className="nav navbar-minimalize minimalize-styl-2 ">
        </div>

        <ul className="nav navbar-top-links navbar-right">
          <li>
            <LogoutText/>
          </li>
        </ul>
      </nav>
    </div>
  )
}

