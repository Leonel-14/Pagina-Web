function validarTelefono() {
        let telefonoInput = document.getElementById("utelefono");
        let telefono = telefonoInput.value;
        
        // Validar la longitud del número de teléfono
        if (telefono.length == 10) {
            return true; // Longitud válida
        } else {
            alert("El número de teléfono debe tener entre 10");
            return false; // Longitud inválida
        }
    }
