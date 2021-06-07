

self.addEventListener('paymentrequest', e => {
  console.log("requested");
  e.openWindow("https://payment-handler-example2.appspot.com/pay");
});

self.addEventListener('canmakepayment', e => {
  console.log("can make payment");
  e.respondWith(true);
});
