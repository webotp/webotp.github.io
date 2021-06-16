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
    case "client_ready":
      cc.appendClient(e.source);
      break;
  }
})

self.addEventListener('paymentrequest', e => {
  // e.methodData[0].data.url
  console.log(e);
  cc = new FrontendController(e);
  e.openWindow("https://shau05.github.io/transact");
});

self.addEventListener('canmakepayment', e => {
  console.log(e);
  e.respondWith(true);
});