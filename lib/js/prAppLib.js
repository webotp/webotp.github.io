(function () {

    const canPhonepeMakePaymentCache = 'canPhonepeMakePaymentCache',
        canGpayMakePaymentCache = 'canGpayMakePaymentCache';
    const phonepeHasEnrolledInstrumentCache = 'phonepeHasEnrolledInstrumentCache',
        gpayHasEnrolledInstrumentCache = 'gpayHasEnrolledInstrumentCache';

    let handleError = (err) => {
        console.log(err);
    }

    let debug = (content) => {
        console.log(content);
    }

    const details = {
        total: {
            label: "total",
            amount: {
                currency: "INR",
                value: "100",
            }
        }
    }

    const phonepeSupportedInstruments = [{
            supportedMethods: "https://mercury.phonepe.com/transact/pay",
            data: {
                url: 'upi://pay?pa=merchantname0@ybl&pn=merchantname&am=1.0&mam=1.0&tid=YBLc6f12c2333b2495fbfd024b12ad43dc7&tr=T2002061921587731419308&tn=Payment%20for%20TX117785240954814000&mc=5311&mode=04&purpose=00',
            }
        }],
        gpaySupportedInstruments = [{
            supportedMethods: "https://tez.google.com/pay",
            data: {
                pa: 'merchantname0@ybl', // merchant-vpa
                pn: 'Merchant Name',
                tr: 'T2002061921587731419308', // Merchant Transaction Id
                url: 'upi://pay?pa=merchantname0@ybl&pn=merchantname&am=1.0&mam=1.0&tid=YBLc6f12c2333b2495fbfd024b12ad43dc7&tr=T2002061921587731419308&tn=Payment%20for%20TX117785240954814000&mc=5311&mode=04&purpose=00',
                mc: '1234', // your merchant category code
                tn: 'Purchase in Merchant',
                gstBrkUp: 'GST:16.90|CGST:08.45|SGST:08.45', // GST value break up
                invoiceNo: 'BillRef123', // your invoice number
                invoiceDate: '2019-06-11T13:21:50+05:30', // your invoice date and time
                gstIn: '29ABCDE1234F2Z5', // your GSTIN
            }
        }];

    function initPaymentRequest(supportedInstruments) {
        if (!window.PaymentRequest) {
            return null;
        }
        let request = new PaymentRequest(supportedInstruments, details);
        return request;
    }

    let phonepePaymentRequest, gpayPaymentRequest;

    phonepePaymentRequest = initPaymentRequest(phonepeSupportedInstruments);
    gpayPaymentRequest = initPaymentRequest(gpaySupportedInstruments);

    let canPhonepeMakePayment = () => {
        if (sessionStorage.hasOwnProperty(canPhonepeMakePaymentCache)) {
            return Promise.resolve(JSON.parse(sessionStorage[canPhonepeMakePaymentCache]));
        }

        if (!phonepePaymentRequest) {
            debug("error in canPhonepeMakePayment : phonepe Payment Request is not generated...");
            return false;
        }

        let canPhonepeMakePaymentPromise = Promise.resolve(true);
        if (phonepePaymentRequest.canMakePayment) {
            canPhonepeMakePaymentPromise = phonepePaymentRequest.canMakePayment();
        }

        return canPhonepeMakePaymentPromise.then((result) => {
            sessionStorage[canPhonepeMakePaymentCache] = result;
            return result;
        }).catch((err) => {
            handleError(err);
        })
    }

    let canGpayMakePayment = () => {
        if (sessionStorage.hasOwnProperty(canGpayMakePaymentCache)) {
            return Promise.resolve(JSON.parse(sessionStorage[canGpayMakePaymentCache]));
        }

        if (!gpayPaymentRequest) {
            debug("error in canGpayMakePayment : gpay Payment Request is not generated...");
            return false;
        }

        let canGpayMakePaymentPromise = Promise.resolve(true);
        if (gpayPaymentRequest.canMakePayment) {
            canGpayMakePaymentPromise = gpayPaymentRequest.canMakePayment();
        }

        return canGpayMakePaymentPromise.then((result) => {
            sessionStorage[canGpayMakePaymentCache] = result;
            return result;
        }).catch((err) => {
            handleError(err);
        })
    }

    let phonepeHasEnrolledInstrument = () => {
        if (sessionStorage.hasOwnProperty(phonepeHasEnrolledInstrumentCache)) {
            return Promise.resolve(JSON.parse(sessionStorage[phonepeHasEnrolledInstrumentCache]));
        }

        if (!phonepePaymentRequest) {
            debug("error in phonepeHasEnrolledInstrument : phonepe Payment Request is not generated...");
            return false;
        }

        let phonepeHasEnrolledInstrumentPromise = phonepePaymentRequest.hasEnrolledInstrument();

        return phonepeHasEnrolledInstrumentPromise.then((result) => {
            sessionStorage[phonepeHasEnrolledInstrumentCache] = result;
            return result;
        }).catch((err) => {
            handleError(err);
        })
    }

    let gpayHasEnrolledInstrument = () => {
        if (sessionStorage.hasOwnProperty(gpayHasEnrolledInstrumentCache)) {
            return Promise.resolve(JSON.parse(sessionStorage[gpayHasEnrolledInstrumentCache]));
        }

        if (!gpayPaymentRequest) {
            debug("error in gpayHasEnrolledInstrument : gpay Payment Request is not generated...");
            return false;
        }

        let gpayHasEnrolledInstrumentPromise = gpayPaymentRequest.hasEnrolledInstrument();

        return gpayHasEnrolledInstrumentPromise.then((result) => {
            sessionStorage[gpayHasEnrolledInstrumentCache] = result;
            return result;
        }).catch((err) => {
            handleError(err);
        })
    }

    this.isPhonepeAppInstalled = async () => {
        const canPay = await canPhonepeMakePayment();
        if (!canPay) {
            return canPay;
        }
        const instrumentEnabled = await phonepeHasEnrolledInstrument();
        return canPay && instrumentEnabled;
    }

    this.isGpayAppInstalled = async () => {
        const canPay = await canGpayMakePayment();
        if (!canPay) {
            return canPay;
        }
        const instrumentEnabled = await gpayHasEnrolledInstrument();
        return canPay && instrumentEnabled;
    }

    let handleResponse = (response) => {
        response.complete("success");
        console.log(response);
    }

    this.showGpay = async() => {
        const canPay = await isGpayAppInstalled();
        if(canPay){
            gpayPaymentRequest.show().then(handleResponse).catch((err) => {
                handleError(err);
            });
        }else{
            debug("Gpay can not make payment");
        }
    }

    this.showPhonepe = async() => {
        const canPay = await isPhonepeAppInstalled();
        if(canPay){
            phonepePaymentRequest.show().then(handleResponse).catch((err) => {
                handleError(err);
            });
        }else{
            debug("phonepe can not make payment");
        }
    }

}());