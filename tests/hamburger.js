import {get_desktop, get_mobile} from './utils'

export default {
  'Hamburger Menu Mobile': browser => {
    get_mobile(browser)
      .assert.hidden(".navbar-menu")
      .click('.navbar-burger span:first-child')
      .assert.cssClassPresent(".navbar-burger", "is-active")
      .assert.cssClassPresent(".navbar-menu", "is-active")
      .assert.visible(".navbar-menu")
      .saveScreenshot('./reports/menu.png')
      .pause(1000)
      .end();
  },
  'Hamburger Menu Web': browser => {
    get_desktop(browser)
      .waitForElementVisible('body', 1000)
      .assert.visible(".navbar-menu")
      .assert.hidden(".navbar-burger span:first-child")
      .saveScreenshot('./reports/menu.png')
      .pause(1000)
      .end();
  }
};