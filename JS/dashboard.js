const welcomeMessage='Bienvenido';
let cardData=[];
let cardContainer;


document.addEventListener('DOMContentLoaded', function(){
    let loginButton=document.getElementById('loginButton');
    if(loginButton){
        loginButton.addEventListener('click', login);
    }
    let storedUsername=localStorage.getItem('username');
    if(storedUsername){
        let welcome=document.getElementById('welcome');

        welcome.style.display="block"
        welcome.innerText=`${welcomeMessage} ${storedUsername}`;
        
        cardContainer=document.getElementById("cardContainer");

        loadCards(cardContainer, [
            // Bicicletas
            { title: "Tarmac SL7 Expert", imageSrc: "../Assets/TarmacSL7Comp.jpeg", price: 5963354},
            { title: "Tarmac Sport 2022", imageSrc: "../Assets/TarmacSport22.jpeg", price: 3820404},
            { title: "S-works Tarmac SL7 Pro", imageSrc: "../Assets/TarmacSL7pro.jpeg", price: 15289949},
            { title: "BMC TimeMachine SLR One", imageSrc: "../Assets/BMCSLROne.jpeg", price:7822395 },
            { title: "BMC TimeMachine SLR 01 LTD", imageSrc: "../Assets/BMCSLR01.jpeg", price:14608906 },
            { title: "BMC TimeMachine 01 Disc TWO", imageSrc: "../Assets/BMCTT.jpeg", price: 7822395},
            { title: "BMC TimeMachine SLR 01 TWO", imageSrc: "../Assets/BMCSLR01Two.jpeg", price:13006535 },
            // Cascos
            { title: "S-Works Prevail 3", imageSrc: "../Assets/Prevail3.jpeg", price:330563 },
            { title: "S-Works Evade 3", imageSrc: "../Assets/Evade3.jpeg", price:330563 },
            { title: "S-Works Propero III", imageSrc: "../Assets/Propero3.jpeg", price:112306 },
            { title: "Giro Aerohead Mips", imageSrc: "../Assets/AeroHead.jpeg", price:454410 },
            { title: "Giro Aether Spherical", imageSrc: "../Assets/Aether.jpeg", price:444510 },
            { title: "Giro Helios Spherical", imageSrc: "../Assets/Helios.jpeg", price:375209 },
            { title: "Bontrager Velocis", imageSrc: "../Assets/Velocis.jpeg", price:210481 },
            { title: "Bontrager Specter", imageSrc: "../Assets/Specter.jpeg", price:210481 },
        ]);
    }
    let addProductButton=document.getElementById('addProductButton');
    if(addProductButton){
        addProductButton.addEventListener('click', addProduct);
    }
    let storedCardData=localStorage.getItem("cardData");
    if(storedCardData){
        cardData = JSON.parse(storedCardData);
        loadCards(cardContainer, cardData)
    }
    let cartIcon=document.getElementById('cartIcon');
    let cart=document.getElementById('cart');

    cartIcon.addEventListener('click', function(){
        
        cart.style.display = (cart.style.display === 'none' || cart.style.display === '') ? 'block' : 'none';
    });
});


function logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    
    window.location.href="index.html";
}

function loadCards(container, cardData){
    for(let i=0; i < cardData.length; i++){
        let card=document.createElement("div");
        card.classList.add("card");


        let title=document.createElement("h2");
        title.innerText=cardData[i].title;

        let image=document.createElement("img");
        image.src=cardData[i].imageSrc;

        let price=document.createElement('p');
        price.innerText=`$${cardData[i].price.toFixed(2)}`;

        let addToCardButton = document.createElement("button");
        addToCardButton.innerText = "Agregar al Carrito";
        addToCardButton.addEventListener("click", function () {
            addToCard(cardData[i], cardData[i].price);
        });

        card.appendChild(title);
        card.appendChild(image);
        card.appendChild(price);
        card.appendChild(addToCardButton);

        container.appendChild(card);
    }
}
function addToCard(product, price) {
    console.log("Producto Agregado al carrito", product.title);
    let existingProduct = cardData.find(p => p.title === product.title);
    
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cardData.push({
            title: product.title,
            imageSrc: product.imageSrc,
            quantity: 1,
            price: price,
        });
    }
    updateCartUI();
}

function updateCartUI(){
    let cartItemsContainer=document.getElementById('cartItems');
    let cartTotalElement=document.getElementById('cartTotal');
    let total= 0;

    cartItemsContainer.innerHTML= '';

    cardData.forEach(product =>{
        let cartItem=document.createElement('li');

        if (product.imageSrc) {
            let productImage=document.createElement('img');
            productImage.src=product.imageSrc;
            productImage.alt=product.title;
            cartItem.appendChild(productImage);
        }

        let productName=document.createElement('span');
        let productPrice=document.createElement('span');
        
        productName.innerText=product.title;
        productPrice.innerText= `- Precio: $${product.price.toFixed(2)}`;
        
        cartItem.appendChild(productName);
        cartItem.appendChild(productPrice);

        cartItem.innerText += ` - Cantidad: ${product.quantity}`;
        cartItemsContainer.appendChild(cartItem);

        total += product.price * product.quantity;
    });
    cartTotalElement.innerText=total.toFixed(2);
}

function checkout(){
    alert('Compra realizada con éxito');

    cardData= [];
    updateCartUI();
    document.getElementById('cart').style.display= 'none';
}




