
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const button = document.getElementById('button');


button.addEventListener('click', (e)=> {
    e.preventDefault()
    const data = {
        username: username.value,
        password: password.value
    }
    
    
})

function authenticate(){
    const usernameValue= document.getElementById('username').value;
    const passwordValue= document.getElementById('password').value;

    localStorage.setItem("username", usernameValue);
    window.location.href="dashboard.html";

    
}





