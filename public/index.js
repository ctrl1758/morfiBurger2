import {ref,db, push, query, getDocs,where,collection} from './firebase.js'
window.addToCart= addToCart;
window.eliminaritem= eliminaritem;
/* window.verifica_seleccion= verifica_seleccion; */
/* window.tildar= tildar; */
/* window.pedir= pedir; */
window.verDetalles= verDetalles;
/* window.modalAtras= modalAtras; */
/* window.saludar= saludar; */
window.addToCartM=addToCartM;
/* window.Agregados=Agregados; */
window.seleccionaAcompañamiento=seleccionaAcompañamiento;
window.seleccionaBebida=seleccionaBebida;
window.bAgregados=bAgregados;
window.irPago=irPago;
window.validar=validar;
window.alMenu=alMenu



// Format the above price dollar currency
let dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    useGrouping: true,
    maximumSignificantDigits: 2
    ,
}); // $148,000

let dollarUS2 = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    useGrouping: true,
}); // $147,741.15

// Create an instance of Notyf
var notyf = new Notyf({position: {
    x: 'right',
    y: 'top',
    }});

let carrito=[]
let i = true

let total= 0
const divhora =document.querySelector('.hora')
/* const menu=document.querySelector('.menu') */
const hero=document.querySelector('.hero-container')
const heroC=document.querySelector('.hero-content')
const spiner=document.getElementById('spiner')
const spinerP=document.getElementById('spinerP')
/* const tradicionales =document.querySelector('.tradicionales')
const especiales =document.querySelector('.especiales')
const super_especiales =document.querySelector('.super-especiales')
const rellenas_calzones =document.querySelector('.rellenas')
const menu_vegan =document.querySelector('.vegan') */

const tradicionales =document.getElementById('flush-hamburguesas')
const especiales =document.getElementById('flush-papas-fritas')
const super_especiales =document.getElementById('flush-ensaladas')
const rellenas_calzones =document.getElementById('flush-aros')
const menu_vegan =document.getElementById('flush-nuggets')
const postres_helados =document.getElementById('flush-p-h')

const divcategorias =document.querySelector('.menu')
const divlista =document.querySelector('.lista')
const divcarrito =document.querySelector('.carrito')
const divbadge=document.querySelector('.badge')
const divtotal =document.querySelector('.total')
const carritoicon =document.querySelector('.carritoicon')
const tcategoria =document.querySelector('.tcategoria')
/* const logo =document.querySelector('.navbar-brand') */
const navegacioncenter =document.querySelector('.navegacion-center')

const newitemcarrito= document.querySelector('.newiteamcarrito')
const input_hora= document.getElementById('myPicker')

const pay_button= document.querySelector('.pay-button')

let buzzed=document.getElementById('efecto')

/* tradicionales.addEventListener('click',() => obtenerLista("Tradicionales"));
especiales.addEventListener('click',() => obtenerLista("Especiales"));
super_especiales.addEventListener('click',() => obtenerLista("Super Especiales"));
rellenas_calzones.addEventListener('click',() => obtenerLista("Rellenas"));
menu_vegan.addEventListener('click',() => obtenerLista("Vegan")); */

document.getElementById("btn-hamburguesas").addEventListener("click", function() {
    const flush_tradicionales =document.getElementById('flush-hamburguesas')
    if(flush_tradicionales.classList.contains('show')){
        flush_tradicionales.classList.remove('show')
    }else{
        flush_tradicionales.classList.add('show')
    }
})
document.getElementById("btn-papas-fritas").addEventListener("click", function() {
    const flush_especiales =document.getElementById('flush-papas-fritas')
    if(flush_especiales.classList.contains('show')){
        flush_especiales.classList.remove('show')
    }else{
        flush_especiales.classList.add('show')
    }
})
document.getElementById("btn-ensaladas").addEventListener("click", function() {
    const flush_sespeciales =document.getElementById('flush-ensaladas')
    if(flush_sespeciales.classList.contains('show')){
        flush_sespeciales.classList.remove('show')
    }else{
        flush_sespeciales.classList.add('show')
    }
})
document.getElementById("btn-aros").addEventListener("click", function() {
    const flush_rellenas =document.getElementById('flush-aros')
    if(flush_rellenas.classList.contains('show')){
        flush_rellenas.classList.remove('show')
    }else{
        flush_rellenas.classList.add('show')
    }
})
document.getElementById("btn-nuggets").addEventListener("click", function() {
    const flush_vegan =document.getElementById('flush-nuggets')
    if(flush_vegan.classList.contains('show')){
        flush_vegan.classList.remove('show')
    }else{
        flush_vegan.classList.add('show')
    }
})
/* logo.addEventListener('click', () => {
    divlista.style.display = 'none';
    divcarrito.style.display = 'none';
    divhora.style.display='none';
    if (carrito.length>0){
        carritoicon.style.display='block';
        divbadge.style.display='block';
    }
    divcategorias.style.display = 'flex';
    logotitle.style.display = 'block';
}); */

/* const atras =document.querySelector('.atras')
atras.addEventListener('click', () => {
    navegacioncenter.style.display = 'none';
    divlista.style.display = 'none';
    divcarrito.style.display = 'none';
    divhora.style.display='none';
    if (carrito.length>0){
        navegacioncenter.style.display = 'flex';
        carritoicon.style.display='block';
        divbadge.style.display='block';
    }
    divcategorias.style.display = 'block';
}); */

/* const closeAgregados =document.getElementById('btn-close-agregados')
closeAgregados.addEventListener('click', () => {
    navegacioncenter.style.display = 'none';
    divlista.style.display = 'none';
    divcarrito.style.display = 'none';
    divhora.style.display='none';
    if (carrito.length>0){
        navegacioncenter.style.display = 'flex';
        carritoicon.style.display='block';
        divbadge.style.display='block';
    }

    divcategorias.style.display = 'block';
}); */
function alMenu(){
    navegacioncenter.style.display = 'none';
    divlista.style.display = 'none';
    divcarrito.style.display = 'none';
    divhora.style.display='none';
    if (carrito.length>0){
        navegacioncenter.style.display = 'flex';
        carritoicon.style.display='block';
        divbadge.style.display='block';
    }
    /* logotitle.style.display = 'flex'; */
    divcategorias.style.display = 'block';
    $('body, html').animate({
        scrollTop: '0px'
    }, 300);
}
const almenu =document.querySelector('.almenu')
almenu.addEventListener('click', () => {
    console.log('e')
    navegacioncenter.style.display = 'none';
    divlista.style.display = 'none';
    divcarrito.style.display = 'none';
    divhora.style.display='none';
    if (carrito.length>0){
        navegacioncenter.style.display = 'flex';
        carritoicon.style.display='block';
        divbadge.style.display='block';
    }
    /* logotitle.style.display = 'flex'; */
    divcategorias.style.display = 'block';
    
});

