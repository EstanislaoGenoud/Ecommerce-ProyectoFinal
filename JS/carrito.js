document.addEventListener('DOMContentLoaded', function(){
    let storedCardData=localStorage.getItem('cardData');

    if(storedCardData){
        cardData= JSON.parse(storedCardData);
        updateCartUI();
    }
})