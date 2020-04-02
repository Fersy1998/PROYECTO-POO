function validarCampos(){
    if (document.getElementById("email").value.length==0||document.getElementById("contrasena").value.length==0){
        alert("NO HA COMPLETADO LOS CAMPOS");
    }else{
        window.open("cliente.html", "cliente");
        
    }
}