const alcarrito =document.querySelector('.alcarrito')
alcarrito.addEventListener('click', () => {
    console.log("hola")
    navegacioncenter.style.display = 'none';
    divlista.style.display = 'none';
    divcarrito.style.display = 'block';
    divhora.style.display='none';
});

const agregados= document.getElementById('detalles')
const todo_menu= document.getElementById('menu')

function bAgregados()
{
    console.log('hey')
    agregados.style.display='none'
    todo_menu.style.display='block'
}
function verDetalles(precio,nombre,descripcion,categoria,img){
    window.scrollTo({  top: 0, behavior: 'smooth' });
    
    buzzed.classList.remove("temblor")
    carritoicon.style.display='none';
    todo_menu.style.display='none'
    agregados.style.display='block'
    /* const isVisible = "is-visible";
    modal_detalle.classList.add(isVisible) */
    let detalles=`
    <div class="card-header">
        <div class="close-btn" style="
        display: flex;
        justify-content: flex-end;">
            <button type="button" class="btn-close " aria-label="Close" id="btn-close-agregados" onclick="bAgregados()" style="padding: 30px 30px;
            position: absolute;"></button>
        </div>
        
            <img src="${img}" alt="">
        </div>
        <div class="card-body-detalle">
            <span class="tag tag-purple">${categoria}</span>
            <div class="" style="    display: flex;
            flex-direction: row;
            width: 100%;
            justify-content: space-between;
            align-items: center;">
                <h4>
                ${nombre}
                </h4>
                <h4 id="precioprev" style="color: black;
                border: solid;
                padding-right: 20px;
                padding-left: 20px;">
                ${dollarUS2.format(precio)}
                </h4>
            </div>
            <p >
            ${descripcion}
            </p>
        </div>
        <div id="aclaraciones">
        </div>
        <div class="list-agregados" style=" border-top: 1px solid #dee2e6; margin-bottom: 85px;">
            <div class="form-floating mb-3" style="width: 100%;display: flex;justify-content: space-around;">
                <input type="text" class="form-control aclaracion" id="floatingInput " placeholder="aclaracion sobre el pedido" style="border: solid;
                border-color: #b5b5b5;width: 90%;">
                <label for="floatingInput">¿Algo que quieras aclarar sobre el pedido?</label>
            </div>
        </div>
        <div class="container-button-action">
        <div class="button-action" onclick="addToCartM('${nombre}')">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-basket-fill" viewBox="0 0 16 16">
  <path d="M5.071 1.243a.5.5 0 0 1 .858.514L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 6h1.717L5.07 1.243zM3.5 10.5a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3z"/>
</svg>
<span>Agregar a mi pedido</span>
<span id="button-total">${dollarUS2.format(precio)}</span>
        </div>
        </div>
        `
        let detalles_completo=`
        <div class="list-agregados" style=" border-top: 1px solid #dee2e6;">
            <h4>SELECCIONA EL ACOMPAÑAMIENTO</h4>
            <div class="agregg " id="acompañamiento">
                

            </div>
        </div>
        
        <div class="list-agregados" style=" border-top: 1px solid #dee2e6;">
            <h4>¿SUMAS BEBIDA?</h4>
            <div class="agregg" id="bebidas">
                
            </div>
            
        </div>
        <div class="list-agregados" style=" border-top: 1px solid #dee2e6;">
            <h4>¿LLEVAS ALGO MAS?</h4>
            <div class="agregg" id="comida">
                
            </div>
            
        </div>
        <div class="list-agregados" style=" border-top: 1px solid #dee2e6;">
            <h4>¿PROBASTE NUESTROS POSTRES?</h4>
            <div class="agregg" id="postres-helados">
                
            </div>
        </div>

        
    `
        agregados.innerHTML=detalles
        const aclaraciones= document.getElementById('aclaraciones')
        if (categoria=='hamburguesas'){
            let agregado_acompañamiento=armarAcompañamiento(precio)
            let agregado_bebidas=armarBebidas(precio)
            let agregado_postres=armarPostres(precio)
            aclaraciones.innerHTML=detalles_completo
            const acompañamiento= document.getElementById('acompañamiento')
            const bebidas= document.getElementById('bebidas')
            const postres= document.getElementById('postres-helados')
            acompañamiento.innerHTML=agregado_acompañamiento
            bebidas.innerHTML=agregado_bebidas
            postres.innerHTML=agregado_postres
        }else{
            
            let agregado_bebidas=armarBebidas(precio)
            let agregado_postres=armarPostres(precio)
            aclaraciones.innerHTML=detalles_completo
            
            const bebidas= document.getElementById('bebidas')
            const postres= document.getElementById('postres-helados')
            
            bebidas.innerHTML=agregado_bebidas
            postres.innerHTML=agregado_postres
        }
        $('.agregg').slick({
            arrows:false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: false
            }
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
            },
            {
            breakpoint: 480,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
        });
}


function armarAcompañamiento(precio){
    
    let detalles_completo=``
    for (let i=0; i < pizzas.length;i++){
        if (pizzas[i].categoria=='acompañamiento'){
            if(pizzas[i].nombre=='papas fritas'){
                let detalles_item=`
                <div>
                    <input type="radio"id="${pizzas[i].nombre}"class="input-agrega" checked>
                    <label for=""class="label-detalle-agregados select-item-ag" onclick="seleccionaAcompañamiento('${pizzas[i].nombre}','${pizzas[i].categoria}','${precio}')" name="${pizzas[i].nombre}">
                        <img src="${pizzas[i].imagen}" class="item-img" alt="...">
                    <span>${pizzas[i].nombre}</span>
                    <span>${dollarUS2.format(pizzas[i].precio)}</span>
                    </label>
                    
                </div>
            `
            detalles_completo+=detalles_item
            }else{
                let detalles_item=`
                <div>
                    <input type="radio"id="${pizzas[i].nombre}"class="input-agrega" >
                    <label for=""class="label-detalle-agregados" onclick="seleccionaAcompañamiento('${pizzas[i].nombre}','${pizzas[i].categoria}','${precio}')" name="${pizzas[i].nombre}">
                        <img src="${pizzas[i].imagen}" class="item-img" alt="...">
                    <span>${pizzas[i].nombre}</span>
                    <span>${dollarUS2.format(pizzas[i].precio)}</span>
                    </label>
                    
                </div>
            `
            detalles_completo+=detalles_item
            }
            
        }
    }
    return detalles_completo
}

