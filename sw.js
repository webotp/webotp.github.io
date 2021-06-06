

self.addEventListener('paymentrequest', e => {
  console.log("requested");
  e.openWindow("https://shau05.github.io/pay");
});

self.addEventListener('canmakepayment', e => {
  console.log("can make payment");
  e.respondWith(true);
});
