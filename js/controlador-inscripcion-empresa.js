function validarCampos(){
    if(document.getElementById("name-empresa").value.length==0||document.getElementById("email-empresa").value.length==0||document.getElementById("direccion").value.length==0||document.getElementById("telefono").value.length==0||document.getElementById("banner").value.length==0||document.getElementById("logo").value.length==0||document.getElementById("descripcion").value.length==0){
        alert("NO PUEDE DEJAR CAMPOS VACÍOS");
    }else{
        if(isNaN(document.getElementById("telefono").value)){
            alert("El telénono solo puede contener números");
        }
        let expresionCorreo=/\w+@\w+\.+[a-z]/;
        if(!expresionCorreo.test(document.getElementById("email-empresa").value)){
            console.log(document.getElementById("email-empresa").value);
            alert("Sintaxis de correo electónico inválida");
        }else{
            abrirVentana("empresa.html");
        }
    }
    
}
function abrirVentana(url) {
    window.open(url, "empresa");
}
