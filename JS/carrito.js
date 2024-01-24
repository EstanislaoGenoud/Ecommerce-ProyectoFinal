function addProductToCart(productIndex) {
    
    let product = products[productIndex];

    
    addToCart(product, product.price);

    
    localStorage.setItem("cardData", JSON.stringify(cardData));

    updateCartUI();
}