let get_desktop = browser => browser.url('http://localhost:3000').resizeWindow(1024, 999).waitForElementVisible('body', 1000);

let get_mobile = browser => browser.url('http://localhost:3000').resizeWindow(700, 700).waitForElementVisible('body', 1000, '');

let get_tablet = browser => browser.url('http://localhost:3000').resizeWindow(900, 800).waitForElementVisible('body', 1000);

export default {get_desktop, get_mobile, get_tablet}