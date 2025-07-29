let guardarPresupuesto = document.getElementById('guardar_btn_presupuesto');
let cajaPresupuesto=document.getElementById('presupuesto_num');
let nombreGasto=document.getElementById('nombre_gasto');
let cantidadGasto=document.getElementById('cantidad_gasto');
let guardarGasto=document.getElementById('guardar_btn_gastos');
let lista=document.getElementById('lista_desglose');
let contPresuuesto = document.getElementById('contendor-presu');
let contRest = document.getElementById('contenedor-rest');
let botonesModales = document.querySelectorAll('.botones-modales');


guardarPresupuesto.addEventListener('click', obtenerDatoPresupuesto);
guardarGasto.addEventListener('click', obtenerDatoGasto);

document.addEventListener('DOMContentLoaded', () => {
    crearEstructuraPresupuesto();
    crearEstructuraGastos();
    calcularRestante();
    limpiarLS()
});


function obtenerDatoPresupuesto (e){
    e.preventDefault();
    let presupuesto= cajaPresupuesto.value;
    if (presupuesto<1){
        alert('El presupuesto debe ser mayor a 0');
    }else{
        localStorage.setItem('presupuesto',presupuesto)
    }
    cajaPresupuesto.value='';
    crearEstructuraPresupuesto();
    calcularRestante();
}
function obtenerDatoGasto (e){
    e.preventDefault();
    const nombreGastos= nombreGasto.value;
    const cantidadGastos= cantidadGasto.value;
    let gastosLS = obtenerGastosLS();
    gastosLS.push({'Nombre': nombreGastos , 'Cantidad': cantidadGastos})
    salvarGastos(gastosLS)
    nombreGasto.value='';
    cantidadGasto.value='';
    crearEstructuraGastos ();
    calcularRestante ();
}
function crearEstructuraPresupuesto(){
    let obtenerPresupuesto = localStorage.getItem('presupuesto')
    contPresuuesto.innerHTML='';
    let vistaPresupuesto = document.createElement('div');
    vistaPresupuesto.innerHTML=`
    <div class="Presupuesto">
        <p>Presupuesto: ${obtenerPresupuesto}</p>
    </div>
    `
    contPresuuesto.appendChild(vistaPresupuesto)
}

function crearEstructuraGastos(){
    let gastos = obtenerGastosLS ();
    
    lista.innerHTML='';
    gastos.forEach(gasto =>{
        let gastoli= document .createElement('li');
        gastoli.innerHTML=`
        <li class="gasto"> Gasto: ${gasto.Nombre}  Valor: ${gasto.Cantidad}</li>
        `
        lista.appendChild(gastoli);
    })
}




function calcularTotalGastos() {
    let gastos = obtenerGastosLS();
    let total = 0;
    gastos.forEach(gasto => {
        total += parseFloat(gasto.Cantidad) || 0;
    });
    return total;
}

function calcularRestante(){
    let presupuesto = parseInt(localStorage.getItem('presupuesto'));
    let totalGastos = calcularTotalGastos();
    if (totalGastos >= presupuesto){
        alert('No te queda presupuesto o lo superaste');
        lista.innerHTML='';
        let totalgasto= document .createElement('li');
        totalgasto.innerHTML=`
        <li class="gasto"> Total de gasto ${totalGastos} </li>
        <button class="button-enviars" onclick="limpiarLS()">Realizar nuevo calculo</button>
        `
        lista.appendChild(totalgasto)
        contRest.innerHTML='';

    }else{
        let restante = presupuesto - totalGastos;
        crearEstructuraRestante (restante); 
    }
    
}


function crearEstructuraRestante(restante){
    contRest.innerHTML = '';
    let vistaRestante = document.createElement('div');
    let presupuesto = parseFloat(localStorage.getItem('presupuesto')) || 0;
    let porcentaje = presupuesto*0.2;
    let porcentajeM = presupuesto*0.5;
    if (restante<= 0){
        alert("No tienes presupuesto")
        vistaRestante.innerHTML = `
        <h3>Restante</h3>
        <div class="nada">
            <p>${restante}</p>
        </div>
    `;
    contRest.appendChild(vistaRestante);
    }else if (restante <= porcentaje ){
        vistaRestante.innerHTML = `
        <h3>Restante</h3>
        <div class="poco">
            <p>${restante}</p>
        </div>
        
    `;
    contRest.appendChild(vistaRestante);
    }else if(restante <= porcentajeM){
        vistaRestante.innerHTML = `
        <h3>Restante</h3>
        <div class="mitad">
            <p>${restante}</p>
        </div>
    `;
    contRest.appendChild(vistaRestante);
    }else{
        vistaRestante.innerHTML = `
        <h3>Restante</h3>
        <div class="Restante">
            <p>${restante}</p>
        </div>
    `;
    contRest.appendChild(vistaRestante);
    }
    
}
function limpiarLS(){
    localStorage.clear();
    contPresuuesto.innerHTML = ''; 
    contRest.innerHTML = '';       
    lista.innerHTML = '';
}
function obtenerGastosLS(){
    return JSON.parse(localStorage.getItem('gastos')) || [];
}
function salvarGastos(gasto) {
    localStorage.setItem('gastos', JSON.stringify(gasto));
}

