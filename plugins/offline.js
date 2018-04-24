window.addEventListener('load', function () {
  function updateOnlineStatus() {
    let status = navigator.onLine ? 'online' : 'offline';
    document.body.className = '';
    document.body.classList.add(status);
  }

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  updateOnlineStatus();
});