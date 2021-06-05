

self.addEventListener('paymentrequest', e => {
  e.openWindow("https://shau05.github.io");
});

self.addEventListener('canmakepayment', e => {
  e.respondWith(true);
});
