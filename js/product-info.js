let id = localStorage.getItem('catID');
const API_PRODUCTO = `https://japceibal.github.io/emercado-api/cats_products/${id}.json`;
const contenedorDescripcion = document.querySelector('.descripcion');
const productId = localStorage.getItem('productID');
const contenedorComentarios = document.querySelector('#comentariosFalsos');
const formComentarios = document.querySelector('#formComentarios');


const html = (objeto) => {
    let categoria = objeto.data.catName;

    
    objeto.data.products.forEach(element => {
        if ( element.id === parseInt(productId)){
            contenedorDescripcion.innerHTML = `<h1 class='tituloProductoInfo'>${element.name}</h1>
            <p id='serONoSer'>Precio:</p>
            <span id='laCuestion'>${element.currency} ${element.cost}</span>
            <p id='serONoSer'>Decripcion:<p>
            <span id='laCuestion'>${element.description}</span>
            <p id='serONoSer'>Categoria:</p>
            <span id='laCuestion'>${categoria}</span>
            <p id='serONoSer'>Cantidad de vendidos:</p>
            <span id='laCuestion'>${element.soldCount}</span>
            <p id='serONoSer'>Imagenes ilustrativas:</p>
            <img id='imagenProductInfo' src=${element.image}></img>`
        }
    });
}



const comentarios = (texto,puntos,nombre) =>{

    let estrellas = '';
    
    
    for(let i = 0;i<parseInt(puntos);i++){
        estrellas += `<span class="fa fa-star checked"></span>`
    };


    if(parseInt(puntos) < 5){
        for(let a = 0;a<(5-parseInt(puntos));a++){
            estrellas += `<span class="fa fa-star"></span>`
        };
    };

    const tiempo = new Date();

    contenedorComentarios.innerHTML += `<div class='comentarioEspecifico'>
    <span><b>${nombre}</b>  ${tiempo.getFullYear()}-${tiempo.getMonth()}-${tiempo.getDate()} ${tiempo.getHours()}:${tiempo.getMinutes()}:${tiempo.getSeconds()} </span> 
    ${estrellas}
    <p>${texto}</p>
    </div>`
}



document.addEventListener('DOMContentLoaded', e => {


    const getJSONData = async (API_PRODUCTO) => {
        const result = {};
        try {
            const response = await fetch(API_PRODUCTO);
            if (response.ok) {
                result.data = await response.json();
                result.status = "ok";
            } else {
                throw Error(response.statusText);
            }
        }
        catch (error) {
            result.status = 'error';
            result.data = error;
        }
        return result;
    };


    const productoCorecto = async () => {
        html(await getJSONData(API_PRODUCTO));
    };

    productoCorecto();


    formComentarios.addEventListener('submit', (event) =>{
        event.preventDefault();
        let comentario = document.querySelector('#coment').value;
        let valorPuntuacion = document.querySelector('#puntuacion').value;
        let usuarioNombre = localStorage.getItem('email');
        comentarios(comentario,valorPuntuacion,usuarioNombre);
        formComentarios.reset()
    })


})