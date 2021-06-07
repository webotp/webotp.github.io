
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
  async postMessage(message, contents) {
    if (!this.client) {
      throw 'Client not set.';
    }
    this.client.postMessage({
      ...contents,
      type: message,
    });
  }
  async paymentReady() {
    // TODO: Pass sequence of `AddressInit`, sequence of `paymentMethods`
    this.postMessage('payment_ready', {
      requestBillingAddress: this.pre.requestBillingAddress,
      total: this.pre.total,
      paymentOptions: this.pre.paymentOptions,
      shippingOptions: this.pre.shippingOptions
    });
  }
  async authorize(paymentHandlerResponse) {
    this.resolver.resolve(paymentHandlerResponse);
  }
  async cancel(text) {
    return this.resolver.reject(text);
  }
}

self.addEventListener('message', async e => {
  if (!cc) return;
  switch (e.data.message) {
    case 'payment_app_window_ready':
      try {
        await cc.appendClient(e.source);
        await cc.paymentReady();
      } catch (e) {
        throw e;
      }
      break;
    case 'authorized':
      await cc.authorize(e.data.contents);
      cc = null;
      break;
    case 'canceled':
      await cc.cancel();
      cc = null;
      break;
    default:
      break;
  }
});

self.addEventListener('paymentrequest', e => {
  cc = new FrontendController(e);
  console.log("requested");
  e.openWindow("https://payment-handler-example2.appspot.com/pay");
});

self.addEventListener('canmakepayment', e => {
  console.log("can make payment");
  e.respondWith(true);
});
