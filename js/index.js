document.addEventListener("DOMContentLoaded", function(){
    
    const liUsuario = document.querySelector("#usuarioEmail");
    const usuarioEmail = localStorage.getItem("email");
    liUsuario.innerHTML = usuarioEmail; 
    
    liUsuario.addEventListener('click', () =>{
        document.querySelector('.menu').classList.toggle('hidden');
    })

    document.querySelector('.cerrarSesion').addEventListener('click', () =>{
        localStorage.clear();
        location.replace('/')
    })

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", usuarioEmail);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", usuarioEmail);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", usuarioEmail);
        window.location = "products.html"
    });
});