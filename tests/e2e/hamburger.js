import {get_desktop, get_mobile} from '../../lib/test_utils'

export default {
  'Hamburger Menu Mobile': browser => {
    get_mobile(browser)
      .assert.hidden(".navbar-menu")
      .click('.navbar-burger span:first-child')
      .assert.cssClassPresent(".navbar-burger", "is-active")
      .assert.cssClassPresent(".navbar-menu", "is-active")
      .assert.visible(".navbar-menu")
      .saveScreenshot('./reports/menu.png')
      .end();
  },
  'Hamburger Menu Web': browser => {
    get_desktop(browser)
      .assert.visible(".navbar-menu")
      .assert.hidden(".navbar-burger span:first-child")
      .saveScreenshot('./reports/menu.png')
      .end();
  }
};