function armarBebidas(precio){
    let detalles_completo=``
    for (let i=0; i < pizzas.length;i++){
        if (pizzas[i].categoria=='bebidas'){
            let detalles_item=`
                <div>
                    <input type="radio"id="${pizzas[i].nombre}"class="input-agrega" >
                    <label for=""class="label-detalle-agregados" onclick="seleccionaBebida('${pizzas[i].nombre}','${pizzas[i].categoria}','${precio}')" name="${pizzas[i].nombre}">
                        <img src="${pizzas[i].imagen}" class="item-img" alt="...">
                    <span>${pizzas[i].nombre}</span>
                    <span>${dollarUS2.format(pizzas[i].precio)}</span>
                    </label>
                    
                </div>
            `
            detalles_completo+=detalles_item
        }
    }
    return detalles_completo
}

function armarPostres(precio){
    let detalles_completo=``
    for (let i=0; i < pizzas.length;i++){
        if (pizzas[i].categoria=='postres-helados'){
            let detalles_item=`
                <div>
                    <input type="radio"id="${pizzas[i].nombre}"class="input-agrega" >
                    <label for=""class="label-detalle-agregados" onclick="seleccionaBebida('${pizzas[i].nombre}','${pizzas[i].categoria}','${precio}')" name="${pizzas[i].nombre}">
                        <img src="${pizzas[i].imagen}" class="item-img" alt="...">
                    <span>${pizzas[i].nombre}</span>
                    <span>${dollarUS2.format(pizzas[i].precio)}</span>
                    </label>
                    
                </div>
            `
            detalles_completo+=detalles_item
        }
    }
    return detalles_completo
}




function addToCartM(nombre){
    let acompañamiento='no'
    let bebidas='no'
    let comidas='no'
    let postres_helados='no'
    const container_acompañamiento = document.querySelector(`#acompañamiento`);
    const container_bebidas = document.querySelector(`#bebidas`);
    const container_comida= document.querySelector(`#comida`);
    const container_helados = document.querySelector(`#postres-helados`);
    container_acompañamiento.querySelectorAll('input').forEach(function(checkElement) {
        if (checkElement.checked){
            acompañamiento= checkElement.id
        }
    });
    container_bebidas.querySelectorAll('input').forEach(function(checkElement) {
        if (checkElement.checked){
            bebidas= checkElement.id
        }
    });
    
    container_comida.querySelectorAll('input').forEach(function(checkElement) {
        if (checkElement.checked){
            comidas= checkElement.id
        }
    });
    container_helados.querySelectorAll('input').forEach(function(checkElement) {
        if (checkElement.checked){
            postres_helados= checkElement.id
        }
    });
    document.querySelector("#detalles").style.display='none'
    let detalle_agregados={
        "acompañamiento":acompañamiento,
        "bebidas":bebidas,
        "comida":comidas,
        "postres_helados":postres_helados,
    }
    
    addToCart(nombre,detalle_agregados)
}

function addToCart(nombre,detalle_agregados){
    /* let dir= JSON.parse(localStorage.getItem('dir')) */
    /* logotitle.style.display = 'none'; */
    navegacioncenter.style.display = 'flex';
    carritoicon.style.display='block';
    buzzed.classList.add("temblor")
    let aclaracion=document.querySelector(".aclaracion").value
    console.log(aclaracion)
    for (let i=0; i < pizzas.length;i++){
        if(pizzas[i].nombre==nombre){
            
            /* let newItemPedido=pizzas[i] */
            const newItemPedido=Object.assign({},pizzas[i])

            newItemPedido.agregados=detalle_agregados
            newItemPedido.aclaracion=aclaracion
            
            carrito.push(newItemPedido)
            /* console.log("despues carrito: ",carrito) */
            todo_menu.style.display='block'
            divbadge.innerHTML= `${carrito.length}`
            divbadge.style.display='block';
            // Display a success notification
            notyf.success('Se agrego: '+newItemPedido.nombre);
        }
    }
}



carritoicon.addEventListener('click',Carrito)
    function Carrito(){
    /* logotitle.style.display = 'none'; */
    navegacioncenter.style.display = 'none';
    carritoicon.style.display="none";
    console.log(carrito)
    divcategorias.style.display = 'none';
    divlista.style.display = 'none';
    divcarrito.style.display = 'block';
    newitemcarrito.innerHTML = ``;
    total=0
    let preciototal=0
    for (let i=0; i < carrito.length;i++){
        preciototal=sumarTotal(carrito[i].precio,carrito[i].agregados)
        console.log("el totalseria",preciototal)
        const item=`
        <div class="d-flex flex-row justify-content-between align-items-center p-2 mt-4  rounded color">
            <div class="mr-1">
                <img class="rounded" src="${carrito[i].imagen}" width="70">
            </div>
            <div class=" product-details col-5">
                <span class="font-weight-bold" style="text-transform: uppercase;
                color: #e84e4e;">${carrito[i].nombre}</span><br>
                <span class=""style="color: #e84e4e;
                font-size: 0.8rem;
                line-height: 0px;
                font-weight: normal;">${pintarAgregados(i)}</span><br>
                
                
            </div>
            <div class="">
                <h5 style="color:white;    font-size: 1.2rem;" id="p${i}">${dollarUS2.format(sumarSubtotal(i))}</h5>
            </div>
            <div class="d-flex ">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" onclick="eliminaritem('${i}')" style="margin-top: 70px; color:black">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
                </div>
            </div>`
                newitemcarrito.innerHTML += item;
    }
    divtotal.innerHTML= `<h5 >${dollarUS2.format(preciototal)}</h5>`
};

function pintarAgregados(i){
    let html=``
    if (carrito[i].agregados.acompañamiento!='no')
    html+=carrito[i].agregados.acompañamiento+' - '
    if (carrito[i].agregados.bebidas!='no')
    html+=carrito[i].agregados.bebidas+' - '
    if (carrito[i].agregados.comida!='no')
    html+=carrito[i].agregados.comida+' - '
    if (carrito[i].agregados.postres_helados!='no')
    html+=carrito[i].agregados.postres_helados+' - '
    return html
}


function sumarSubtotal(x){
    let subTotal=0
    let agg=carrito[x].agregados
    for (let z=0; z < pizzas.length;z++){
        
    
        if(agg.acompañamiento==pizzas[z].nombre ||
            agg.bebidas==pizzas[z].nombre ||
            agg.comida==pizzas[z].nombre ||
            agg.postres_helados==pizzas[z].nombre
            ){
                console.log('+',pizzas[z].precio)
                subTotal+=pizzas[z].precio
        }
}
subTotal+=carrito[x].precio
return subTotal
}
function sumarTotal(nuevo_monto,agregados){
    let agg=[agregados]
    for (let z=0; z < pizzas.length;z++){
    for (let i=0; i < agg.length;i++){
        if(agg[i].acompañamiento==pizzas[z].nombre ||
            agg[i].bebidas==pizzas[z].nombre ||
            agg[i].comida==pizzas[z].nombre ||
            agg[i].postres_helados==pizzas[z].nombre
            ){
                console.log('+',pizzas[z].precio)
                total+=pizzas[z].precio
        }
        
    }}
    total+=nuevo_monto
    
    return total
}

