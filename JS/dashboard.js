const welcomeMessage='Bienvenido'
const modal= new bootstrap.Modal('#modalCarrito', {});
const btnModalCarrito= document.querySelector('#btnModalCarrito');
const cartCount=document.querySelector('#cartCount');
const listProducts=document.querySelector('#listProducts');
const modalListProducts=document.querySelector('#modalListProducts');
const btnClose=document.querySelector('#btnClose');
const btnGuardar=document.querySelector('#btnGuardar');

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

const renderProducts=()=>{
    
}