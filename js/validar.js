function validacion(){
    let telefonoInput = document.getElementById("utelefono");
    let telefono = telefonoInput.value;
    let edadInput = document.getElementById("uedad");
    let edad = edadInput.value;
    valor = document.getElementById("nota").value;

         // Valida la longitud del número de teléfono
    if (telefono.length != 10) {
        alert("El número de teléfono debe tener 10 dígitos");
        return false; // Longitud inválida
     
         // Valida la edad, esta no debe ser menor a 18 ni mayor a 99 años
    } else if (edad <=17 || edad>99) {
        alert ("Edad Errónea.  La edad debe ser entre 18 y 99 años");
        return false
         //Valida que el texarea no esté vacio
    } else if (valor == null || valor.length == 0 || /^\s+$/.test(valor)){
        alert("En comentarios, debe escibir algo sobre tí");
        return false;
    }
    return true; 
   
}




