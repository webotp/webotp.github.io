

self.addEventListener('paymentrequest', e => {
  console.log("requested");
  e.openWindow("https://google.com");
});

self.addEventListener('canmakepayment', e => {
  console.log("can make payment");
  e.respondWith(true);
});
