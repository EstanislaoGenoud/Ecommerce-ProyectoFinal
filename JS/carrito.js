class Cart{
    constructor (list = []){
        console.log('hola desde el constructor')
    }
}
addToCart({id, name, img, price});{
    const index=this.cart.findIndex(product=>product.id==id);
    if (index==-1){
        this.cart.push({id, name, price, units: 1});
    }else{
        this.cart[index].units += 1;
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
}
getProducts();{
    return this.cart;
}
getCount();{
    const count= this.cart.reduce((cant,product) =>{return cant + product.units}, 0);
    return count;
}
getSum();{
    return this.cart.reduce((acum, product) =>{return acum + (product.units * product.price)}, 0);
}

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