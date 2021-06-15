let controller;

if (navigator.serviceWorker.controller) {
    controller = navigator.serviceWorker.controller;
    controller.postMessage({
        message_type: "status",
        message: "Payment Status Goes here"
    });
} else {
    console.log("unable to locate service worker");
}