const welcomeMessage='Bienvenido'
const modal= new bootstrap.Modal('#modalCarrito', {});
const btnModalCarrito= document.querySelector('#btnModalCarrito');
const cartCount=document.querySelector('#cartCount');
const cartSum=document.querySelector('#cartSum');
const listProducts=document.querySelector('#listProducts');
const modalListProducts=document.querySelector('#modalListProducts');
const btnClose=document.querySelector('#btnClose');
const btnGuardar=document.querySelector('#btnGuardar');
const btnOrder=document.querySelector('#btnOrder');
const selectCategory=document.querySelector('#selectCategory');
const listCart= JSON.parse(localStorage.getItem('cart')) || [];
const cart= new Cart(listCart);



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
cartCount.innerText=cart.getCount();




function logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("password");

    window.location.href="index.html";
}
btnModalCarrito.addEventListener('click', function(){
    const list=cart.getProducts();
    renderCart(list);

    cartSum.innerText=cart.getSum();
    modal.show();

});

btnClose.addEventListener('click', ()=>{
    modal.hide();
});


const addToCart = (e) =>{
    const id= e.target.id;
    const product= products.find(item => item.id == id);
    
    console.table(product);
    cart.addToCart(product);
    cartCount.innerText= cart.getCount();
}
btnOrder.addEventListener('click',()=>{
    products.sort((a,b) =>{
        if(a.price < b.price){
            return -1
        }
        if(a.price > b.price){
            return 1
        }
        return 0
    })
    renderProducts(products)
    btnOrder.setAttribute('disabled', true)
});


const renderProducts=(list)=>{
    listProducts.innerHTML='';
    list.forEach(product => {
        listProducts.innerHTML += //html
        `<div class="card-per">
        <h2>${product.title}</h2>
        <img src="${product.imageSrc}" alt="${product.title}">
        <p>$ ${product.price}</p>
        <button id="${product.id}" class="btn-per btnAddCart">Agregar</button>
        </div>`
    });
    const btns = document.querySelectorAll('.btnAddCart');
    btns.forEach(btn => {
        btn.addEventListener('click', addToCart);
    })
    
}
const renderCart=(list)=>{
    modalListProducts.innerHTML='';
    list.forEach(product =>{
        modalListProducts.innerHTML += //html
        `<tr>
            <td><img src="${product.imageSrc}" alt="${product.title}"style="width: 50px;" /></td>
            <td>${product.title}</td>
            <td>${product.quantity}</td>
            <td>${product.price}</td>
            <td>${product.price * product.quantity}</td>

        </tr>`
    });
}
renderProducts(products);
