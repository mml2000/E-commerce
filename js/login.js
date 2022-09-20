const guardarEmail = () => { 
    const emailUsuario = document.getElementById("email").value;
    window.localStorage.setItem("email",emailUsuario);
}

function verificacion() {
    const password = document.getElementById("contrasenia");
    const email = document.getElementById("email");
    guardarEmail();
    if (password.value.length > 0 && email.value.length > 0){
        window.location = "main.html";
    }else{
        return error();
    }
}

const error = () => {
    alert("Los datos ingresados no son correctos")
}