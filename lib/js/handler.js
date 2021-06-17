$('#card').on('click', (e) => {
    $('#main').load("/transact/utils/card.html");
})

$('#upi').on('click', (e) => {
    $("#main").load("/transact/utils/upi.html");
})

$('#wallet').on('click', (e) => {
    $("#main").load("/transact/utils/wallet.html");
})

let goback = () => {
    $('#main').load("/transact/index.html");
}