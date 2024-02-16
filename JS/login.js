
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

    // if(username==="usuario" && password==="contraseña"){
    //     localStorage.setItem("username", usernameValue);
    //     window.location.href="dashboard.html";
    // }else{
    //     document.getElementById("error-message").innerText="Error de autenticación. Por favor, verifica tu usuario y contraseña.";
    // }
}





