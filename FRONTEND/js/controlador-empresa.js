
var comentarioGlobal="";
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
var codigoEmpresa=getCookie("codigoEmpresa");

function generarEmpresa(){
    axios({
        method:'GET',
        url:'../BACKEND/api/empresa.php?id='+codigoEmpresa,
        respType:'json'
    })
    .then(res=>{
        empresa=res.data;
        productos=empresa.productos;
        document.getElementById("bannerEmpresa").innerHTML=`
        <img src="${empresa.banner}" class="d-block w-100 visible-md visible-lg" alt="...">
        <div class="contenido-slider visible-md visible-lg text-center"><br>
            <a href="#popUp" class="slider-btn  button" id="editarPerfil" onClick="editarPerfil()">Editar perfil de la empresa</a>
        </div>                               
        `;
        document.getElementById("perfil-empresa").innerHTML=`
        <div class="container">
        <div class="row">
            <div class="cabecera-de-seccion col-md-12 text-center">
                <h2>${empresa.nombreEmpresa}</h2>&nbsp;&nbsp;<a href="#popUp" id="ed"class="fa fa-edit visible-xs visible-sm" onClick="editarPerfil()" data-toggle="tooltip" data-placement="bottom" title="Editar perfil de la empresa"></a>
            </div> 
        </div>
        <div class="row">
        <div class="logo-perfil-empresa col-md-3 col-sm-6 col-lg-3">
            <div class="imagen-empresa-y-datos">
                <img src="${empresa.logoimg}" alt="">
                <div class="logo-datos-empresa">
                    <h3>X-BOX</h3>
                    <span>Siguenos en nuestras redes sociales</span>
                    <ul class="social">
                        <li><a href="#" class="fa fa-facebook"></a></li>
                        <li><a href="#" class="fa fa-twitter"></a></li>
                        <li><a href="#" class="fa fa-linkedin"></a></li>
                    </ul>
                </div>
            </div> 
        </div>
        <div class="detalles-empresa col-md-4 col-lg-4 col-sm-4">
            <div>
                <h2>Datos generales</h2>
                <a href="#" class="fa fa-phone">&nbsp;&nbsp;&nbsp; 2772-09-3545 234-543-2323</a><br>
                <a href="#" class="fa fa-location-arrow">&nbsp;&nbsp;&nbsp;Col. Yisoi, Huendae Prosel</a><br>
                <a href="#" class="fa fa-external-link">&nbsp;&nbsp;&nbsp;https://xbox.com/</a><br>
                <a href="#" class="fa fa-external-link">&nbsp;&nbsp;&nbsp;https://xbox.com/it-IT</a><br>
                <a href="#" class="fa fa-support">&nbsp;&nbsp;&nbsp;CD-R 700MB/DVD 4,7GB</a> <br>
            </div>
        </div>
        <div class="col-12 col-md-4 col-lg-5 visible-lg visible-xl visible-md">
            <div id="map"></div>
            <!--<iframe width="500" height="300" src="https://api.maptiler.com/maps/streets/?key=oFtOenj9IFPbVxEBpcC0#0.1/${empresa.latitud}/${empresa.longitud}"></iframe>-->
        </div>
    </div>
        <div class="row">
            <div class="cabecera-de-seccion col-12 text-center">
                <h2 id="mas-compania">Sobre nuestra compañía</h2>
            </div>
            <div>
            <div style="overflow:hidden;" class="col-6 col-md-6 col-xs-6 col-sm-6 col-xl-6 col-lg-6">
                <p id="mas-sobre-la-compania" style="color:white !important;">
                ${empresa.descripcion}
                </p>
            </div>
        </div>
    </div>
        
        `;
        var long=Math.round(empresa.longitud * 100) / 100;
        var lat=Math.round(empresa.latitud * 100) / 100;
        var map = L.map('map').setView([long, lat], 8);
        var gl = L.mapboxGL({
          attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
          accessToken: 'not-needed',
          style: 'https://api.maptiler.com/maps/streets/style.json?key=oFtOenj9IFPbVxEBpcC0'
        }).addTo(map);
        var marker=L.marker([long ,lat]).addTo(map);
        /*var map=L.map('map').setView([1000,10000],1);
        L.tileLayer('https://api.maptiler.com/maps/streets/WMTSCapabilities.xml?key=oFtOenj9IFPbVxEBpcC0', {attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'}).addTo(map);
        var marker=L.marker([24.52, -54.48]).addTo(map);*/
    })
    .catch(error=>{
        console.log(error);
    })
   
}
function boton(){
    document.getElementById("boton").innerHTML=`
    <button class="button" onclick="agregarProducto()">Guardar producto</button>`;
}
    generarEmpresa();

