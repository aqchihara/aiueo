window.addEventListener('load', function () {
    window.history.pushState({}, '')
  })

  window.addEventListener('popstate', function () {
    window.history.pushState({}, '')
  })
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceWorker.js')
      .then(
        function (registration) {
          if (typeof registration.update == 'function') {
            registration.update();
          }
        })
      .catch(function (error) {
        console.log("Error Log: " + error);
      });
  }