/* function tildar(index,tipo){
    let consulta= carrito[index].bordes;
    if (consulta == tipo){
        return "checked"
    }
} */

function eliminaritem(index){
    notyf.error('eliminado:'+carrito[index].nombre);
    carrito.splice(index,1)
    /* localStorage.setItem('carrito', JSON.stringify(carrito)) */
    console.log('se elimino el index',index)
    

    if(carrito==0){
        inicio()
    }else{
        Carrito()
    }
    divbadge.innerHTML= `${carrito.length}`
    divbadge.style.display='block';
}






const modal= document.getElementById('modal-carrito')

function inicio(){
    divlista.style.display = 'none';
    divcarrito.style.display = 'none';
    divhora.style.display='none';
    if (carrito.length>0){
        console.log("entre")
        carritoicon.style.display='block';
        divbadge.style.display='block';
    }
    carritoicon.style.display='none';
    divcategorias.style.display = 'block';
    /* logotitle.style.display = 'flex'; */
}

/* document.getElementById("ir-pago").addEventListener("click", function() {
    if (carrito.length>0){
        loading_mp();
        divcarrito.style.display='none';
        carritoicon.style.display='none';
        spinerP.style.display="block"
        setTimeout(loadingPago, 2000);
    }else{
        console.log("no deberias pasar aseleccionar la hora de un pedido  vacio")
    }
    
}) */
function validarNumeroTelefono(numero) {
    // Verificar si el número comienza con "11" y tiene una longitud de diez dígitos
    if (/^11\d{8}$/.test(numero)) {
      return true; // El número es válido
    } else {
      return false; // El número es inválido
    }
  }


function irPago(entrega){
    carrito[0].entrega=false
    carrito[0].sucursal=false
    const isVisible = "is-visible";
    const regex = /^[1-9]\d{9}$/;
    
    //inputs
    let sucu=document.getElementById('select-sucu').value
    let usuario_=document.getElementById('nombre').value
    let numero_=document.getElementById('numero').value
    let usuario=document.getElementsByName('nombre')
    let numero=document.getElementsByName('numero')

    const isValidNumber_ = validarNumeroTelefono(numero_)
    const isValidNumber = validarNumeroTelefono(numero[0].value)

    
    if (carrito.length>0){
        if (entrega=='delivery'){
            if (isValidNumber_){
                if(usuario_!=''){
                    document.querySelector("#modal-map.is-visible").classList.remove(isVisible);
                    let dir= JSON.parse(localStorage.getItem('dir'))
                    carrito[0].entrega=dir
                    carrito[0].telefono=numero_
                    carrito[0].nombre=usuario_
                    loading_mp();
                    divcarrito.style.display='none';
                    carritoicon.style.display='none';
                    spinerP.style.display="block"
                    setTimeout(loadingPago, 2000);
                }else{
                    usuario[0].classList.add('is-invalid');
                    document.getElementById('nombre').classList.add('is-invalid');
                    document.getElementById('noNombre').style.display="block"
                    document.getElementById('noNombre_').style.display="block"
                }
                
            }else{
                document.getElementById('numero').classList.add('is-invalid');
                numero[0].classList.add('is-invalid');
                document.getElementById('noNumero').style.display="block"
            }
            
        }else{
            if(sucu!=''){
                if (isValidNumber){
                    if(usuario[0].value!=''){
                        /* localStorage.removeItem('dir') */
                        document.querySelector("#modal-map.is-visible").classList.remove(isVisible);
                        carrito[0].sucursal=sucu
                        carrito[0].telefono=numero_
                        carrito[0].nombre=usuario_
                        loading_mp();
                        divcarrito.style.display='none';
                        carritoicon.style.display='none';
                        spinerP.style.display="block"
                        setTimeout(loadingPago, 2000);
                    }else{
                        console.log('usuario[0]',usuario[0])
                        usuario[0].classList.add('is-invalid');
                        document.getElementById('nombre').classList.add('is-invalid');
                        document.getElementById('noNombre').style.display="block"
                        document.getElementById('noNombre_').style.display="block"
                    }
                }else{
                    numero[0].classList.add('is-invalid');
                    document.getElementById('numero').classList.add('is-invalid');
                    document.getElementById('invalid-feedback-numero').innerHTML="ingresar un telefono valido, Ej:1160123987."
                }
                
            }else{
                document.getElementById('indicacion-sucu').innerHTML="Completar sucursal."
            }
        }
    }else{
        console.log("no deberias pasar aseleccionar la hora de un pedido  vacio")
    }
}

function loadingPago(){
    divhora.style.display='block';
    spinerP.style.display="none"
}

const mercadopago = new MercadoPago('APP_USR-eba06643-dfe9-4f50-bfa0-76004edb0404', {
    locale: 'es-AR', // The most common are: 'pt-BR', 'es-AR' and 'en-US'
    advancedFraudPrevention: false,
});



let checkout = mercadopago.checkout({
    
    preference: {
        id: "YOUR_PREFERENCE_ID",
    },
});
window.checkout=checkout;
function loading_mp(){
    fetch("/create_preference", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(carrito),
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(preference) {
            createCheckoutButton(preference.id,preference.link,preference.id_orden);
            console.log(preference.link)
            
            divcarrito.style.display='none';
            divhora.style.display='block';
            carritoicon.style.display='none';
            /* $(".carrito").fadeOut(500);
            setTimeout(() => {
                $(".container_payment").show(500).fadeIn();
            }, 500); */
        })
        /* .catch(function() {
            alert("Unexpected error");
            $('#checkout-btn').attr("disabled", false);
        }); */
    };

    async function createCheckoutButton(preferenceId,preferenceLink,ordenID) {
        // Initialize the checkout
        checkout= mercadopago.checkout({
        preference: {
            id: preferenceId
        }/* ,
        render: {
            container: '#pay-mp', // Class name where the payment button will be displayed
            label: 'MercadoPago', // Change the payment button text (optional)
        } */
        });
        let buttonMP= document.getElementById("pay-mp")
        let buttonefe= document.getElementById("pay-ef")
            
            /* let link= `<img src="MP.jpg" onclick="checkout.open()" alt="">` */

            let linkMP= `<a href="${preferenceLink}"><img src="MP.jpg" alt=""></a>`
            let linkEFE=`<img src="eft.jpg" alt=""  onclick="validar('${ordenID}')" >`
            buttonMP.innerHTML=linkMP
            buttonefe.innerHTML=linkEFE
    }




