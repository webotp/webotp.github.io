
export class PromiseResolver {
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
