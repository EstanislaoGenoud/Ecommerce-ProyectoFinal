document.addEventListener('DOMContentLoaded', function(){
    let storedCardData=localStorage.getItem('cardData');

    if(storedCardData){
        cardData= JSON.parse(storedCardData);
        updateCartUI();
    }
})
function mostrarModal(){
    let modal=document.getElementById('modal');
    modal.style.height='150px';
    modal.style.height = "150px";
    modal.style.display='block';

    limpiarCarrito();
}
function limpiarCarrito(){
    let cartItemsContainer=document.getElementById('cartItemsContainer');
    cartItemsContainer.innerHTML='';
    actualizarTotal();
}
function actualizarTotal(){
    let cartTotal=document.getElementById('cartTotal');
    cartTotal.textContent='0'
}

function cerrarModal(){
    let modal=document.getElementById('modal');
    modal.style.height='0'
    modal.style.display='none';
}
document.querySelector('.btn-comprar').addEventListener('click', function(){
    mostrarModal();
})