function reporte(orden){
    console.log('desdereporte',orden)
    let pago=orden.metodo_pago
    let hora=orden.fecha_pedido
    let pruebita=`Hola%20este%20es%20el%20pedido%20${orden.id}%0A`
    if(orden.domicilio){
        pruebita+=`con%20envio%20a%20%2A${orden.domicilio.direccion}%2CEntrecalles:%20${orden.domicilio.entrecalles}%2A`
    }else{
        pruebita+=`retira%20en%20sucursal%20%2A${orden.sucursal}%2A`
    }
    pruebita+=`%0AMetodo%20De%20Pago:%20%2A${pago.replace(' ','%20')}%2A
                %0ATurno:%20${hora}
                %0ADetalle%20del%20pedido:${pizzasxbordes(orden)}`
    let enlace=`http://api.whatsapp.com/send?phone=+5491160235647&text=${pruebita}`
    window.location.href =enlace
    const btncompra = document.getElementById('fin');
    btncompra.disabled = false;
    setTimeout(() => btncompra.disabled = false, 1000,);
}

function reporte2(orden){
    let detalle_total=pizzasxbordes2(orden)
    let telefono='54'+orden.telefono
    let variables={
        metodo_pago:orden.metodo_pago,
        hora:orden.fecha_pedido,
        orden_id:orden.id,
        detalle:detalle_total.k,
        total:detalle_total.t,
        entrega:'',
        comprobanteMP:orden.pago_id,
        telefono:telefono,
        template:""
    }
    if(orden.domicilio){
        //aca deberia enviarse el template de "te lo enviamos"
        let direccion=`${orden.domicilio.direccion},Entrecalles:${orden.domicilio.entrecalles}`
        if(orden.metodo_pago=="APP-efectivo"){
            let template="morfiburgerdeliveryefe"
            variables.entrega=direccion
            variables.template=template
            chatBotEfe(variables)
        }else{
            let template="morfiburger2"
            variables.entrega=direccion
            variables.template=template
            chatBotMP(variables)
        }
    }else{
        //aca deberia enviarse el template de "retira por sucursal"
        let sucursal=orden.sucursal
        if(orden.metodo_pago=="APP-efectivo"){
            let template="morfiburgersucuefe"
            variables.entrega=sucursal
            variables.template=template
            chatBotEfe(variables)
        }else{
            let template="morfisucump"
            variables.entrega=sucursal
            variables.template=template
            chatBotMP(variables)
        }
    }
    /* let enlace=`http://api.whatsapp.com/send?phone=+5491160235647&text=${pruebita}`
    window.location.href =enlace */
    
    const btncompra = document.getElementById('fin');
    btncompra.disabled = false;
    setTimeout(() => btncompra.disabled = false, 1000,);
}

function chatBotEfe(va){
    var botId = '102189576189338';
    var phoneNbr = va.telefono;
    var bearerToken = 'EAARwmnWIHUwBAHPcykGPkvRc4CZCy7rWZCnASB9jcRG8DQWD4ZCxRkCgJ5ffkeY1Fm8vC9Nb8AROgycZAThyfWAs9qZAM4IVK6WnLFgxPMG3R1O4TNz7Nr6mGuFZAyZCVFS7zIeo92Nc6t8HwnH6zqZCtWaq6ZBLDem9cpaeSuOvEVryZByWB5g3I6RtAhx8O8ClynYVN7ZBaJnFduvytyZAKGez';
    var url =`https://graph.facebook.com/v16.0/${botId}/messages `
    var data = 
    {
    messaging_product: 'whatsapp',
    to: phoneNbr,
    type: 'template',
    template: {
        name:va.template,
        language:{
            code: 'es_AR' ,
        },
        components:[{
            type: "header",
            parameters: [
            {
                type: "image",
                image: {
                    link: "https://i.postimg.cc/qvYphyP4/logo.jpg"
                }
            }]
        },
        {
            type: "body",
            parameters: [
            {
                type: "text",
                text: `${va.nombre}`
            },
            {
                type: "text",
                text: `${va.orden_id}`
            },
            {
                type: "text",
                text: `${va.entrega}`
            },
            {
                type: "text",
                text: `${va.metodo_pago}`
            },
            {
                type: "text",
                text: 'https://morfi-burger.fly.dev'
            },
            ]
        }]
    },
    };

    var postReq = {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + bearerToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        json: true
    };
    fetch(url, postReq)
    .then(data => {
        return data.json()
    })
    .then(res => {
        console.log(res)
    })
    .catch(error => console.log(error));
}

function chatBotMP(va){
    var botId = '102189576189338';
    var phoneNbr = va.telefono;
    var bearerToken = 'EAARwmnWIHUwBAHPcykGPkvRc4CZCy7rWZCnASB9jcRG8DQWD4ZCxRkCgJ5ffkeY1Fm8vC9Nb8AROgycZAThyfWAs9qZAM4IVK6WnLFgxPMG3R1O4TNz7Nr6mGuFZAyZCVFS7zIeo92Nc6t8HwnH6zqZCtWaq6ZBLDem9cpaeSuOvEVryZByWB5g3I6RtAhx8O8ClynYVN7ZBaJnFduvytyZAKGez';
    var url =`https://graph.facebook.com/v16.0/${botId}/messages `
    var data = 
    {
    messaging_product: 'whatsapp',
    to: phoneNbr,
    type: 'template',
    template: {
        name:va.template,
        language:{
            code: 'es_AR' ,
        },
    components:[
        {
        type: "header",
        parameters: [
            {
                type: "image",
                image: {
                    link: "https://i.postimg.cc/qvYphyP4/logo.jpg"
                }
            }
            ]
        },
        {
        type: "body",
        parameters: [
            {
                type: "text",
                text: `${va.nombre}`
            },
            {
                type: "text",
                text: `${va.orden_id}`
            },
            {
                type: "text",
                text: `${va.entrega}`
            },
            {
                type: "text",
                text: `${va.metodo_pago}`
            },
            {
                type: "text",
                text: `${va.comprobanteMP}`
            },
            {
                type: "text",
                text: 'https://morfi-burger.fly.dev'
            },
        ]
    }]
    },
    };
    var postReq = {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + bearerToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        json: true
    };
    fetch(url, postReq)
    .then(data => {
        return data.json()
    })
    .then(res => {
        console.log(res)
    })
    .catch(error => console.log(error));
}

