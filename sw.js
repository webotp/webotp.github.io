

self.addEventListener('paymentrequest', e => {
  console.log("requested");
  e.openWindow("/index.html");
});

self.addEventListener('canmakepayment', e => {
  console.log("can make payment");
  e.respondWith(true);
});
