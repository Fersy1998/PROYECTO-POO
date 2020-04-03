function validarCampos(){
    if (document.getElementById("email").value.length==0||document.getElementById("contrasena").value.length==0){
        alert("NO HA COMPLETADO LOS CAMPOS");
    }else{
        let expresionCorreo=/\w+@\w+\.+[a-z]/;
        if(!expresionCorreo.test(document.getElementById("email").value)){
            alert("Sintaxis de correo electónico inválida");
        }else{
            window.open("cliente.html");
        }
    }
}