function pizzasxbordes(orden){
    let k=``
    let t=0
    for (let x=0; x < orden.carrito.length;x++){
        let pizza=orden.carrito[x].nombre.replace(/\s+/g, '%20');
        let agg=[orden.carrito[x].agregados]
        k += `%0A1x%20${pizza}`
        for (let z=0; z < pizzas.length;z++){
            for (let i=0; i < agg.length;i++){
                if(agg[i].acompañamiento==pizzas[z].nombre){
                    console.log('+',pizzas[z].nombre)
                    k+=`%0A%09%2B%20${pizzas[z].nombre.replace(' ', '%20')}`
                    t+=pizzas[z].precio
                }
                if (agg[i].bebidas==pizzas[z].nombre) {
                    k+=`%0A%09%2B%20${pizzas[z].nombre.replace(' ', '%20')}`
                    t+=pizzas[z].precio
                }
                if (agg[i].comida==pizzas[z].nombre){
                    console.log('+',pizzas[z].nombre)
                    k+=`%0A%09%2B%20${pizzas[z].nombre.replace(' ', '%20')}`
                        t+=pizzas[z].precio
                }
                if (agg[i].postres_helados==pizzas[z].nombre){
                    console.log('+',pizzas[z].nombre)
                    k+=`%0A%09%2B%20${pizzas[z].nombre.replace(' ', '%20')}`
                        t+=pizzas[z].precio
                }
            }
        }
        k+=`%0A%09%20${orden.carrito[x].aclaracion.replace(' ', '%20')}`
        t+=orden.carrito[x].precio
    }
    k +=`%0A%2ATOTAL%3A%24${t}%2A`
    return k
}

function pizzasxbordes2(orden){
    let k=``
    let t=0
    for (let x=0; x < orden.carrito.length;x++){
        let pizza=orden.carrito[x].nombre
        let agg=[orden.carrito[x].agregados]
        k += `1x ${pizza}`
        for (let z=0; z < pizzas.length;z++){
            for (let i=0; i < agg.length;i++){
                if(agg[i].acompañamiento==pizzas[z].nombre){
                    console.log('+',pizzas[z].nombre)
                    k+=`+ ${pizzas[z].nombre}`
                    t+=pizzas[z].precio
                }
                if (agg[i].bebidas==pizzas[z].nombre) {
                    k+=`+ ${pizzas[z].nombre}`
                    t+=pizzas[z].precio
                }
                if (agg[i].comida==pizzas[z].nombre){
                    console.log('+',pizzas[z].nombre)
                    k+=`+ ${pizzas[z].nombre}`
                    t+=pizzas[z].precio
                }
                if (agg[i].postres_helados==pizzas[z].nombre){
                    console.log('+',pizzas[z].nombre)
                    k+=`+ ${pizzas[z].nombre}`
                    t+=pizzas[z].precio
                }
            }
        }
        k+=`${orden.carrito[x].aclaracion}`
        t+=orden.carrito[x].precio
    }
    /* k +=`
    *TOTAL:${t}*` */
    console.log({k,t})
    return({k,t})
}


async function validar(orden_id){
    console.log("intentando grabar...")
    await fetch(`/pago_eft?orden_id=${orden_id}`)
        .then(async function(response) {
            if(response.ok){
                let json=await response.json()
                elaborarOrden(json)
                /* fetch(url, postReq)
                .then(data => {
                    return data.json()
                })
                .then(res => {
                    console.log(res)
                })
                .catch(error => console.log(error)); */
            }
        })
}

async function elaborarOrden(orden){
    modalConfirm()
    setTimeout(reporte2, 3000,orden);
}


/* var botId = '102189576189338';
var phoneNbr = '541160235647';
var bearerToken = 'EAARwmnWIHUwBAMyTRXBr8FA1m4wOs0RhtzAPppgB4xGTycI7LZApk2cHIqXXmSr83YZAtBK1BHpZBnXM2ZBpCZBVp0pLQg5iF5FfPFZBo7w20nZAzH9SejQmpy1I1ybtLIrFUMAFyPQFah91MmI3HOlRhEhPUuctnwwCuxnhVAZC6EOYknOryZCzPmTdDn0pWPPckZCbuLR0ZBZCNy69FLHJx77I';

var url =`https://graph.facebook.com/v16.0/${botId}/messages `
var data = 
{
  messaging_product: 'whatsapp',
  to: phoneNbr,
  type: 'template',
  template: {
    name:'morfiburger',
    language:{
        code: 'es_AR' ,
    },

  components:[
    {
    type: "header",
    parameters: [
        {
            type: "image",
            image: {
                link: "https://i.postimg.cc/qvYphyP4/logo.jpg"
            }
        }
        ]
    },
    {
    type: "body",
    parameters: [
        {
            type: "text",
            text: "Nombre"
        },
        {
            type: "text",
            text: "pedidoID"
        },
        {
            type: "text",
            text: "your-text-string"
        },
        {
            type: "text",
            text: "your-text-string"
        },
        {
            type: "text",
            text: "your-text-string"
        },
    ]
  }]
},
}; */

/* var postReq = {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + bearerToken,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data),
  json: true
}; */

/* fetch(url, postReq)
  .then(data => {
    return data.json()
  })
  .then(res => {
    console.log(res)
  })
  .catch(error => console.log(error)); */





const modal_fin= document.getElementById('modal-fin')
function modalConfirm(){
    const isVisible = "is-visible";
    modal_fin.classList.add(isVisible)}




    document.addEventListener("click", e => {
        if (e.target == document.querySelector("#modal-map.is-visible")) {
            const isVisible = "is-visible";
        document.querySelector("#modal-map.is-visible").classList.remove(isVisible);
        /* modalAtras(true) */
        }
    });



    document.getElementById("hero-button").addEventListener("click", function() {
        heroC.style.display="none"
        spiner.style.display="block"
        setTimeout(loading, 2000);
        
    })

    async function loading(){
        console.log(pizzas)
        await cargarPromociones()
        cargarCategorias()
        llenarcarta()
        hero.style.display="none"
        divcategorias.style.display="block"
    }

    const pizzas= [];
    async function init() {
        const q = query(collection(db, "menu")/* , where("capital", "==", true) */);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            pizzas.push(doc.data())
        });
    }

init()



