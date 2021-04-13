window.addEventListener('DOMContentLoaded', (event) => {
    Loading = false;

    const container = document.getElementById('container');

    fetch('/admin/orders', options).then((response) => { return response.json() }).then((responseJson) => {
        console.log(responseJson)
        if (responseJson.length != 0) {
            document.getElementById('container').innerHTML = '';
            var userSort = responseJson;
            userSort = userSort.sort(function (a, b) { return parseInt(a.BasketID) - parseInt(b.BasketID); });//sort
            console.log(userSort)
            var BasketIDs = []
            userSort.forEach(transaction => {
                if (!BasketIDs.includes(transaction.BasketID))
                    BasketIDs[BasketIDs.length] = transaction.BasketID;//find all basket id duplicates
            });
            console.log(BasketIDs);
            var k = 0;
            var j = 0;
            BasketIDs.forEach(baskets => {//get all json
                // container.innerHTML += '<div class="row" id="row' + j + '"> <div class="col row"> <ul class="col" id="Product' + j + '"></ul> <ul class="col" id="Size' + j + '"></ul> <ul class="col" id="Gender' + j + '"></ul> <ul class="col" id="Quantity' + j + '"></ul> <ul class="col"id="BasketID' + j + '"></ul> <ul class="col"id="Username' + j + '"></ul> <ul class="col"id="Accept' + j + '"></ul> </div> </div>  '
                // container.innerHTML += '<div class="row" id="row' + j + '"></div>'
                var thisBasketJsonArray = [];
                userSort.forEach(transaction => {
                    if (transaction.BasketID == baskets)
                        thisBasketJsonArray[thisBasketJsonArray.length] = transaction;
                });
                console.log(thisBasketJsonArray);//this basket json array is the array of json that is only for 1 basket
                thisBasketJsonArray.forEach(transaction => {
                    /*
                    const Product = document.createElement('div');
                    const BasketID = document.createElement('div');
                    const Username = document.createElement('div');
                    const Accept = document.createElement('div');
                    const Gender = document.createElement('div');
                    const Quantity = document.createElement('div');
                    const Size = document.createElement('div');
    
                    Product.classList.add('col');
                    BasketID.classList.add('col');
                    Username.classList.add('col');
                    Accept.classList.add('col');
                    Gender.classList.add('col');
                    Quantity.classList.add('col');
                    Size.classList.add('col');
                    // const Row = document.createElement('div');
    
                    Product.id = ('Product' + j);
                    BasketID.id = ('BasketID' + j);
                    Username.id = ('Username' + j);
                    Accept.id = ('Accept' + j);
                    Gender.id = ('Gender' + j);
                    Quantity.id = ('Quantity' + j);
                    Size.id = ('Size' + j);
                    */
                    //  Row.id = ('row' + j);

                    container.innerHTML += '<div class="basket" id="basket' + k + '"></div>';
                    document.getElementById('basket' + j).style.backgroundColor = colors[j % 5];
                    document.getElementById('basket' + j).style.borderRadius = "10px";
                    document.getElementById('basket' + j).innerHTML += '<div class="row" id="row' + k + '"></div>';
                    const Row = document.getElementById('row' + k);
                    // console.log(Row)

                    Row.innerHTML += ('<div class="col" id="Product' + k + '"></div>');
                    // Row.innerHTML += ('<div class="col" id="BasketID' + k + '"></div>');
                    Row.innerHTML += ('<div class="col" id="Username' + k + '"></div>');
                    Row.innerHTML += ('<div class="col" id="Quantity' + k + '"></div>');
                    Row.innerHTML += ('<div class="col" id="Size' + k + '"></div>');
                    Row.innerHTML += ('<div class="col" id="Gender' + k + '"></div>');
                    Row.innerHTML += ('<div class="col" id="Accept' + k + '"></div>');

                    const Product = document.getElementById('Product' + k);
                    // const BasketID = document.getElementById('BasketID' + k);
                    const Username = document.getElementById('Username' + k);
                    const Quantity = document.getElementById('Quantity' + k);
                    const Gender = document.getElementById('Gender' + k);
                    const Size = document.getElementById('Size' + k);
                    const Accept = document.getElementById('Accept' + k);
                    // Row.appendChild(Product);
                    // Row.appendChild(BasketID);
                    // Row.appendChild(Username);
                    // Row.appendChild(Accept);
                    // Row.appendChild(Gender);
                    Product.innerHTML += '<p>' + transaction.Product.Name + '</p>';
                    // BasketID.innerHTML += '<p>' + transaction.Product.Size + '</p>';
                    Username.innerHTML += '<p>' + transaction.Username + '</p>';
                    Size.innerHTML += '<p>' + transaction.Product.Size + '</p>';
                    Gender.innerHTML += '<p>' + transaction.Product.Gender + '</p>';
                    Quantity.innerHTML += '<p>' + transaction.Product.Quantity + '</p>';
                    Accept.innerHTML += '<button style="background-color:rgba(255,255,255,0.8)" id="' + transaction.TransactionID + '" type="button" class="btn btn-outline-success" onclick="complete(this)">Completed</button>';
                    // AddLI(Product, '<p>' + transaction.Product.Name + '</p>');
                    // AddLI(Size, '<p>' + transaction.Product.Size + '</p>');
                    // AddLI(Quantity, '<p>' + transaction.Product.Quantity + '</p>');
                    // AddLI(Gender, '<p>' + transaction.Product.Gender + '</p>');
                    // AddLI(Username, '<p>' + transaction.Username + '</p>');
                    // AddLI(BasketID, '<p>' + transaction.BasketID + '</p>');
                    // AddLI(Accept, '<button type="button" class="btn btn-primary">test</button>');
                    k++;
                })
                j++;
            });
        }
        else
            document.getElementById('container').innerHTML = '<h1 style="left:50vw; top:50vh; position:absolute;transform: translate(-50%,-50%)" class="display-1">No pending orders! Sit back!</h1>';
    });
    function AddLI(parrent, content) {
        li = document.createElement('li');
        li.style.padding = "5px";
        li.innerHTML = content;
        parrent.appendChild(li);
    }
})
const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
}; const colors = ['#805D93', '#F49FBC', '#FFD3BA', '#9EBD6E', '#169873']

function complete(sender) {
    options.body = JSON.stringify({ TransactionID: sender.id });
    console.log(options);
    fetch('/admin/orders/complete', options).then((response) => { return response.json() }).then((responseJson) => {
        console.log(responseJson);
        if (responseJson == "success") {
            console.log(document.getElementById(sender.id.toString()));
            if (document.getElementById(sender.id.toString()).parentElement.parentElement.parentElement.children.length != 1)
                document.getElementById(sender.id.toString()).parentElement.parentElement.remove();
            else
                document.getElementById(sender.id.toString()).parentElement.parentElement.parentElement.remove();

        }
    });
}