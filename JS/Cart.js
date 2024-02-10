function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

class Cart{
    constructor(list= []){
        this.cart=list;
        
    }



    addToCart({id, imageSrc, title, price}){
        console.log('addToCart se ha llamado correctamente.');
        const index=this.cart.findIndex(product =>product.id == id);
        if(index == -1){
        this.cart.push({id, title, imageSrc, price, quantity: 1});

        }else{
            console.log('ya esta en el carrito e incremento la cantidad');
            this.cart[index].quantity += 1;
        }

        localStorage.setItem('Cart', JSON.stringify(this.cart));
        cartCount.innerText = this.getCount();
        cartSum.innerText = formatPrice(this.getSum());
        Toastify({
            close: true,
            text: "Producto Agregado",
            gravity: 'bottom',
            duration: 3000,
            style: {
                background: "linear-gradient(to right, #076186, #09AAEC)",
            },
        }).showToast();
    }


    getProducts(){
        return this.cart;
    }

    getCount(){
        const count=this.cart.reduce((cant, product) =>{return cant + product.quantity}, 0)
        return count;
    }

    getSum(){
        const sum=this.cart.reduce((acum, product) =>{return acum + (product.quantity * product.price)}, 0)
        return sum;
    }
}