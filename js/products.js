const contenedorProductos = document.querySelector('.acaEstoy');
let id = localStorage.getItem('catID');
const API_PRODUCTO = `https://japceibal.github.io/emercado-api/cats_products/${id}.json`;
const az = document.querySelector('#sortAsc');
const za = document.querySelector('#sortDesc');
const ordenarCantidad = document.querySelector('#sortByCount');
let minCount = undefined;
let maxCount = undefined;


const usuarioEmail = localStorage.getItem("email");
const liUsuario = document.querySelector("#usuarioEmail");
liUsuario.innerHTML = usuarioEmail;

liUsuario.addEventListener('click', () =>{
    document.querySelector('.menu').classList.toggle('hidden');
})

document.querySelector('.cerrarSesion').addEventListener('click', () =>{
    localStorage.clear();
    location.replace('/')
})


async function sortProductos  (criteria, array){
    let result = [];
    if (criteria === null){
        result = array;
    }else if (criteria === 'az')
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === 'za'){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === 'cantidad'){
        result = array.sort(function(a, b) {
            let asoldCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( asoldCount > bCount ){ return -1; }
            if ( asoldCount < bCount ){ return 1; }
            return 0;
        });
    }
    mostrarProductos(result);
    return result;
}

const setproductID = (id) => {
    localStorage.setItem('productID',id);
    window.location = 'product-info.html';
}


const mostrarProductos = (array) => {
    
    console.log(array[0]);
    let htmlProductos = '';


    array.forEach(producto => {

        if((minCount === undefined || producto.soldCount >= minCount) && (maxCount === undefined || producto.soldCount <= maxCount)){
        console.log(producto.id);
        htmlProductos += `
        <div onclick="setproductID(${producto.id})" class="list-group-item list-group-item-action cursor-active">
        <div class="row">
        <div class="col-3">
        <img src="${producto.image}" alt="${producto.description}" class="img-thumbnail">
        </div>
        <div class="col">
        <div class="d-flex w-100 justify-content-between">
        <h4 class="mb-1">${producto.name}</h4>
        <small class="text-muted">${producto.soldCount} artículos</small>
        </div>
        <p class="mb-1">${producto.description}</p>
        </div>
        </div>
        </div>
        `
        }
    });
    contenedorProductos.innerHTML = htmlProductos;
}




document.addEventListener("DOMContentLoaded", function(e){

    const getJSONData = async (url) => {
        const result = {};
        try {
            const response = await fetch(url);
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
    }


    const promesaSort = async () => {
        sortProductos(null, (await getJSONData(API_PRODUCTO)).data.products);
    };

    promesaSort();


    az.addEventListener('click', async () =>{
        sortProductos('az',(await getJSONData(API_PRODUCTO)).data.products);
    });

    za.addEventListener('click', async () =>{
        sortProductos('za',(await getJSONData(API_PRODUCTO)).data.products);
    });

    ordenarCantidad.addEventListener('click', async () =>{
        sortProductos('cantidad',(await getJSONData(API_PRODUCTO)).data.products);
    });



    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
        minCount = undefined;
        maxCount = undefined;
        promesaSort();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){

        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }
        promesaSort();
    });

});
