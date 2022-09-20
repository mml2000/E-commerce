let id = localStorage.getItem('productID');
const API_PRODUCTO = `https://japceibal.github.io/emercado-api/products/${id}.json`;
const API_COMENTARIOS = `https://japceibal.github.io/emercado-api/products_comments/${id}.json`
const contenedorDescripcion = document.querySelector('.descripcion');
const productId = localStorage.getItem('productID');
const contenedorComentarios = document.querySelector('#comentariosFalsos');
const formComentarios = document.querySelector('#formComentarios');


const html = (objeto) => {

    let producto = objeto.data;
            contenedorDescripcion.innerHTML = `<h1 class='tituloProductoInfo'>${producto.name}</h1>
            <p id='elementoDescripcion'>Precio:</p>
            <span id='apiDescripcion'>${producto.currency} ${producto.cost}</span>
            <p id='elementoDescripcion'>Decripcion:<p>
            <span id='apiDescripcion'>${producto.description}</span>
            <p id='elementoDescripcion'>Categoria:</p>
            <span id='apiDescripcion'>${producto.category}</span>
            <p id='elementoDescripcion'>Cantidad de vendidos:</p>
            <span id='apiDescripcion'>${producto.soldCount}</span>
            <p id='elementoDescripcion'>Imagenes ilustrativas:</p>`
    producto.images.forEach(element => {
        contenedorDescripcion.innerHTML +=`<img id='imagenProductInfo' src=${element}></img>`;
    });
}



const comentarios = (texto,puntos,nombre,momento) =>{

    let estrellas = '';
    
    
    for(let i = 0;i<parseInt(puntos);i++){
        estrellas += `<span class="fa fa-star checked"></span>`
    };


    if(parseInt(puntos) < 5){
        for(let a = 0;a<(5-parseInt(puntos));a++){
            estrellas += `<span class="fa fa-star"></span>`
        };
    };

    if(momento === null){
        let tiempo = new Date();
        momento = tiempo.getFullYear()+'-'+tiempo.getMonth()+'-'+tiempo.getDate()+' '+tiempo.getHours()+':'+tiempo.getMinutes()+':'+tiempo.getSeconds() 
    };
    
    contenedorComentarios.innerHTML += `<div class='comentarioEspecifico'>
    <span><b>${nombre}</b>   ${momento}</span> 
    ${estrellas}
    <p>${texto}</p>
    </div>`
}



document.addEventListener('DOMContentLoaded', e => {


    const getJSONData = async (api) => {
        const result = {};
        try {
            const response = await fetch(api);
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
        comentarios(comentario,valorPuntuacion,usuarioNombre, null);
        formComentarios.reset();
    });


    const mostrarComentariosAnteriores = async () =>{
        let objeto = await getJSONData(API_COMENTARIOS);
        await objeto.data.forEach(element =>{
            comentarios(element.description,element.score,element.user,element.dateTime);
        })
    }

    mostrarComentariosAnteriores();

})