function llenarcarta(){
    for (let i=0; i < pizzas.length;i++){
        let product=`
        <div class="item-padding">
        <div class="item-combo" onclick="verDetalles('${pizzas[i].precio}','${pizzas[i].nombre}','${pizzas[i].descripcion}','${pizzas[i].categoria}','${pizzas[i].imagen}')">
        <div class="item-descripcion  col-9">
            <span class="local-carta-nombre-plato">${pizzas[i].nombre}</span>
            <br>
            <i class="plato-descripcion">
            <div data-name="a49c15d1db" class="descripcion-plato">
                ${pizzas[i].descripcion}
            </div>
            </i>
            <span class="local-carta-atributos-plato"><span class="local-carta-atributos-plato-badge">
                <span style="color: rgb(34, 34, 34);">Familiar</span>
        <span>
        $
        ${pizzas[i].precio}
        </span> <span class="space-before-precio">&nbsp;</span> <i style="color: rgb(119, 119, 119);">
        
        </i></span></span>
        </div>
        <div class="item-foto col-3">
            <img src="${pizzas[i].imagen}" alt="">
        </div>
    </div>
        </div>
            
                `
        if(pizzas[i].categoria== "hamburguesas"){
            tradicionales.innerHTML+=product
        }
        if(pizzas[i].categoria== "papas fritas"){
            especiales.innerHTML+=product
        }
        if(pizzas[i].categoria== "ensaladas"){
            super_especiales.innerHTML+=product
        }
        if(pizzas[i].categoria== "aros de cebolla"){
            rellenas_calzones.innerHTML+=product
        }
        if(pizzas[i].categoria== "nuggets"){
            menu_vegan.innerHTML += product;
        }
        if(pizzas[i].categoria== "postres-helados"){
            postres_helados.innerHTML += product;
        }
    }
}

function seleccionaAcompañamiento(agregado,form,precio){
    let caquita=document.getElementsByName('papas fritas')
    let elements = document.getElementsByName(`${agregado}`)
    let flag=true
    let input_checked= document.getElementById(`${agregado}`)
    let form_input= document.querySelector(`#${form}`)
    elements[0].classList.add('select-item-ag')
    if(input_checked.checked==true && agregado!='papas fritas'){
        input_checked.checked=false
        flag=false
        var marca = elements[0].classList.contains( 'select-item-ag' );
        if(marca){
            elements[0].classList.remove('select-item-ag')
        }
        
    }else{
        input_checked.checked=true
        flag=true
        elements[0].classList.add('select-item-ag')
        form_input.querySelectorAll('input').forEach(function(checkElement) {
            if (checkElement.id!=agregado){
                checkElement.checked = false;
                let labeles = document.getElementsByName(`${checkElement.id}`)
                labeles[0].classList.remove('select-item-ag')
            }
        });
        
    }
    if(!flag){

        document.getElementById('papas fritas').checked=true
        caquita[0].classList.add('select-item-ag')
        
    }
    console.log(carrito)
    calcularTotal(precio)
}

function seleccionaBebida(agregado,form,precio){
    
    
    let elements = document.getElementsByName(`${agregado}`)
    let flag=true
    let input_checked= document.getElementById(`${agregado}`)
    let form_input= document.querySelector(`#${form}`)
    elements[0].classList.add('select-item-ag')
    if(input_checked.checked==true){
        input_checked.checked=false
        flag=false
        var marca = elements[0].classList.contains( 'select-item-ag' );
        if(marca){
            elements[0].classList.remove('select-item-ag')
        }
        
    }else{
        input_checked.checked=true
        flag=true
        elements[0].classList.add('select-item-ag')
        console.log(form_input)
        console.log(form)
        form_input.querySelectorAll('input').forEach(function(checkElement) {
            if (checkElement.id!=agregado){
                checkElement.checked = false;
                let labeles = document.getElementsByName(`${checkElement.id}`)
                labeles[0].classList.remove('select-item-ag')
            }
        });
        
    }
    console.log(carrito)
    calcularTotal(precio)
}

function calcularTotal(precio){

    let total=parseInt(precio)
    let form_input_acompañamiento= document.querySelector(`#acompañamiento`)
    let form_input_bebidas= document.querySelector(`#bebidas`)
    let form_input_postres_helados= document.querySelector(`#postres-helados`)
    let container_total= document.querySelector(`#precioprev`)
    let button_total= document.querySelector(`#button-total`)
    form_input_acompañamiento.querySelectorAll('input').forEach(function(checkElement) {
            if (checkElement.checked==true){
                for (let i=0; i < pizzas.length;i++){
                if (pizzas[i].nombre==checkElement.id){
                    let price_acompañamiento=parseInt(pizzas[i].precio)
                    total+=price_acompañamiento
                }
                }
            }
        });

    form_input_bebidas.querySelectorAll('input').forEach(function(checkElement) {
            if (checkElement.checked==true){
                for (let i=0; i < pizzas.length;i++){
                if (pizzas[i].nombre==checkElement.id){
                    let price_bebidas=parseInt(pizzas[i].precio)
                    total +=price_bebidas
                }
                }
            }
        });
        form_input_postres_helados.querySelectorAll('input').forEach(function(checkElement) {
            if (checkElement.checked==true){
                for (let i=0; i < pizzas.length;i++){
                if (pizzas[i].nombre==checkElement.id){
                    let price_bebidas=parseInt(pizzas[i].precio)
                    total +=price_bebidas
                }
                }
            }
        });
        
        container_total.innerHTML=dollarUS2.format(total)
        button_total.innerHTML=dollarUS2.format(total)
}

const encabezados = document.querySelectorAll('.contenedor-categorias .accordion-header');
const enlaces = document.querySelectorAll('#enlaces a');



const observer = new IntersectionObserver((entradas, observador) => {
	entradas.forEach(entrada => {
		if(entrada.isIntersecting){
			const id = '#' + entrada.target.id;
			history.pushState({}, entrada.target.innetText, id);

			enlaces.forEach(enlace => {
				enlace.classList.remove('activo');

				const href = enlace.attributes.href.nodeValue;
				if(href === id){
					enlace.classList.add('activo');
				}
			});
		}
	});
}, {
	threshold: 1,
	rootMargin: '0px 0px -50% 0px'
});


encabezados.forEach(encabezado => {
	observer.observe(encabezado);
});

