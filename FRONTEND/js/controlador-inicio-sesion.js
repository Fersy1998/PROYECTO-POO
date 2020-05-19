
var codigo=null;
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
            buscarCoincideincias();
            //window.open("cliente.html");
        }
    }
}
function buscarCoincideincias(){
    if(codigo==null||codigo=="null"){
        axios({
        method:'GET',
        url:'../BACKEND/api/usuario.php?id='+document.getElementById("email").value,
        respType:'json',

        })
        .then(res=>{
            Codigo(res.data);
            console.log(res.data);
            if(codigo==null||codigo=="null"){
                axios({
                    method:'GET',
                    url:'../BACKEND/api/empresa.php?id='+document.getElementById("email").value,
                    respType:'json',
            
                })
                .then(res=>{
                    Codigo(res.data);
                    console.log(res.data);
                    if(codigo==null||codigo=="null"){
                        window.alert("NO HAY COINCIDEINCIAS");
                    }
                })
                .catch(error=>{
                    console.log(error);
                }) 
            }
        })
        .catch(error=>{
            console.log(error);
        })
        
    } 
    WriteFile();
}
function Codigo(code){
    codigo=code;
    console.log(codigo);
}
function WriteFile() 
{
    var archivoTxt=new XMLHttpRequest();
    archivoTxt.open("GET", "../BACKEND/codigo.txt", false);
    archivoTxt.send(null);
    var txt=archivoTxt.responseText;
    console.log("*********************");
    console.log(txt);
    let cc={
        CODIGO:codigo
    }
    axios({
        method:'POST',
        url:'../BACKEND/api/codigo.php',
        respType:'json',
        data:cc
    }).then(res=>{
        console.log(res);
    }).catch(error=>{
        console.log(error);
    })
    var archivoTxt=new XMLHttpRequest();
    archivoTxt.open("GET", "../BACKEND/codigo.txt", false);
    archivoTxt.send(null);
    var txt=archivoTxt.responseText;
    console.log("*********************");
    console.log(txt);
}