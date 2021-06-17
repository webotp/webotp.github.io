$('#card').on('click', (e) => {
    $('#main').load("/transact/utils/card.html");
})

$('#upi').on('click', (e) => {
    $("#main").load("/transact/utils/upi.html");
})

$('#wallet').on('click', (e) => {
    $("#main").load("/transact/utils/wallet.html");
})

$('#back').on('click',(e) => {
    console.log("clicked");
    $('#main').load("/transact/index.html");
})