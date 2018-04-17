import {get_desktop, get_mobile, get_tablet} from '../../lib/test_utils'

export default {

  'Logo and name visible': browser => {
    let mob = get_mobile(browser);
    mob.expect.element('.navbar-brand a').to.be.visible;
    mob.expect.element('.navbar-brand a img').to.have.attribute('src');
    mob.assert.attributeContains('.navbar-brand a img', 'src', '.svg');
    mob.expect.element('.navbar-brand a').text.to.contain('edusanjal');
  },

  'Navigate away from home': browser => {
    let client = get_desktop(browser);
    let original_url;
    client.url(function (result) {
      original_url = result.value;
      client.click('div.main a').pause(1000);
      client.url(function (result) {
        client.assert.ok(result.value != original_url);
      });
    });
  },

  'Click on brand to go back to home': browser => {
    let client = get_tablet(browser);
    let original_url;
    client.url(function (result) {
      original_url = result.value;
      client.click('div.main a').pause(1000);
      client.url(function (result) {
        client.assert.ok(result.value != original_url);
        client.click('.navbar-brand a').pause(1000);
        client.url(function (res) {
          client.assert.ok(res.value == original_url);
        });
      });
    });
  }
};