(function () {

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
            data:{
                url: 'upi://pay?pa=merchantname0@ybl&pn=merchantname&am=1.0&mam=1.0&tid=YBLc6f12c2333b2495fbfd024b12ad43dc7&tr=T2002061921587731419308&tn=Payment%20for%20TX117785240954814000&mc=5311&mode=04&purpose=00',
            }
        }],
        gpaySupportedInstruments = [{
            supportedMethods: "https://tez.google.com/pay",
            data:{
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



    this.isPhonepeAppInstalled = () => {
        if (phonepePaymentRequest) {
            phonepePaymentRequest.canMakePayment().then((result) => {
                if(result){
                    phonepePaymentRequest.hasEnrolledInstrument().then((result) => {
                        if(result){
                            $('#phonepetext').text("Installed");
                        }else{
                            $('#phonepetext').text("Not installed");
                            debug("phonepe is not installed");
                        }
                    }).catch((err) => {
                        $('#phonepetext').text(err);
                        handleError(err);
                    })
                }else{
                    $('#phonepetext').text("Not installed");
                    debug("gpay is not installed");
                }
            }).catch((err) => {
                $('#phonepetext').text(err);
                handleError(err);
            })
        } else {
            $('#phonepetext').text("Not installed");
            debug("PhonePe Payment Request is not generated");
        }
    }

    this.isGpayAppInstalled = () => {
        if(gpayPaymentRequest){
            gpayPaymentRequest.canMakePayment().then((result) => {
                if(result){
                    gpayPaymentRequest.hasEnrolledInstrument().then((result) => {
                        if(result){
                            $('#gpaytext').text("Installed");
                        }else{
                            $('#gpaytext').text("Not installed");
                            debug("Gpay is not installed");
                        }
                    }).catch((err) => {
                        $('#gpaytext').text(err);
                        handleError(err);
                    })
                }else{
                    $('#gpaytext').text("Not installed");
                    debug("Gpay is not installed");
                }
            }).catch((err) => {
                $('#gpaytext').text(err);
                handleError(err);
            })
        }else{
            $('#gpaytext').text("Not installed");
            debug("Gpay Payment Request is not generated");
        }
    }

    let handleResponse = (response) => {
        response.complete("success");
        console.log(response);
    }

    this.showGpay = () => {
        if(gpayPaymentRequest){
            gpayPaymentRequest.show().then(handleResponse).catch((err) => {
                handleError(err);
            });
        }else{
            debug("Gpay Payment Request is not generated");
        }
    }

    this.showPhonepe = () => {
        if(phonepePaymentRequest){
            phonepePaymentRequest.show().then(handleResponse).catch((err) => {
                handleError(err);
            });
        }else{
            debug("Phonepe Payment Request is not generated");
        }
    }

}());