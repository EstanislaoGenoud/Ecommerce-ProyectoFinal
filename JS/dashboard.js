const welcomeMessage='Bienvenido'
const modal= new bootstrap.Modal('#modalCarrito', {});
const btnModalCarrito= document.querySelector('#btnModalCarrito');
const cartCount=document.querySelector('#cartCount');
const listProducts=document.querySelector('#listProducts');
const modalListProducts=document.querySelector('#modalListProducts');
const btnClose=document.querySelector('#btnClose');
const btnGuardar=document.querySelector('#btnGuardar');
const btnOrder=document.querySelector('#btnOrder');
const selectCategory=document.querySelector('#selectCategory');

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
    }
});

function logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("password");

    window.location.href="index.html";
}
btnModalCarrito.addEventListener('click', function(){
    modal.show();
});

btnClose.addEventListener('click', ()=>{
    modal.hide();
});

const renderProducts=(list)=>{
    listProducts.innerHTML='';
    list.forEach(product => {
        listProducts.innerHTML += //html
        `<div class="card-per">
        <h2>${product.title}</h2>
        <img src="${product.imageSrc}" alt="${product.title}">
        <p>$ ${product.price}</p>
        <button class="btn-per"><i class="fa-solid fa-cart-shopping"></i>Agregar</button>
        </div>`
    });

}
renderProducts(products);