function generarProductos(){
        axios({
            method:'GET',
            url:'../BACKEND/api/empresa.php?id='+codigoEmpresa,
            respType:'json'
        })
        .then(res=>{
            var empresa=res.data;
            document.getElementById("row-promociones-empresa").innerHTML="";
            for(let p=0;p<empresa.productos.length; p++){
                axios({
                    method:'GET',
                    url:'../BACKEND/api/producto.php?id='+empresa.productos[p],
                    respType:'json'
                })
                .then(res=>{
                    var producto=res.data;
                    
                    document.getElementById("row-promociones-empresa").innerHTML+=`
                    <div class="col-12 col-md-4 col-sm-4 col-lg-3 col-xs-6">
                    <div class="card" style="background-color:transparent">
                        <div class="item-producto card-img-top">
                            <div class="imagen-producto">
                                <img src="${producto.foto}" class="card-img-top" alt="...">
                            </div>
                            <div class="agregar-fav producto-item-contenido">
                                <div class="fav-content sucursal-overlay">
                                    <a href="#" class="fa fa-trash-o" onClick="eliminarProducto(${p})" data-toggle="tooltip" data-placement="bottom" title="Eliminar producto"></a>
                                    <a href="#popup1" class="fa fa-edit" onClick="editarProducto(${p})" data-toggle="tooltip" data-placement="bottom" title="Editar producto"></a>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <h3 class="card-title">${producto.producto}</h3>
                            <img class="icono-nuevo-producto" src="img/icons8-new-50-2.png" alt="">${producto.descuento}%
                            <ul>
                                        <li class="detalle-producto-con-promocion-empresa">
                                            <a href="#" class="fa fa-database"></a>&nbsp;&nbsp;&nbsp;Precio:${producto.precio}L
                                        </li>
                                       
                                    </ul>
                                    <br><br><br><br>
                                    <hr>
                                    <center>
                                        <a href=""></a>
                                       <a href="javascript:void(0);" class="button ficha" id="crearFicha${p}">Crear ficha<i class="fa fa-magic" onClick="generarFicha(${p})"></i></a><br><br>
                                        <a class="button MODAL-BUTTON " href="#popUp" onclick="generarPopUp(${p})">
                                            ver detalles
                                        </a>
                                    </center>
                                </div>
                            </div>
                        </div> 
                    `;
                }).catch(error=>{
                    console.log(error);
                })
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }
   
/***PopUp formulario adicion producto */ 
generarProductos();

/*imprimir
$(document).ready(function(){
    $("#imprimir").click(function(){
        var mode = 'iframe'; //popup
        var close = mode == "popup";
        var options = { mode : mode, popClose : close};
        $("#Ficha").printArea( options );
    });
});*/


/* Generar Ficha*/
function cambiarValor(){
    if(document.getElementById("imprimir").value=="IMPRIMIR"){
        imp();
        document.getElementById("imprimir").value="CERRAR FICHA";
        return 0;
    }else if( document.getElementById("imprimir").value=="CERRAR FICHA"){
     
        document.getElementById("Ficha").style.display="none";
        document.getElementById("imprimir").style.display="none";
        document.getElementById("imprimir").value="IMPRIMIR";
        return 0;
      
    }
   
}
/*imprimir*/
function imp(){
    
        var mode = 'iframe'; //popup
        var close = mode == "popup";
        var options = { mode : mode, popClose : close};
        $("#Ficha").printArea( options );
    
}

function generarFicha(p){
        document.getElementById("imprimir").style.display="block";
        
            document.getElementById("Ficha").style.display="block";
            axios({
                method:'GET',
                url:'../BACKEND/api/empresa.php?id='+codigoEmpresa,
                respType:'json'
            })
            .then(res=>{
                var empresa=res.data
                    axios({
                        method:'GET',
                        url:'../BACKEND/api/producto.php?id='+empresa.productos[p],
                        respType:'json'
                    })
                    .then(res=>{
                        var producto=res.data;
                        var cs=5-producto.valoracion;
                        var cods="";
                            
                        for(let s=0; s<producto.valoracion; s++){
                            cods+=`<i class="fa fa-star"></i>`;
                        }
                        for(let s=0; s<cs; s++){
                            cods+=`<i class="fa fa-star-o"></i>`;
                        }              
                        document.getElementById("Ficha").innerHTML=`
                        <div id="print">
                        <div id="container" class="row content popup">	
            
                        <!-- Start	Product details -->
                            <div class="product-details col-6 col-xs-6 col-md-6 col-sm-6 col-lg-6 col-xl-6">
                                
                                    <!-- 	Product Name -->
                                <h1>${producto.producto}</h1>
                        
                        <!-- 		the Product rating -->
                                        <span class="hint-star star">
                                            ${cods}
                                        </span>
                                
                            
                                <!-- The most important information about the product -->
                                        <p class="information">${producto.descripcionProducto} </p>
        
                                
                                                
                                        <!-- 		Control -->
                                        <div class="control">
                                            <strike style="font-size:1.3em;">${producto.precio}</strike>
                                            <h1 style="color:red">¡${producto.descuento}% de descuento!</h1>
                                            
                                        </div>
                                    
                            </div>
                            
                        <!-- 	End	Product details   -->
                            
                            
                            
                        <!-- 	Start product image & Information -->
                            
                        <div class="col-6 col-xs-6 col-md-6 col-sm-6 col-lg-6 col-xl-6">
                            
                            <img src="${producto.foto}" alt="Omar Dsoky" style="height:200px; width:200px"><hr>
                            <center><img src="${producto.codigoProducto}" alt="Omar Dsoky" style="height:120px; width:120px"></center>
                            
                        </div>
                        <!--  End product image  -->
        
        
                        </div>
        
        
        
                        </div>
                        `;
                    })
                    .catch(error=>{
                            console.log(error);
                        })
                    })
                    .catch(error=>{
                            console.log(error);
                        })
                    
 
    
}
/*function abrirVentana(){
    var elemento=document.getElementById("Ficha");
    var ventana = window.open('', 'PRINT', 'height=400,width=600');
    ventana.document.write('<html><head><title>' + "PRODUCTO" + '</title>');
    ventana.document.write('<link rel="stylesheet" href="css/all_promo_style.css">');
    ventana.document.write('</head><body >');
    ventana.document.write(elemento.innerHTML);
    ventana.document.write('</body></html>');
    ventana.document.close();
    ventana.focus();
    ventana.print();
    ventana.close();
    //var elemento=document.getElementById("Ficha").style.display="none";
    return true;
}/*
/**mostrar imagen de nuevo producto */
function mostrarImagen(){
    imagen=document.getElementById("foto-producto").value;
    document.getElementById("imagen-subida").innerHTML=`
    <img src="${imagen}"
    class=" img-thumbnail img-responsive">
    `;
}

/***GENERAR CÓDIGO QR */ 
function generarCodigo(){
    $(".qr-code").attr("src", "https://chart.googleapis.com/chart?cht=qr&chl=" + $("#descripcion-producto").val() + "&chs=200x200");
   
};
/*****generar popUp */
function generarPopUp(p){
    var Ccomentario;
    axios({
        method:'GET',
        url:'../BACKEND/api/empresa.php?id='+codigoEmpresa,
        respType:'json'
    })
    .then(res=>{
        var empresa=res.data
            axios({
                method:'GET',
                url:'../BACKEND/api/producto.php?id='+empresa.productos[p],
                respType:'json'
            })
            .then(res=>{
                words("");
                var producto=res.data;
                var cs=5-producto.valoracion;
                var cods="";
                var comentarios=producto.comentarios;
                if(comentarios!=null&&comentarios.length>0&&comentarios!=undefined&&comentarios.length!=undefined){
                for(let i=0;i<comentarios.length;i++){
                    axios({
                        method:'GET',
                        url:'../BACKEND/api/comentario.php?id='+comentarios[i],
                        respType:'json',
                    })
                    .then(res=>{
                            var comentario=res.data;
                            axios({
                                method:'GET',
                                url:'../BACKEND/api/usuario.php?id='+comentario.codigoUsuario,
                                respType:'json',
                            })
                            .then(res=>{
                                usuario=res.data;
                                
                                    Ccomentario+=`
                                    <li>
                                    <div class="comment-main-level row">
                                        <!-- Avatar -->
                                        <div class="comment-avatar col-1 col-lg-2 col-md-2 col-sm-2 col-xs-2 col-xl-2"><img src="${usuario.fotoPerfil}" alt=""></div>
                                        <!-- Contenedor del Comentario -->
                                        <div class="comment-box col-lg-10 col-md-10 col-sm-10 col-xs-10 col-xl-10">
                                            <div class="row">
                                                <div class="comment-head col-lg-12 col-md-12 col-sm-12">
                                                    <h6 class="comment-name by-author">${usuario.nombreCliente}&nbsp;${usuario.apellidoCliente}</h6>
                                                </div>
                                                <div class="comment-content col-lg-12 col-md-12 col-sm-12">
                                                    ${comentario.contenido}
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    </li> 
                                `;
                                words(Ccomentario);
                            })
                            .catch(error=>{
                                console.log(error);
                            })
                        })
                        .catch(error=>{
                                console.log(error);
                            })
                        }}else{
                            Ccomentario=`<h3 style="color:#ccc;">No hay comentarios para este producto</h3>`;
                            words(Ccomentario);
                        }
                        
                    
                
                
                for(let s=0; s<producto.valoracion; s++){
                    cods+=`<i class="fa fa-star"></i>`;
                }
                for(let s=0; s<cs; s++){
                    cods+=`<i class="fa fa-star-o"></i>`;
                }                      
                var nuevoprecio= producto.precio - ((parseInt(producto.descuento , 10))/100)*parseInt(producto.precio);       
                document.getElementById("popUp").innerHTML=`
                <div class="popup">
                        <div class="content">
                            <br>
                            <a class="close" href="#">x</a>
                            <h2>${producto.producto}</h2>
                            <div class="container-fluid detalles_producto">
                                <div class="row">
                                    <div class="col-6 col-xs-6 col-sm-6 col-md-6 collg-6 col-xl-6">
                                        <h3>Empresa: </h3><p class="information">${empresa.nombreEmpresa}</p>
                                        <h3>Precio: </h3><p class="information">${producto.precio}L</p>
                                        <h3>Descuento: </h3><p class="information">${producto.descuento}%</p>
                                        <h3>Pago total: </h3><p class="information">${nuevoprecio}L</p>
                                    </div>
                                    <div class="col-6 col-xs-6 col-sm-6 col-md-6 collg-6 col-xl-6">
                                        <div class="product-image w-100" style="width:100%;">
                                        <center>
                                        <img src="${producto.foto}" ><hr>
                                        <span class="hint-star"style="width:100%;">${cods}
                                        </span>
                                        </center>
                                           
                                        </div>
                                    </div>
                                    <div class="row">
                                    <!-- Contenedor Principal -->
                                    <div class="comments-container col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <h3>Comentarios</h3>
                                        <CENTER><a onclick="obtenerComentarioGlobal()" class="button" ><i class="fa fa-eye"></i>&nbsp;&nbsp;VER LOS COMENTARIOS</a></CENTER>
                                        <ul id="comments-list" class="comments-list">
                                        
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
        }).catch(error=>{
            console.log(error);
        })
    
    }).catch(error=>{
        console.log(error);
    })
}
function obtenerComentarioGlobal(){
    document.getElementById("comments-list").innerHTML=comentarioGlobal;
}

function words(comentario){
    comentarioGlobal=comentario;
}
function eliminarProducto(codigo){
    axios({
        method:'GET',
        url:'../BACKEND/api/empresa.php?id='+codigoEmpresa,
        respType:'json'
    })
    .then(res=>{
        var empresa=res.data
            axios({
                method:'GET',
                url:'../BACKEND/api/producto.php?id='+empresa.productos[codigo],
                respType:'json'
            })
            .then(res=>{
                words("");
                var producto=res.data;
                datos={
                    accion:"eliminar-producto",
                    codigoEmpresa:codigoEmpresa,
                    codigoProducto:producto.code
                }
                axios({
                    method:'PUT',
                    url:'../BACKEND/api/empresa.php',
                    data: datos,
                    respType:'json'
                }).catch(error=>{
                console.log(error);
                })
                
                axios({
                    method:'DELETE',
                    url:'../BACKEND/api/producto.php?id='+producto.code,
                    respType:'json'
                }).catch(error=>{
                console.log(error);
                })
            }).catch(error=>{
                console.log(error);
            })
            generarProductos();
        }).catch(error=>{
            console.log(error);
        })
}

function agregarProducto(){
    var x=document.getElementById("descripcion-producto").value;
    let codigo=uuid.v1();
    var picForm=$('#picForm');
    let formData= new FormData(picForm[0]);
    console.log(formData);
    console.log(document.getElementById("fotografia"));
    var filename = $('input[type=file]').val().replace(/C:\\fakepath\\/i, '');
    axios.post('http://localhost:8080/pooo/FRONTEND/sube-producto', formData)
    .then(res=>{
        let producto={
            producto:document.getElementById("nombre-producto").value,
            codigoProducto:"https://chart.googleapis.com/chart?cht=qr&chl="+x+"&chs=200x200",
            descripcionProducto:document.getElementById("descripcion-producto").value,
            code:codigo,
            foto:"img/foto-productos/"+filename,
            precio:document.getElementById("precio-producto").value,
            descuento:document.getElementById("descuento-producto").value,
            valoracion:5,
            valoraciones:[],
            comentarios:[],
            codigoEmpresa:codigoEmpresa
        }
        
        axios({
            method:'POST',
            url:'../BACKEND/api/producto.php',
            respType:'json',
            data:producto
        }).then(res=>{
            console.log(res);
        }).catch(error=>{
            console.log(error);
        })
        axios({
            method:'PUT',
            url:'../BACKEND/api/empresa.php',
            respType:'json',
            data:{
                accion:"agregar-producto",
                codigoEmpresa:codigoEmpresa,
                codigoProducto:codigo
            }
        }).then(res=>{
            console.log(res);
            document.getElementById("descripcion-producto").value="";
            document.getElementById("fotografia").value="";
            document.getElementById("nombre-producto").value="";
            document.getElementById("descripcion-producto").value="";
            document.getElementById("precio-producto").value="";
            document.getElementById("descuento-producto").value="";
            alert("Producto agregado correctamente");
            generarProductos();
        }).catch(error=>{
            console.log(error);
        })
        
    }).catch(error=>{
        console.log(error);
    })
    
}
function editarPerfil(){
    
        axios({
            method:'GET',
            url:'../BACKEND/api/empresa.php?id='+codigoEmpresa,
            respType:'json',
            
        })
        .then(res=>{
            var empresa=res.data;
            document.getElementById("popUp").innerHTML=`
            <div class="popup special h-75 w-80" style="top:12%;">
                    <div class="" style="width:100%: height:100%">
                        <br>
                        <a class="close" href="#">x</a>
                            <div class="cabecera-de-seccion col-md-12 text-center">
                                <h2>Edición de perfil</h2>
                            </div>
                            <div class="row">
                            <div class="col-8 registro-empresa">
                                <div class="inscripcion-form"  name="inscripcionform" id="inscripcionform">
                                   
                                        <h2>Nombre de la empresa: </h2>
                                        <p>
                                            <input name="name-empresa" class="datos"type="text" id="name-empresa" placeholder="Ejemplo: ALL PROMO" required value="${empresa.nombreEmpresa}">
                                        </p>
                                       
                                        <h2>País: </h2>
                                        <p>
                                            <select class="datos" style="width: 100%; padding: 1%; color: gray;" required id="pais" value="${empresa.pais}">
                                                <option value="Elegir" id="AF">Elegir opción</option>
                                                <option value="Afganistán" id="AF">Afganistán</option>
                                                <option value="Albania" id="AL">Albania</option>
                                                <option value="Alemania" id="DE">Alemania</option>
                                                <option value="Andorra" id="AD">Andorra</option>
                                                <option value="Angola" id="AO">Angola</option>
                                                <option value="Anguila" id="AI">Anguila</option>
                                                <option value="Antártida" id="AQ">Antártida</option>
                                                <option value="Antigua y Barbuda" id="AG">Antigua y Barbuda</option>
                                                <option value="Antillas holandesas" id="AN">Antillas holandesas</option>
                                                <option value="Arabia Saudí" id="SA">Arabia Saudí</option>
                                                <option value="Argelia" id="DZ">Argelia</option>
                                                <option value="Argentina" id="AR">Argentina</option>
                                                <option value="Armenia" id="AM">Armenia</option>
                                                <option value="Aruba" id="AW">Aruba</option>
                                                <option value="Australia" id="AU">Australia</option>
                                                <option value="Austria" id="AT">Austria</option>
                                                <option value="Azerbaiyán" id="AZ">Azerbaiyán</option>
                                                <option value="Bahamas" id="BS">Bahamas</option>
                                                <option value="Bahrein" id="BH">Bahrein</option>
                                                <option value="Bangladesh" id="BD">Bangladesh</option>
                                                <option value="Barbados" id="BB">Barbados</option>
                                                <option value="Bélgica" id="BE">Bélgica</option>
                                                <option value="Belice" id="BZ">Belice</option>
                                                <option value="Benín" id="BJ">Benín</option>
                                                <option value="Bermudas" id="BM">Bermudas</option>
                                                <option value="Bhután" id="BT">Bhután</option>
                                                <option value="Bielorrusia" id="BY">Bielorrusia</option>
                                                <option value="Birmania" id="MM">Birmania</option>
                                                <option value="Bolivia" id="BO">Bolivia</option>
                                                <option value="Bosnia y Herzegovina" id="BA">Bosnia y Herzegovina</option>
                                                <option value="Botsuana" id="BW">Botsuana</option>
                                                <option value="Brasil" id="BR">Brasil</option>
                                                <option value="Brunei" id="BN">Brunei</option>
                                                <option value="Bulgaria" id="BG">Bulgaria</option>
                                                <option value="Burkina Faso" id="BF">Burkina Faso</option>
                                                <option value="Burundi" id="BI">Burundi</option>
                                                <option value="Cabo Verde" id="CV">Cabo Verde</option>
                                                <option value="Camboya" id="KH">Camboya</option>
                                                <option value="Camerún" id="CM">Camerún</option>
                                                <option value="Canadá" id="CA">Canadá</option>
                                                <option value="Chad" id="TD">Chad</option>
                                                <option value="Chile" id="CL">Chile</option>
                                                <option value="China" id="CN">China</option>
                                                <option value="Chipre" id="CY">Chipre</option>
                                                <option value="Ciudad estado del Vaticano" id="VA">Ciudad estado del Vaticano</option>
                                                <option value="Colombia" id="CO">Colombia</option>
                                                <option value="Comores" id="KM">Comores</option>
                                                <option value="Congo" id="CG">Congo</option>
                                                <option value="Corea" id="KR">Corea</option>
                                                <option value="Corea del Norte" id="KP">Corea del Norte</option>
                                                <option value="Costa del Marfíl" id="CI">Costa del Marfíl</option>
                                                <option value="Costa Rica" id="CR">Costa Rica</option>
                                                <option value="Croacia" id="HR">Croacia</option>
                                                <option value="Cuba" id="CU">Cuba</option>
                                                <option value="Dinamarca" id="DK">Dinamarca</option>
                                                <option value="Djibouri" id="DJ">Djibouri</option>
                                                <option value="Dominica" id="DM">Dominica</option>
                                                <option value="Ecuador" id="EC">Ecuador</option>
                                                <option value="Egipto" id="EG">Egipto</option>
                                                <option value="El Salvador" id="SV">El Salvador</option>
                                                <option value="Emiratos Arabes Unidos" id="AE">Emiratos Arabes Unidos</option>
                                                <option value="Eritrea" id="ER">Eritrea</option>
                                                <option value="Eslovaquia" id="SK">Eslovaquia</option>
                                                <option value="Eslovenia" id="SI">Eslovenia</option>
                                                <option value="España" id="ES">España</option>
                                                <option value="Estados Unidos" id="US">Estados Unidos</option>
                                                <option value="Estonia" id="EE">Estonia</option>
                                                <option value="c" id="ET">Etiopía</option>
                                                <option value="Ex-República Yugoslava de Macedonia" id="MK">Ex-República Yugoslava de Macedonia</option>
                                                <option value="Filipinas" id="PH">Filipinas</option>
                                                <option value="Finlandia" id="FI">Finlandia</option>
                                                <option value="Francia" id="FR">Francia</option>
                                                <option value="Gabón" id="GA">Gabón</option>
                                                <option value="Gambia" id="GM">Gambia</option>
                                                <option value="Georgia" id="GE">Georgia</option>
                                                <option value="Georgia del Sur y las islas Sandwich del Sur" id="GS">Georgia del Sur y las islas Sandwich del Sur</option>
                                                <option value="Ghana" id="GH">Ghana</option>
                                                <option value="Gibraltar" id="GI">Gibraltar</option>
                                                <option value="Granada" id="GD">Granada</option>
                                                <option value="Grecia" id="GR">Grecia</option>
                                                <option value="Groenlandia" id="GL">Groenlandia</option>
                                                <option value="Guadalupe" id="GP">Guadalupe</option>
                                                <option value="Guam" id="GU">Guam</option>
                                                <option value="Guatemala" id="GT">Guatemala</option>
                                                <option value="Guayana" id="GY">Guayana</option>
                                                <option value="Guayana francesa" id="GF">Guayana francesa</option>
                                                <option value="Guinea" id="GN">Guinea</option>
                                                <option value="Guinea Ecuatorial" id="GQ">Guinea Ecuatorial</option>
                                                <option value="Guinea-Bissau" id="GW">Guinea-Bissau</option>
                                                <option value="Haití" id="HT">Haití</option>
                                                <option value="Holanda" id="NL">Holanda</option>
                                                <option value="Honduras" id="HN">Honduras</option>
                                                <option value="Hong Kong R. A. E" id="HK">Hong Kong R. A. E</option>
                                                <option value="Hungría" id="HU">Hungría</option>
                                                <option value="India" id="IN">India</option>
                                                <option value="Indonesia" id="ID">Indonesia</option>
                                                <option value="Irak" id="IQ">Irak</option>
                                                <option value="Irán" id="IR">Irán</option>
                                                <option value="Irlanda" id="IE">Irlanda</option>
                                                <option value="Isla Bouvet" id="BV">Isla Bouvet</option>
                                                <option value="Isla Christmas" id="CX">Isla Christmas</option>
                                                <option value="Isla Heard e Islas McDonald" id="HM">Isla Heard e Islas McDonald</option>
                                                <option value="Islandia" id="IS">Islandia</option>
                                                <option value="Islas Caimán" id="KY">Islas Caimán</option>
                                                <option value="Islas Cook" id="CK">Islas Cook</option>
                                                <option value="Islas de Cocos o Keeling" id="CC">Islas de Cocos o Keeling</option>
                                                <option value="Islas Faroe" id="FO">Islas Faroe</option>
                                                <option value="Islas Fiyi" id="FJ">Islas Fiyi</option>
                                                <option value="Islas Malvinas Islas Falkland" id="FK">Islas Malvinas Islas Falkland</option>
                                                <option value="Islas Marianas del norte" id="MP">Islas Marianas del norte</option>
                                                <option value="Islas Marshall" id="MH">Islas Marshall</option>
                                                <option value="Islas menores de Estados Unidos" id="UM">Islas menores de Estados Unidos</option>
                                                <option value="Islas Palau" id="PW">Islas Palau</option>
                                                <option value="Islas Salomón" d="SB">Islas Salomón</option>
                                                <option value="Islas Tokelau" id="TK">Islas Tokelau</option>
                                                <option value="Islas Turks y Caicos" id="TC">Islas Turks y Caicos</option>
                                                <option value="Islas Vírgenes EE.UU." id="VI">Islas Vírgenes EE.UU.</option>
                                                <option value="Islas Vírgenes Reino Unido" id="VG">Islas Vírgenes Reino Unido</option>
                                                <option value="Israel" id="IL">Israel</option>
                                                <option value="Italia" id="IT">Italia</option>
                                                <option value="Jamaica" id="JM">Jamaica</option>
                                                <option value="Japón" id="JP">Japón</option>
                                                <option value="Jordania" id="JO">Jordania</option>
                                                <option value="Kazajistán" id="KZ">Kazajistán</option>
                                                <option value="Kenia" id="KE">Kenia</option>
                                                <option value="Kirguizistán" id="KG">Kirguizistán</option>
                                                <option value="Kiribati" id="KI">Kiribati</option>
                                                <option value="Kuwait" id="KW">Kuwait</option>
                                                <option value="Laos" id="LA">Laos</option>
                                                <option value="Lesoto" id="LS">Lesoto</option>
                                                <option value="Letonia" id="LV">Letonia</option>
                                                <option value="Líbano" id="LB">Líbano</option>
                                                <option value="Liberia" id="LR">Liberia</option>
                                                <option value="Libia" id="LY">Libia</option>
                                                <option value="Liechtenstein" id="LI">Liechtenstein</option>
                                                <option value="Lituania" id="LT">Lituania</option>
                                                <option value="Luxemburgo" id="LU">Luxemburgo</option>
                                                <option value="Macao R. A. E" id="MO">Macao R. A. E</option>
                                                <option value="Madagascar" id="MG">Madagascar</option>
                                                <option value="Malasia" id="MY">Malasia</option>
                                                <option value="Malawi" id="MW">Malawi</option>
                                                <option value="Maldivas" id="MV">Maldivas</option>
                                                <option value="Malí" id="ML">Malí</option>
                                                <option value="Malta" id="MT">Malta</option>
                                                <option value="Marruecos" id="MA">Marruecos</option>
                                                <option value="Martinica" id="MQ">Martinica</option>
                                                <option value="Mauricio" id="MU">Mauricio</option>
                                                <option value="Mauritania" id="MR">Mauritania</option>
                                                <option value="Mayotte" id="YT">Mayotte</option>
                                                <option value="México" id="MX">México</option>
                                                <option value="Micronesia" id="FM">Micronesia</option>
                                                <option value="Moldavia" id="MD">Moldavia</option>
                                                <option value="Mónaco" id="MC">Mónaco</option>
                                                <option value="Mongolia" id="MN">Mongolia</option>
                                                <option value="Montserrat" id="MS">Montserrat</option>
                                                <option value="Mozambique" id="MZ">Mozambique</option>
                                                <option value="Namibia" id="NA">Namibia</option>
                                                <option value="Nauru" id="NR">Nauru</option>
                                                <option value="Nepal" id="NP">Nepal</option>
                                                <option value="Nicaragua" id="NI">Nicaragua</option>
                                                <option value="Níger" id="NE">Níger</option>
                                                <option value="Nigeria" id="NG">Nigeria</option>
                                                <option value="Niue" id="NU">Niue</option>
                                                <option value="Norfolk" id="NF">Norfolk</option>
                                                <option value="Noruega" id="NO">Noruega</option>
                                                <option value="Nueva Caledonia" id="NC">Nueva Caledonia</option>
                                                <option value="Nueva Zelanda" id="NZ">Nueva Zelanda</option>
                                                <option value="Omán" id="OM">Omán</option>
                                                <option value="Panamá" id="PA">Panamá</option>
                                                <option value="Papua Nueva Guinea" id="PG">Papua Nueva Guinea</option>
                                                <option value="Paquistán" id="PK">Paquistán</option>
                                                <option value="Paraguay" id="PY">Paraguay</option>
                                                <option value="Perú" id="PE">Perú</option>
                                                <option value="Pitcairn" id="PN">Pitcairn</option>
                                                <option value="Polinesia francesa" id="PF">Polinesia francesa</option>
                                                <option value="Polonia" id="PL">Polonia</option>
                                                <option value="Portugal" id="PT">Portugal</option>
                                                <option value="Puerto Rico" id="PR">Puerto Rico</option>
                                                <option value="Qatar" id="QA">Qatar</option>
                                                <option value="Reino Unido" id="UK">Reino Unido</option>
                                                <option value="República Centroafricana" id="CF">República Centroafricana</option>
                                                <option value="República Checa" id="CZ">República Checa</option>
                                                <option value="República de Sudáfrica" id="ZA">República de Sudáfrica</option>
                                                <option value="República Democrática del Congo Zaire" id="CD">República Democrática del Congo Zaire</option>
                                                <option value="República Dominicana" id="DO">República Dominicana</option>
                                                <option value="Reunión" id="RE">Reunión</option>
                                                <option value="Ruanda" id="RW">Ruanda</option>
                                                <option value="Rumania" id="RO">Rumania</option>
                                                <option value="Rusia" id="RU">Rusia</option>
                                                <option value="Samoa" id="WS">Samoa</option>
                                                <option value="Samoa occidental" id="AS">Samoa occidental</option>
                                                <option value="San Kitts y Nevis" id="KN">San Kitts y Nevis</option>
                                                <option value="San Marino" id="SM">San Marino</option>
                                                <option value="San Pierre y Miquelon" id="PM">San Pierre y Miquelon</option>
                                                <option value="San Vicente e Islas Granadinas" id="VC">San Vicente e Islas Granadinas</option>
                                                <option value="Santa Helena" id="SH">Santa Helena</option>
                                                <option value="Santa Lucía" id="LC">Santa Lucía</option>
                                                <option value="Santo Tomé y Príncipe" id="ST">Santo Tomé y Príncipe</option>
                                                <option value="Senegal" id="SN">Senegal</option>
                                                <option value="Serbia y Montenegro" id="YU">Serbia y Montenegro</option>
                                                <option value="Sychelles" id="SC">Seychelles</option>
                                                <option value="Sierra Leona" id="SL">Sierra Leona</option>
                                                <option value="Singapur" id="SG">Singapur</option>
                                                <option value="Siria" id="SY">Siria</option>
                                                <option value="Somalia" id="SO">Somalia</option>
                                                <option value="Sri Lanka" id="LK">Sri Lanka</option>
                                                <option value="Suazilandia" id="SZ">Suazilandia</option>
                                                <option value="Sudán" id="SD">Sudán</option>
                                                <option value="Suecia" id="SE">Suecia</option>
                                                <option value="Suiza" id="CH">Suiza</option>
                                                <option value="Surinam" id="SR">Surinam</option>
                                                <option value="Svalbard" id="SJ">Svalbard</option>
                                                <option value="Tailandia" id="TH">Tailandia</option>
                                                <option value="Taiwán" id="TW">Taiwán</option>
                                                <option value="Tanzania" id="TZ">Tanzania</option>
                                                <option value="Tayikistán" id="TJ">Tayikistán</option>
                                                <option value="Territorios británicos del océano Indico" id="IO">Territorios británicos del océano Indico</option>
                                                <option value="Territorios franceses del sur" id="TF">Territorios franceses del sur</option>
                                                <option value="Timor Oriental" id="TP">Timor Oriental</option>
                                                <option value="Togo" id="TG">Togo</option>
                                                <option value="Tonga" id="TO">Tonga</option>
                                                <option value="Trinidad y Tobago" id="TT">Trinidad y Tobago</option>
                                                <option value="Túnez" id="TN">Túnez</option>
                                                <option value="Turkmenistán" id="TM">Turkmenistán</option>
                                                <option value="Turquía" id="TR">Turquía</option>
                                                <option value="Tuvalu" id="TV">Tuvalu</option>
                                                <option value="Ucrania" id="UA">Ucrania</option>
                                                <option value="Uganda" id="UG">Uganda</option>
                                                <option value="Uruguay" id="UY">Uruguay</option>
                                                <option value="Uzbekistán" id="UZ">Uzbekistán</option>
                                                <option value="Vanuatu" id="VU">Vanuatu</option>
                                                <option value="Venezuela" id="VE">Venezuela</option>
                                                <option value="Vietnam" id="VN">Vietnam</option>
                                                <option value="Wallis y Futuna" id="WF">Wallis y Futuna</option>
                                                <option value="Yemen" id="YE">Yemen</option>
                                                <option value="Zambia" id="ZM">Zambia</option>
                                                <option value="Zimbabue" id="ZW">Zimbabue</option>
                                            </select>
                                        </p>
                                        <h2>Dirección</h2>
                                        <p>
                                            <input type="text" class="datos" name="direccion" id="direccion" placeholder="Col. Gyio" required value="${empresa.direccion}">
                                        </p>
                                        <h2>Teléfono: </h2>
                                        <p>
                                            <input type="tel" name="" id="telefono" class="datos"name="telefono" id="" placeholder="example: 2772-8270" required value="${empresa.telefono}">
                                        </p>
                                        
                                        <form action="post" name="logoForm" id="logoForm" enctype="multipart/form-data">
                                            <h2>Logo:</h2> 
                                            <p>
                                                <input type="file" name="logo" class="datos" id="logo" required accept="image/x-png,image/gif,image/jpeg" value="${empresa.logoimg}">
                                            </p>
                                            <h2>Banner:</h2>
                                            <p>
                                                <input type="file" name="banner" class="datos" id="banner" required accept="image/x-png,image/gif,image/jpeg" value="${empresa.banner}">
                                            </p>
                                        </form>
                                        
                                        <h2>Descripción: </h2>
                                        <p>
                                            <textarea name="descripcion" id="descripcion" cols="30" rows="20" class="datos">${empresa.descripcion}</textarea>
                                        </p>
                                        <h2>Longitd/Latitud: </h2>
                                        <p>
                                            
                                            ltd:<input type="text" id="latitud" name="latitud"class="datos"value="${empresa.latitud}"/>
                                            Lng:<input type="text" id="longitud" name="longitud"class="datos"value="${empresa.longitud}"/>
                                        </p>
                                       
                                    </div>
                                    <a>
                            </div> 
                        </div> 
                    </div> 
                            <center>
                                <p>
                                <input type="button"class="button"value="Guardar cambios" onclick="validarCampos()">
                                </p>
                            </center>
                                
                            
                        </div>
                    </div>
                </div>
            </div>
        
            `;
        })
        .catch(error=>{
            console.log(error);
        })
}
function validarCampos(){
        if(document.getElementById("name-empresa").value.length==0||document.getElementById("direccion").value.length==0||document.getElementById("telefono").value.length==0||document.getElementById("banner").value.length==0||document.getElementById("logo").value.length==0||document.getElementById("descripcion").value.length==0||document.getElementById("longitud").value.length==0||document.getElementById("latitud").value.length==0){
            alert("NO PUEDE DEJAR CAMPOS VACÍOS");
        }else{
            let expresionTelefono=/^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/;
          
            if(!expresionTelefono.test(document.getElementById("telefono").value)){
                alert("Ingrese un número telefónico válido");

            }else{
                actualizarEmpresa()
            }
        }
        
}
function actualizarEmpresa(){
    //var bannerForm=$('#bannerForm');
    var logoForm=$('#logoForm');
    //var bannerFormData= new FormData(bannerForm[0]);
    var logoFormData= new FormData(logoForm[0]);
    console.log(logoFormData);
    axios.post('http://localhost:8080/POOO/FRONTEND/sube-logo', logoFormData)
    .then(res=>{
          
            var cadena=res.data;
            cadena=cadena.split("****************************");
          
            let empresa_nueva={
                nombreEmpresa:document.getElementById("name-empresa").value,
                codigoEmpresa:codigoEmpresa,
                logoimg:cadena[0],
                banner:cadena[1],
                pais:document.getElementById("pais").value,
                direccion:document.getElementById("direccion").value,
                telefono:document.getElementById("telefono").value,
                descripcion:document.getElementById("descripcion").value,
                longitud:document.getElementById("longitud").value,
                latitud:document.getElementById("latitud").value
            }
            axios({
                method:'PUT',
                url:'../BACKEND/api/empresa.php?id='+codigoEmpresa,
                respType:'json',
                data:empresa_nueva
            }).then(res=>{
                console.log(res);
            }).catch(error=>{
                console.log(error);
            })
    
        }).catch(error=>{
            console.log(error);
        })
}
function editarProducto(p){
    var codigo;
    axios({
        method:'GET',
        url:'../BACKEND/api/empresa.php?id='+codigoEmpresa,
        respType:'json'
    })
    .then(res=>{
        
        empresa=res.data;
        axios({
            method:'GET',
            url:'../BACKEND/api/producto.php?id='+empresa.productos[p],
            respType:'json'
        })
        .then(res=>{
            
            producto=res.data;
            document.getElementById("nombre-producto").value=producto.producto;
            document.getElementById("descripcion-producto").value=producto.descripcionProducto;
            document.getElementById("precio-producto").value=producto.precio;
            document.getElementById("descuento-producto").value=producto.descuento;
            document.getElementById("img1").src=producto.codigoProducto;
            document.getElementById("");
            codigo=producto.code;
        }).catch(error=>{
            console.log(error);
        })
    }).catch(error=>{
        console.log(error);
    })
    document.getElementById("boton").innerHTML=`
    <button class="button" onclick="guardarCambiosP(${p})">Guardar cambios</button>`;
}
function guardarCambiosP(p){
    axios({
        method:'GET',
        url:'../BACKEND/api/empresa.php?id='+codigoEmpresa,
        respType:'json'
    })
    .then(res=>{
           
            var empresa=res.data;
            var cproducto=empresa.productos[p];
           
            axios({
                method:'GET',
                url:'../BACKEND/api/producto.php?id='+cproducto,
                respType:'json'
            })
            .then(res=>{
               
                producto=res.data;
                var x=document.getElementById("descripcion-producto").value;
                let codigo=producto.code;
                var picForm=$('#picForm');
                let formData= new FormData(picForm[0]);
                
                var filename = $('input[type=file]').val().replace(/C:\\fakepath\\/i, '');
                axios.post('http://localhost:8080/pooo/FRONTEND/sube-producto', formData)
                .then(res=>{
                    console.log(res);
                    let producto={
                    producto:document.getElementById("nombre-producto").value,
                    codigoProducto:"https://chart.googleapis.com/chart?cht=qr&chl="+x+"&chs=200x200",
                    descripcionProducto:document.getElementById("descripcion-producto").value,
                    code:codigo,
                    foto:"img/foto-productos/"+filename,
                    precio:document.getElementById("precio-producto").value,
                    descuento:document.getElementById("descuento-producto").value,
                    valoracion:5,
                    valoraciones:[],
                    comentarios:[],
                    codigoEmpresa:codigoEmpresa
                }
                
                    axios({
                        method:'PUT',
                        url:'../BACKEND/api/producto.php',
                        respType:'json',
                        data:producto
                    }).then(res=>{
                        console.log(res);
                    }).catch(error=>{
                        console.log(error);
                    })
                ;
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
function generarSucursales(){
    document.getElementById("sucursales").innerHTML="";
    axios({
        method:'GET',
        url:'../BACKEND/api/empresa.php?id='+codigoEmpresa,
        respType:'json'
    })
    .then(res=>{
            var empresa=res.data;
            var z=0;
            var x=1;
            for(var i=0;i<empresa.sucursales.length;i++){
                axios({
                    method:'GET',
                    url:'../BACKEND/api/sucursal.php?id='+empresa.sucursales[i],
                    respType:'json'
                })
                .then(res=>{
                    sucursal=res.data;
                    z+=i;
                    document.getElementById("sucursales").innerHTML+=`
                    <button class=button type="button" data-toggle="collapse" data-target="#multiCollapse${sucursal.telefono}${z}" aria-expanded="false" aria-controls="multiCollapse${sucursal.telefono}${z}">Sucursal&nbsp; #${x}&nbsp;en&nbsp;${sucursal.pais}</button>
                    <div class="collapse multi-collapse" id="multiCollapse${sucursal.telefono}${z}">
                        <div class="card">
                        <div class="card-header" id="heading${sucursal.telefono}">
                            <h2 class="mb-0">
                                Sucursal&nbsp; #${x}&nbsp;en&nbsp;${sucursal.pais}<a href="#" class="fa fa-trash-o" onClick="eliminarSucursal(${x-1})" data-toggle="tooltip" data-placement="bottom" title="Eliminar sucursal"></a>
                            </h2>
                        </div>
                        
                        <img src="${sucursal.foto}" class="card-img-top" alt="...">
                          <div class="card-body row">
                                <div class="col-4 col-xs-4 col-md-4 col-sm-4 col-xl-4 col-lg-4"><strong><h2>Teléfono: </h2></strong></div>
                                <div class="col-8 col-xs-8 col-md-8 col-sm-8 col-xl-8 col-lg-8"><h2 style="color:#686466">${sucursal.telefono} </h2></div>

                                <div class="col-4 col-xs-4 col-md-4 col-sm-4 col-xl-4 col-lg-4"><b><h2>Dirección: </h2></b></div>
                                <div class="col-8 col-xs-8 col-md-8 col-sm-8 col-xl-8 col-lg-8"><h2 style="color:#686466">${sucursal.direccion} </h2></div>
                                
                          </div>
                        </div>
                      </div>
                    </div> 
                        `;
                    x+=1;
                  
                }).catch(error=>{
                    console.log(error);
            })
            }
        }).catch(error=>{
            console.log(error);
    })

}
generarSucursales();
function agregarSucursal(){
    let codigo=uuid.v1();
    var picForm1=$('#picForm1');
    let formData= new FormData(picForm1[0]);
    console.log(formData);
    var filename = $('#inputSucursal').val().replace(/C:\\fakepath\\/i, '');
    axios.post('http://localhost:8080/pooo/FRONTEND/sube-sucursal', formData)
    .then(res=>{console.log(res);
        let sucursal={
            codigoSucursal:codigo,
            codigoEmpresa:codigoEmpresa,
            direccion:document.getElementById("direccion-sucursal").value,
            telefono:document.getElementById("telefono-sucursal").value,
            pais:document.getElementById("pais-sucursal").value,
            longitud:document.getElementById("longitud-sucursal").value,
            latitud:document.getElementById("latitud-sucursal").value,
            foto:"img/empresas/sucursales/"+filename,
        }
        
        axios({
            method:'POST',
            url:'../BACKEND/api/sucursal.php',
            respType:'json',
            data:sucursal
        }).then(res=>{
            console.log(res);
        }).catch(error=>{
            console.log(error);
        })
        axios({
            method:'PUT',
            url:'../BACKEND/api/empresa.php',
            respType:'json',
            data:{
                accion:"agregar-sucursal",
                codigoEmpresa:codigoEmpresa,
                codigoSucursal:codigo
            }
        }).then(res=>{
            console.log(res);
            generarSucursales();
        }).catch(error=>{
            console.log(error);
        })
        
    }).catch(error=>{
        console.log(error);
    })
}

function eliminarSucursal(indice){
    axios({
        method:'GET',
        url:'../BACKEND/api/empresa.php?id='+codigoEmpresa,
        respType:'json'
    })
    .then(res=>{
            var empresa=res.data;
            axios({
                method:'DELETE',
                url:'../BACKEND/api/sucursal.php?id='+empresa.sucursales[indice],
                respType:'json'
            })
            .then(res=>{
                generarSucursales();
            }).catch(error=>{
                console.log(error);
            })
        }).catch(error=>{
            console.log(error);
        })

}

function vista() {
   
    var mas=document.getElementById("mas-sobre-la-compania");
    var masT=document.getElementById("mas-compania");
    var Tsuc=document.getElementById("Tsuc");
    var agrProm=document.getElementById("agregarPromociones");
    var ed=document.getElementById('ed');;
    if(mas.style.display==="none"){
        mas.style.display="block";
    }else{
        mas.style.display="none";
    }
    if(masT.style.display==="none"){
        masT.style.display="block";
        agrProm.innerHTML="PROMOCIONES PUBLICADAS";
        Tsuc.innerHTML="SUCURSALES";
        document.getElementById('editarPerfil').style.visibility="hidden";
    }else{
        masT.style.display="none";
        agrProm.innerHTML=`
        PROMOCIONES PUBLICADAS&nbsp;&nbsp;&nbsp;<a href="#popup1" class="fa fa-plus-circle" onclick="boton()" data-toggle="tooltip" data-placement="bottom" title="Agregar producto"></a>
        `;
        Tsuc.innerHTML=`SUCURSALES &nbsp;&nbsp;&nbsp; <a href="#popup2"class="fa fa-plus-circle" data-toggle="tooltip" data-placement="bottom" title="Agregar sucursal" ></a>
        `;
        document.getElementById('editarPerfil').style.visibility="visible";
    }
    if(Tsuc.style.visibility==="hidden"){
        Tsuc.style.visibility="visible ";
    }else{
        Tsuc.style.visibility="none !important";
    }
    if(ed.style.display==="none"){
        ed.style.display="block ";
    }else{
        ed.style.display="none !important";
    }
   /* if(document.getElementById('editarPerfil').style.display==="none"){
        console.log("hola 1");
        document.getElementById('editarPerfil').style.display="block ";
    }else{
        document.getElementById('editarPerfil').style.display="none";
        console.log("hola 2");
    }*/
   /* axios({
        method:'GET',
        url:'../BACKEND/api/empresa.php?id='+codigoEmpresa,
        respType:'json'
    })
    .then(res=>{
            var empresa=res.data;
            console.log(empresa);
            var p;
            for(p=0;p<empresa.productos;p++){
                var id='crearFicha'.p;
                console.log(id);
                var elemento=document.getElementById(id);
                if(elemento.style.display==="none"){
                    elemento.style.display="block ";
                }else{
                    elemento.style.display="none";
                }
            }
    }).catch(error=>{
            console.log(error);
    })*/
    var ToHide = document.getElementsByClassName("ficha"); 
        for(var i = 0; i < ToHide.length; i++){
            if(ToHide[i].style.display=="block"){
                ToHide[i].style.display = "none"; 
            }else{
                ToHide[i].style.display="block";
            }
        }
    var trash = document.getElementsByClassName("fa-trash-o"); 
        for(var i = 0; i < trash.length; i++){
            if(trash[i].style.display=="block"){
                trash[i].style.display = "none"; 
            }else{
                trash[i].style.display="block";
            }
        }
    var edit = document.getElementsByClassName("fa-edit"); 
        for(var i = 0; i < edit.length; i++){
            if(edit[i].style.display=="block"){
                edit[i].style.display = "none"; 
            }else{
                edit[i].style.display="block";
            }
        }
}
/*mapa
const LATITUD_CENTRO = 19.413793,
    LONGITUD_CENTRO =  -99.128145,
    ZOOM = 15;

const mapa = new ol.Map({
    target: 'mapa', // el id del elemento en donde se monta
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([LONGITUD_CENTRO, LATITUD_CENTRO]),
        zoom: ZOOM,
    })
});
finmapa*/
function mostrarGrafico(){
    
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(dibujarGrafico);

}
function dibujarGrafico() {
    // Tabla de datos: valores y etiquetas de la gráfica
    var data = google.visualization.arrayToDataTable([
    ['Texto', 'Valor numérico'],
    ['Texto1', 20.21],
    ['Texto2', 4.28],
    ['Texto3', 17.26],
    ['Texto4', 10.25]
    ]);
    var options = {
    title: 'Ejemplo con Google Charts: Gráfico de barras'
    }
    // Dibujar el gráfico
    new google.visualization.ColumnChart(
    //ColumnChart sería el tipo de gráfico a dibujar
    document.getElementById('grafico')
    ).draw(data, options);
    }