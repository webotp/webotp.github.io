
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
  registration = await navigator.serviceWorker.ready;
    if (!registration.paymentManager) {
      return;
    }
    await registration.paymentManager.instruments.set(
      "instrument-id-1",
      {
        name: 'Payment Method 1',
        method: ["https://shau05.github.io"]
      }
    );
}