function cargarCategorias(){
    let contenedor_categoria=document.getElementById('enlaces')
    let html=`
    <h2  class="subtitulos">Categorías</h2>
    <div class="slick-categoria" style="    border-top: 1px solid #dc3545;
    border-bottom: 1px solid #dc3545;">
        <div class="container-item" style="
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;">
            <div class="container-item-icon">
                <img src="./png/005-hamburgo.png" alt="">
            </div>
            <a class="item-categoria" href="#hamburguesas">Hamburguesas</a>
        </div>
        <div class="container-item" style="
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;">
            <div class="container-item-icon">
                <img src="./png/003-papas-fritas.png" alt="">
            </div>
            <a class="item-categoria" href="#papas-fritas">Papas Fritas</a>
        </div>
        <div class="container-item" style="
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;">
            <div class="container-item-icon">
                <img src="./png/009-ensalada.png" alt="">
            </div>
            <a class="item-categoria" href="#ensaladas">Ensaladas</a>
        </div>
        <div class="container-item" style="
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;">
            <div class="container-item-icon">
                <img src="./png/007-aros-de-cebolla.png" alt="">
            </div>
            <a class="item-categoria" href="#aros">Aros de Cebolla</a>
        </div>
        <div class="container-item" style="
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;">
            <div class="container-item-icon">
                <img src="./png/001-nuggets.png" alt="">
            </div>
            <a class="item-categoria" href="#nuggets">Nuggets</a>
        </div>
        <div class="container-item" style="
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;">
            <div class="container-item-icon">
                <img src="./png/012-dulces.png" alt="">
            </div>
            <a class="item-categoria" href="#p-h">Postres</a>
        </div>
    </div>
    `
    contenedor_categoria.innerHTML=html
    $('.slick-categoria').slick({
        arrows:false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
        {
        breakpoint: 1024,
        settings: {
            slidesToShow: 4,
            slidesToScroll: 3,
            infinite: true,
            dots: false
        }
        },
        {
        breakpoint: 600,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 2
        }
        },
        {
        breakpoint: 480,
        settings: {

            slidesToShow: 2,
            slidesToScroll: 2,
            variableWidth: true
        }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ]
    });
}


async function cargarDestacados(){
    let contenedor_destacado=document.getElementById('slick-destacado')
    /* const q = query(citiesRef, orderBy("name"), limit(3)); */
    const qDestacado = query(collection(db, "menu"), where("destacado", "==", true));

    const querySnapshot = await getDocs(qDestacado);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
    let html=`
                    <div class="container-item-destacado" onclick="verDetalles('${doc.data().precio}',
                    '${doc.data().nombre}',
                    '${doc.data().descripcion}',
                    '${doc.data().categoria}',
                    '${doc.data().imagen}')">
                        <div class="design-destacado">
                            <img class="img-destacado" src="${doc.data().imagen}" alt="">
                            <span>${doc.data().nombre}</span>
                            <span>${doc.data().precio}</span>
                        </div>
                    </div>
                    
    `
    contenedor_destacado.innerHTML+=html
});

    $('#slick-destacado').slick({
        arrows:false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 3,
    responsive: [
        {
        breakpoint: 1024,
        settings: {
            slidesToShow: 4,
            slidesToScroll: 3,
            infinite: true,
            dots: false
        }
        },
        {
        breakpoint: 600,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 2
        }
        },
        {
        breakpoint: 480,
        settings: {

            slidesToShow: 3,
            slidesToScroll: 2,
            variableWidth: true
        }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ]
    });
}


async function cargarPromociones(){
    let contenedor_promociones=document.getElementById('slick-promociones')
    /* const q = query(citiesRef, orderBy("name"), limit(3)); */
    const qPromociones = query(collection(db, "menu"), where("categoria", "==", 'promociones'));

    const querySnapshot = await getDocs(qPromociones);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
    console.log('data',doc.data())
    let html=`
                    <div class="container-item-destacado" onclick="verDetalles('${doc.data().precio}',
                    '${doc.data().nombre}',
                    '${doc.data().descripcion}',
                    '${doc.data().categoria}',
                    '${doc.data().imagen}')">
                        <div class="design-promociones">
                            <img class="img-promociones" src="${doc.data().imagen}" alt="">
                        </div>
                    </div>
                    
    `
    contenedor_promociones.innerHTML+=html
});

    $('#slick-promociones').slick({
        arrows:false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 3,
    responsive: [
        {
        breakpoint: 1024,
        settings: {
            slidesToShow: 4,
            slidesToScroll: 3,
            infinite: true,
            dots: false
        }
        },
        {
        breakpoint: 600,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            
        }
        },
        {
        breakpoint: 480,
        settings: {

            slidesToShow: 2,
            slidesToScroll: 1,
            variableWidth: true
        }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ]
    });
}

const modalMaps= document.getElementById('modal-map')
document.getElementById("button-modal-map").addEventListener("click", function() {
    const isVisible = "is-visible";
    modalMaps.classList.add(isVisible)
})


let form_input_delivery= document.querySelector(`#boton-action-delivery`)
let form_input_sucu= document.querySelector(`#boton-action-takeAway`)
/* form_input.querySelectorAll('input, select, textarea').forEach(function(checkElement) {
    console.log(checkElement)
}) */
/* const isValidNumber = regex.test(inputNumber); */

form_input_delivery.addEventListener("input", e => {
    if(e.target.id=='nombre'){
        let nombre=e.target.value
        let  input_nombre_=document.getElementsByName('nombre')
        let  input_nombre=document.getElementById('nombre')
        if (nombre.length!=0){
            input_nombre_[0].classList.remove('is-invalid');
            input_nombre.classList.remove('is-invalid');
            document.getElementById('noNombre').style.display="none"
        }

        let output = document.getElementsByName(`${e.target.id}`);
        
        output[0].value=`${e.target.value}`
    }
    if(e.target.id=='numero'){

        let numero=e.target.value
        if (numero.length==10){
            document.getElementById('numero').classList.remove('is-invalid');
            document.getElementById('invalid-feedback-numero').innerHTML=""
        }else{
            document.getElementById('numero').classList.add('is-invalid');
        }

        let output = document.getElementsByName(`${e.target.id}`);
        
        output[0].value=`${e.target.value}`
    }
    
});

form_input_sucu.addEventListener("input", e => {

    if(e.target.name=='nombre'){
        let nombre=e.target.value
        let  input_nombre_=document.getElementsByName('nombre')
        let input_nombre=document.getElementById('nombre')
        console.log(numero.length)
        if (nombre.length!=0){
            input_nombre_[0].classList.remove('is-invalid');
            input_nombre.classList.remove('is-invalid');
            document.getElementById('noNombre').style.display="none"
            document.getElementById('noNombre_').style.display="none"
        }

        let output = document.getElementById(`${e.target.name}`);
        output.value=`${e.target.value}`
    }
    if(e.target.name=='numero'){
        let numero=e.target.value
        let  input_numero=document.getElementsByName('numero')
        console.log(numero.length)
        if (numero.length==10){
            input_numero[0].classList.remove('is-invalid');
            document.getElementById('noNumero').style.display="none"
            document.getElementById('noNombre_').style.display="none"

        }else{
            input_numero[0].classList.add('is-invalid');
        }
        let output = document.getElementById(`${e.target.name}`);
        output.value=`${e.target.value}`
    }
});