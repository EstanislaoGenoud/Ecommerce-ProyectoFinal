const welcomeMessage='Bienvenido'
const modal= new bootstrap.Modal('#modalCarrito', {});
const btnModalCarrito= document.querySelector('#btnModalCarrito');
const btnClose=document.querySelector('#btnClose');
const btnLogout=document.querySelector('#btnLogout');
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
const mostrarError =(texto)=>{
    Swal.fire({
        title: "Upps",
        text: texto,
        icon: "error",
        confirmButtonText: 'Aceptar'
    });
}
fetch ('JS/data.JSON')
    .then(response => response.json())
    .then(data =>{
        const products = data.products;
        const categories = data.category;

        cartCount.innerText=cart.getCount();
        
        function logout(){
            localStorage.removeItem("username");
            localStorage.removeItem("password");
            window.location.href="index.html";
        }
        btnLogout.addEventListener('click' , ()=>{
            logout()
        });
        btnModalCarrito.addEventListener('click', function(){
            const list=cart.getProducts();
            renderCart(list);
            cartSum.innerText = formatPrice(cart.getSum());
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
        selectCategory.addEventListener('change', (e)=>{
            const category = selectCategory.value;
            console.log('Categoría', category);
            if(category=== '-'){
                renderProducts(products);
            }else{
                filtroCategories(category);
            }
        });
        function formatPrice(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
        const filtroCategories= (id_category)=>{
            const newList= products.filter( ( product)=> product.id_category == id_category);
            renderProducts(newList);
            
        }
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
        
        const renderCategories = (listCategory) => {
            selectCategory.innerHTML = '<option>-</option>';
            listCategory.forEach(category => {
                selectCategory.innerHTML += `<option value="${category.id}">${category.name}</option>`;
            });
        }
        const renderProducts = (list) => {
            listProducts.innerHTML = '';
            list.forEach(product => {
                const formattedPrice = formatPrice(product.price); // Define formattedPrice aquí
                listProducts.innerHTML += //html
                    `<div class="card-per ${product.img}">
                        <h2>${product.title}</h2>
                        <img src="${product.imageSrc}" alt="${product.title}" id="${product.img}" class="img-responsive">
                        <div class="card-details">
                            <p>$ ${formattedPrice}</p>
                        </div>
                        <div class="btn-container">
                            <button id="${product.id}" class="btn-per btnAddCart">Agregar</button>
                        </div>
                    </div>`;
            });
            const btns = document.querySelectorAll('.btnAddCart');
            btns.forEach(btn => {
                btn.addEventListener('click', addToCart);
            });
        }
        
        const renderCart=(list)=>{
            modalListProducts.innerHTML='';
            list.forEach(product =>{
                const formattedPrice = formatPrice(product.price);
                const totalPrice = formatPrice(product.price * product.quantity);
                modalListProducts.innerHTML += //html
                `<tr>
                    <td><img src="${product.imageSrc}" alt="${product.title}"style="width: 50px;" /></td>
                    <td>${product.title}</td>
                    <td>${product.quantity}</td>
                    <td>$ ${formattedPrice}</td>
                    <td>$ ${totalPrice}</td>
                </tr>`
                
            });
            

        }
        renderCategories(categories);

        renderProducts(products);
    })
    .catch(error => {
        mostrarError("Error al cargar los datos: " + error.message);
    });