class Cart{
    constructor(list= []){
        this.cart=list;
        
    }



    addToCart({id, imageSrc, title, price}){
        const index=this.cart.findIndex(product =>product.id == id);
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Agregado al carrito"
        });
        if(index == -1){
        this.cart.push({id, title, imageSrc, price, quantity: 1});

        }else{
            console.log('ya esta en el carrito e incremento la cantidad');
            this.cart[index].quantity += 1;
        }

        localStorage.setItem('Cart', JSON.stringify(this.cart));
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
    removeProductByID(productId){
        const index = this.cart.findIndex(product => product.id == productId);
        if(index !== -1){
            this.cart.splice(index, 1);

            renderCart(this.cart);
            localStorage.setItem('Cart', JSON.stringify(this.cart));
        }else{
            mostrarError('Este producto no existe en el carrito');
        }
    }

}