const welcomeMessage='Bienvenido'
const modal= new bootstrap.Modal('#modalCarrito', {});
const btnModalCarrito= document.querySelector('#btnModalCarrito');
const btnClose=document.querySelector('#btnClose');
const btnGuardar=document.querySelector('#btnGuardar');
const btnOrder=document.querySelector('#btnOrder');
const btnOrderMayor=document.querySelector('#btnOrderMayor');
const btnRemoveProductElements=document.querySelectorAll('.btnRemoveProduct');
const cartCount=document.querySelector('#cartCount');
const cartSum=document.querySelector('#cartSum');
const listProducts=document.querySelector('#listProducts');
const modalListProducts=document.querySelector('#modalListProducts');
const selectCategory=document.querySelector('#selectCategory');
const listCart= JSON.parse(localStorage.getItem('cart')) || [];
const cart= new Cart(listCart);

fetch ('js/data.json')
    .then(response => response.json())
    .then(data =>{
        const products = data.products;
        const categories = data.category;

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
        const mostrarError =(texto)=>{
            Swal.fire({
                title: "Upps",
                text: texto,
                icon: "error",
                confirmButtonText: 'Aceptar'
            });
        }
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
        btnGuardar.addEventListener('click', ()=>{
            Swal.fire({
                title: "Compra Realizada con éxito!",
                text: "",
                icon: "success"
            });
            cart.cart=[];
            localStorage.setItem('Cart', JSON.stringify(cart.cart));
            renderCart(cart.getProducts());
            cartCount.innerText= cart.getCount();
            modal.hide();
        })
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
            
        });
        btnOrderMayor.addEventListener('click', ()=>{
            products.sort((a,b) =>{
                if(a.price < b.price){
                    return 1
                }
                if(a.price > b.price){
                    return -1
                }
                return 0
            });
            renderProducts(products);
            
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
            });
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
                    <td><button class="btnRemoveProduct" data-id="${product.id}"><i class="ri-delete-bin-6-line"></i></button></td>
                </tr>`
            });
            btnRemoveProductElements.forEach(btn=>{
                btn.addEventListener('click', function(){
                    const productId= this.getAttribute('data-id');
                    const removed= cart.removeProductByID(productId);
                    if(removed){
                        renderCart(cart.getProducts());
                    }
                })
            })

        }
        renderProducts(products);
    })
    .catch(error =>{
        mostrarError();



    });

