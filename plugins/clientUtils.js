global.ClientUtils = {};

ClientUtils.loadScript = src => {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  document.body.appendChild(script);
};