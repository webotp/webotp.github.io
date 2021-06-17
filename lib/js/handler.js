let gotocard = () => {
    $('#main').load("/transact/utils/card.html");
}

let gotoupi = () => {
    $("#main").load("/transact/utils/upi.html");
}

let gotowallet = () => {
    $("#main").load("/transact/utils/wallet.html");
}


let goback = () => {
    $('#main').load("/transact/index.html");
}