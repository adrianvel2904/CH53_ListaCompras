const txtName = document.getElementById("Name"); //Nombre
const txtNumber = document.getElementById("Number"); //Cantidad
const btnAgregar = document.getElementById("btnAgregar");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

//Numeración de la primera columna de la tabla
let cont = 0;
let costoTotal = 0;
let totalProductos = 0;
let datos = new Array(); //almacena un array

function validarCantidad(){
    if(txtNumber.value.trim().length<=0){
        return false;
    }//length<=0
    
    if(isNaN(txtNumber.value)){
        return false;
    }//isNaN

    if(Number(txtNumber.value)<=0){
        return false;
    }//<=0

    return true;
}//validadCantidad

function getPrecio(){
    return Math.round((Math.random()*1000))/100;
} //getPrecio

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    let isValid = true;

    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtName.style.border= "";
    txtNumber.style.border = "";

    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    if(txtName.value.length < 3){
        txtName.style.border ="solid medium red";
        alertValidacionesTexto.innerHTML= "<strong>El nombre del producto no es correcto.</strong>";
        alertValidaciones.style.display ="block";
        isValid = false;
    }//length>=3


    if(!validarCantidad()){
        txtNumber.style.border = "solid medium red";
        alertValidacionesTexto.innerHTML += "<br/><strong> La cantidad no es correcta.</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }//validadCantidad

    if(isValid){ //si paso las validadicones
        cont++; //primera columna
        let precio = getPrecio();// ultima columna
        let row = `<tr>
                    <td> ${cont}</td>
                    <td> ${txtName.value}</td>
                    <td> ${txtNumber.value}</td>
                    <td> ${precio}</td>
                  </tr>`;

        let elemento = {
                        "cont": cont,
                        "nombre": txtName.value,
                        "cantidad": txtNumber.value,
                        "precio": precio
                       };
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerText = "$" + costoTotal.toFixed(2);
        totalProductos += Number(txtNumber.value);
        productosTotal.innerText = totalProductos;
        contadorProductos.innerText = cont;


        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();
    }//if isValid

});//btnAgregar


