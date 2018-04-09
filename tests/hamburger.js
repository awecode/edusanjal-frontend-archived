module.exports = {
  'Hamburger Menu': function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 1000)
      .assert.hidden(".navbar-menu")
      .click('.navbar-burger span:first-child')
      .assert.cssClassPresent(".navbar-burger", "is-active")
      .assert.cssClassPresent(".navbar-menu", "is-active")
      .assert.visible(".navbar-menu")
      .saveScreenshot('./reports/menu.png')
      .pause(1000)
      .end();
  }
};