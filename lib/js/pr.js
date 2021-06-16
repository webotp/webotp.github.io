$('#payment').on('submit', (e) => {
    e.preventDefault();
    initiatePayment("https://shau05.github.io/transact");
});

function initPaymentRequest(url) {
    if (!window.PaymentRequest) {
        return null;
    }
    let supportedInstruments = [{
        supportedMethods: "https://shau05.github.io/transact/payment-manifest.json",
        data: {
            url
        }
    }];
    const details = {
        total: {
            label: "total",
            amount: {
                currency: "INR",
                value: "100",
            }
        }
    }
    let request = new PaymentRequest(supportedInstruments, details);
    return request;
}
let success = (success_) => {
    console.log("success " + success_);
}

let toast = (message_) => {
    M.toast({
        html: message_,
        classes: 'rounded'
    });
}

let failure = (failure_) => {
    console.log("failed " + failure_);
}

let handleResponse = (response) => {
    console.log(response);
    if (response.details.message == "SUCCESS") {
        toast(`<i class="material-icons sz-5x">check</i>Payment Successfull`);
    } else {
        toast(`<i class="material-icons sz-5x">clear</i>Payment Failed`);
    }
}

let initiatePayment = async (url) => {
    let request = initPaymentRequest(url);
    if (request == null) {
        failure("browser does not support payment request api");
        return;
    }
    request.canMakePayment().then((result) => {
        console.log(result);
        if (result == true) {
            success("can make payment");
            request.show().then((paymentResponse) => {
                paymentResponse.complete("success");
                handleResponse(paymentResponse);
            }).catch((err) => {
                failure(err);
            });
        } else {
            window.location.href = url;
            failure("cannot make payment");
        }
    }).catch((err) => {
        failure(err);
    });
}