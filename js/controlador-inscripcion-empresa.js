function validarCampos(){
    if(document.getElementById("name-empresa").value.length==0||document.getElementById("email-empresa").value.length==0||document.getElementById("direccion").value.length==0||document.getElementById("telefono").value.length==0||document.getElementById("banner").value.length==0||document.getElementById("logo").value.length==0||document.getElementById("descripcion").value.length==0){
        alert("NO PUEDE DEJAR CAMPOS VACÍOS");
    }else{
        let expresionTelefono=/^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/;
        let expresionCorreo=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        let mapa= google.maps.Map(document.getElementById("mapaGoogle"),mapadetalles);
        if(!expresionTelefono.test(document.getElementById("telefono").value)){
            alert("Ingrese un número telefónico válido");
        }else if(!expresionCorreo.test(document.getElementById("email-empresa").value)){
            alert("Sintaxis de correo electónico inválida");
        }else{
            abrirVentana("empresa.html");
        }
    }
    
}
function abrirVentana(url) {
    window.open(url, "empresa");
}
