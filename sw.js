
class PromiseResolver {
  constructor() {
    this.promise_ = new Promise((resolve, reject) => {
      this.resolve_ = resolve;
      this.reject_ = reject;
    });
  }
  get promise() { return this.promise_ }
  get resolve() { return this.resolve_ }
  get reject() { return this.reject_ }
}
let cc;

class FrontendController {
  // Restore `PaymentRequestEvent`
  // https://w3c.github.io/payment-handler/#the-paymentrequestevent
  constructor(event) {
    this.resolver = new PromiseResolver();
    this.pre = event;
    this.pre.respondWith(this.resolver.promise);
  }
  async appendClient(client) {
    // TODO: If you want to just one session at one time,
    // don't overwrite the `client`.
    this.client = client;
  }
  async authorize(paymentHandlerResponse) {
    this.resolver.resolve(paymentHandlerResponse);
  }
  async success(){
    return this.resolver.resolve();
  }
  async cancel() {
    return this.resolver.reject();
  }
}

self.addEventListener('message',async e => {
  console.log(e.data.message);
  switch(e.data.message){
    case "cancel":
      await cc.cancel();
      cc=null;
      break;
    case "success":
      await cc.success();
      cc=null;
      break;
  }
})

self.addEventListener('paymentrequest', e => {
  console.log(e.methodData[0].data.url);
  cc = new FrontendController(e);
  e.openWindow("https://shau05.github.io");
});

self.addEventListener('canmakepayment', e => {
  console.log("can make payment");
  e.respondWith(true);
});
