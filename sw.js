class PromiseResolver {
  constructor() {
    this.promise_ = new Promise((resolve, reject) => {
      this.resolve_ = resolve;
      this.reject_ = reject;
    });
  }
  get promise() {
    return this.promise_
  }
  get resolve() {
    return this.resolve_
  }
  get reject() {
    return this.reject_
  }
}
let cc;

class FrontendController {
  constructor(event) {
    this.resolver = new PromiseResolver();
    this.pre = event;
    this.pre.respondWith(this.resolver.promise);
  }
  async appendClient(client) {
    // TODO: If you want to just one session at one time,
    // don't overwrite the `client`.
    this.client = client;
    this.client.postMessage({
      msg: "amount",
      total: this.pre.total
    });
  }
  async authorize(paymentHandlerResponse) {
    this.resolver.resolve(paymentHandlerResponse);
  }
  async success(text) {
    return this.resolver.resolve(text);
  }
  async cancel(text) {
    return this.resolver.reject(text);
  }
}

self.addEventListener('message', async e => {
  switch (e.data.msg) {
    case "cancel":
      await cc.cancel(e.data.contents);
      cc = null;
      break;
    case "success":
      await cc.success(e.data.contents);
      cc = null;
      break;
    case "failed":
      await cc.success(e.data.contents);
      cc = null;
      break;
    case "payment_app_window_ready":
      console.log(e.source);
      cc.appendClient(e.source);
      break;
    case "i am another client":
      console.log(e.source);
      break;
  }
})

self.addEventListener('paymentrequest', e => {
  // e.methodData[0].data.url
  console.log(e);
  cc = new FrontendController(e);
  e.openWindow("https://shau05.github.io");
});

self.addEventListener('canmakepayment', e => {
  console.log(e);
  e.respondWith(true);
});