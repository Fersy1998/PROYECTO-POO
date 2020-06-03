function validarCampos(){
    if(document.getElementById("name-empresa").value.length==0||document.getElementById("email-empresa").value.length==0||document.getElementById("direccion").value.length==0||document.getElementById("telefono").value.length==0||document.getElementById("banner").value.length==0||document.getElementById("logo").value.length==0||document.getElementById("descripcion").value.length==0||document.getElementById("longitud").value.length==0||document.getElementById("latitud").value.length==0){
        alert("NO PUEDE DEJAR CAMPOS VACÍOS");
    }else{
        let expresionTelefono=/^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/;
        let expresionCorreo=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        if(!expresionTelefono.test(document.getElementById("telefono").value)){
            alert("Ingrese un número telefónico válido");
        }else if(!expresionCorreo.test(document.getElementById("email-empresa").value)){
            alert("Sintaxis de correo electónico inválida");
        }else{
            guardarEmpresa()
            //abrirVentana("empresa.html");
        }
    }
    
}
var resLogo;
function guardarEmpresa(){
    //var bannerForm=$('#bannerForm');
    var logoForm=$('#logoForm');
    //var bannerFormData= new FormData(bannerForm[0]);
    var logoFormData= new FormData(logoForm[0]);
    console.log(logoFormData);
    axios.post('http://localhost:8080/POOO/FRONTEND/sube-logo', logoFormData)
    .then(res=>{
            console.log("banner /////////////////////////////////////////////////////");
            console.log(res.data);
            console.log("respuesta res= ");
            var cadena=res.data;
            cadena=cadena.split("****************************");
            console.log(cadena);
            let empresa_nueva={
                nombreEmpresa:document.getElementById("name-empresa").value,
                codigoEmpresa:uuid.v1(),
                logoimg:cadena[0],
                banner:cadena[1],
                pais:document.getElementById("pais").value,
                direccion:document.getElementById("direccion").value,
                telefono:document.getElementById("telefono").value,
                descripcion:document.getElementById("descripcion").value,
                email:document.getElementById("email-empresa").value,
                contrasena:document.getElementById("password").value,
                longitud:document.getElementById("longitud").value,
                latitud:document.getElementById("latitud").value
            }
            axios({
                method:'POST',
                url:'../BACKEND/api/empresa.php',
                respType:'json',
                data:empresa_nueva
            }).then(res=>{
                console.log(res);
                axios({
                    method:'POST',
                    url:'../BACKEND/api/login.php',
                    respType:'json',
                    data:{password:document.getElementById("password").value,
                        email:document.getElementById("email-empresa").value

                    }
                }).then(res=>{
                    console.log(res.data);

                    document.getElementById("name-empresa").value="";
                    document.getElementById("pais").value="";
                    document.getElementById("direccion").value="";
                    document.getElementById("telefono").value="";
                    document.getElementById("descripcion").value="";
                    document.getElementById("email-empresa").value="";
                    document.getElementById("password").value="";
                    document.getElementById("longitud").value="";
                    document.getElementById("latitud").value="";
                    window.location.href='empresa.php'
                }).catch(error=>{
                    console.log(error);
                })
            }).catch(error=>{
                console.log(error);
            })
    
        }).catch(error=>{
            console.log(error);
        })
   
}
/*function abrirVentana(url) {
    window.open(url, "empresa");
}
*/