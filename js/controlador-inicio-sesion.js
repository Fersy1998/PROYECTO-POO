function validarCampos(){
    if (document.getElementById("email").value.length==0||document.getElementById("contrasena").value.length==0){
        alert("NO HA COMPLETADO LOS CAMPOS");
    }else{
        let expresionCorreo=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        let expresionContrasena=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;
        if(!expresionCorreo.test(document.getElementById("email").value)){
            alert("Sintaxis de correo electónico inválida");
        }
        else if(!expresionContrasena.test(document.getElementById("contrasena").value)){
            alert("La contraseña no coincide");
        }else{
            window.open("cliente.html");
        }
    }
}