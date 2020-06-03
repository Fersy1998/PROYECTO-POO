var localStorage=window.localStorage;
var codigoEmpresa=localStorage.getItem('empresaCode');

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

    

var codigoCliente=getCookie("codigoUsuario");
console.log(codigoEmpresa);
var comentarioGlobal="";
function generarEmpresa(){
    document.getElementById("sucursales").innerHTML="";
    document.getElementById("opciones").innerHTML=`
    <div class="container">
    <div class="logo-box">
        <a href="index.html">
            <img style="width:100px" src="img/LOGO_ALL_PROMO.png" alt="">
        </a>
    </div>
    <nav>
        <button class="navbar-toggler visible-sm visible-xs" style=" color:rgb(255, 254, 255); background-color: rgb(238, 83, 135);" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"><i class="fa fa-bars"></i></span>
        </button>
        <div class="collapse navbar-collapse inline-flex" id="navbarNav">
            <ul>
                <li>
                    <a href="cliente#Perfil">Perfil</a>
                </li>
                <li>
                    <a href="cliente#seccion-promociones-favoritas">Promociones favoritas</a>
                </li>
                <li>
                    <a href="cliente#empresas-favoritas">Empresas favoritas</a>
                </li>
                
                <li>
                    <a href="logout.php">cerrar sesión</a>
                </li>

                <form role="search" method="get" id="searchform" action="">
                    <input type="text" value="" placeholder="search" class="" id="desplegar" onkeyup="filtrar()"/>
                    <label for="desplegar">
                        <a class="fa fa-search fa-lg" id="boton"></a>
                    </label>
                </form>
            </ul>
        </div>
    </nav>
</div>
    `;
    axios({
        method:'GET',
        url:'../BACKEND/api/empresa.php?id='+codigoEmpresa,
        respType:'json'
    })
    .then(res=>{
        console.log(res.data);
        empresa=res.data;
        productos=empresa.productos;
        document.getElementById("bannerEmpresa").innerHTML=`
        <img src="${empresa.banner}" class="d-block w-100 visible-md visible-lg" alt="...">
        <div class="contenido-slider visible-md visible-lg text-center"><br>
        </div>                               
        `;
        document.getElementById("perfil-empresa").innerHTML=`
        <div class="container">
        <div class="row">
            <div class="cabecera-de-seccion col-md-12 text-center">
                <h2>${empresa.nombreEmpresa}</h2>&nbsp;&nbsp;
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
        <div class="col-12 col-sm-12 col-md-5 col-lg-5">
            <div id="map"></div>
            <!--<iframe width="500" height="300" src="https://api.maptiler.com/maps/streets/?key=oFtOenj9IFPbVxEBpcC0#0.1/${empresa.latitud}/${empresa.longitud}"></iframe>-->
        </div>
    </div>
        <div class="row">
            <div class="cabecera-de-seccion col-12 text-center">
                <h2 id="mas-compania">Sobre nuestra compañía</h2>
        </div>
        <div>
                <p id="mas-sobre-la-compania" style="color:white;">
                    ${empresa.descripcion}
                </p>
            
        </div>
        </div>
        </div>
        
        `;
        //imprimiendo el mapa
        var long=Math.round(empresa.longitud * 100) / 100;
        var lat=Math.round(empresa.latitud * 100) / 100;
        var map = L.map('map').setView([long, lat], 8);
        var gl = L.mapboxGL({
          attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
          accessToken: 'not-needed',
          style: 'https://api.maptiler.com/maps/streets/style.json?key=oFtOenj9IFPbVxEBpcC0'
        }).addTo(map);
        var marker=L.marker([long ,lat]).addTo(map);
  

        //imprimiendo promociones de la empresa
        document.getElementById("row-promociones-empresa").innerHTML="";
        for(let p=0;p<empresa.productos.length; p++){
            console.log(empresa.productos[p]);
            axios({
                method:'GET',
                url:'../BACKEND/api/producto.php?id='+empresa.productos[p],
                respType:'json'
            })
            .then(res=>{
                console.log(p);
                var producto=res.data;
                console.log(res.data);
                
                document.getElementById("row-promociones-empresa").innerHTML+=`
                <div class="col-12 col-md-4 col-sm-4 col-lg-3 col-xs-6">
                <div class="card" style="background-color:transparent">
                    <div class="item-producto card-img-top">
                        <div class="imagen-producto">
                            <img src="${producto.foto}" class="card-img-top" alt="...">
                        </div>
                        <div class="agregar-fav producto-item-contenido">
                            <div class="fav-content sucursal-overlay">
                            <a href="#" class="fa fa-heart" onclick="agregarProductoFav('${producto.codigoProducto}')"></a>
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
                                    <a class="button MODAL-BUTTON " href="#popUp" onclick="generarPopUp(${p})">
                                        ver detalles
                                    </a>
                                </center>
                            </div>
                        </div>
                    </div> 
                `;
            })
            .catch(error=>{
                console.log(error);
            })
        }
        var z=0;
        var x=1;
        for(var i=0;i<empresa.sucursales.length;i++){
            axios({
                method:'GET',
                url:'../BACKEND/api/sucursal.php?id='+empresa.sucursales[i],
                respType:'json'
            })
            .then(res=>{
                console.log(res.data);
                sucursal=res.data;
                z+=i;
                document.getElementById("sucursales").innerHTML+=`
                <button class="button space" type="button" data-toggle="collapse" data-target="#multiCollapse${sucursal.telefono}${z}" aria-expanded="false" aria-controls="multiCollapse${sucursal.telefono}${z}">Sucursal&nbsp; #${x}&nbsp;en&nbsp;${sucursal.pais}</button>
                <div class="collapse multi-collapse" id="multiCollapse${sucursal.telefono}${z}">
                    <div class="card" style="width:100%;">
                    <div class="card-header" id="heading${sucursal.telefono}">
                        <h2 class="mb-0">
                            Sucursal&nbsp; #${x}&nbsp;en&nbsp;${sucursal.pais}
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
generarEmpresa();
/*****generar popUp */
function generarPopUp(p){
    var Ccomentario;
    axios({
        method:'GET',
        url:'../BACKEND/api/empresa.php?id='+codigoEmpresa,
        respType:'json'
    })
    .then(res=>{
        console.log(res.data);
        var empresa=res.data
            axios({
                method:'GET',
                url:'../BACKEND/api/producto.php?id='+empresa.productos[p],
                respType:'json'
            })
            .then(res=>{
                words("");
                var producto=res.data;
                console.log(res.data);
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
                            console.log("*************comentario");
                            console.log(comentario);
                            axios({
                                method:'GET',
                                url:'../BACKEND/api/usuario.php?id='+comentario.codigoUsuario,
                                respType:'json',
                            })
                            .then(res=>{
                                usuario=res.data;
                                console.log("usuario*********************");
                                console.log(usuario);
                                console.log("usuario*********************");
                                console.log(comentario.contenido);
                                
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
                                console.log(Ccomentario);
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
                        
                    
                    console.log(Ccomentario);
                
                
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
                                    <center>
                                    <img src="${producto.foto}" ><hr>
                                    <span class="hint-star"style="width:100%;">${cods}
                                    </span>
                                    </center>
                                    </div>
                                    </div>
                          
                    </div>
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
    console.log("comentario global en obtener");
    console.log(comentarioGlobal);
    document.getElementById("comments-list").innerHTML=comentarioGlobal;
}

function words(comentario){
    comentarioGlobal=comentario;
}
function comentar(p){
    var codigoComent=uuid.v1();
    cont={
        accion: "agregar-comentario",
        codigoProducto: p,
        codigoComentario: codigoComent
    }
    axios({
        method:'PUT',
        url:'../BACKEND/api/producto.php?',
        respType:'json',
        data:cont
    }).then(res=>{
        console.log(res);
    }).catch(error=>{
        console.log(error);
    })
    var comentarioNuevo={
        codigoComentario:codigoComent,
        codigoProducto:p,
        codigoUsuario:codigoCliente,
        contenido:document.getElementById("comentario").value
    }
    axios({
        method:'POST',
        url:'../BACKEND/api/comentario.php',
        respType:'json',
        data:comentarioNuevo
    }).then(res=>{
        console.log(res);
    }).catch(error=>{
        console.log(error);
    })
    

}
/*
 * 
 * SEARCH
 */
const resultado=document.querySelector("#resultado-busqueda");
function filtrar(){
    
    const formulario=document.querySelector("#desplegar");
    axios({
        method:'GET',
        url:'../BACKEND/api/producto.php',
        respType:'json',

    })
    .then(res=>{
        var productos=[];
        productos=res.data;
        
        console.log(productos);
        console.log(formulario.value);
        const texto=formulario.value.toLowerCase();
        document.getElementById("productos-busqueda").innerHTML="";
        var c=0;
        
            for(p=0;p<productos.length;p++){
                let productol=productos[p].producto.toLowerCase();
               
                if(productol.indexOf(texto)!==-1){
                    document.getElementById("indexsearch").style.visibility="visible";
                    document.getElementById("indexsearch").style.display="flex";
                    document.getElementById("sin-resultados").style.display="none";
                    document.getElementById("sin-resultados").style.visibility="hidden";
                    generarProductosBusqueda(productos[p],p);
                    console.log(productos[p]);
                    c+=1;
                }
            }
            
        
    
        if(c==0){
            
            document.getElementById("indexsearch").style.visibility="hidden";
            document.getElementById("indexsearch").style.display="none";
            document.getElementById("sin-resultados").style.display="flex";
            document.getElementById("sin-resultados").style.visibility="visible";
        }

      
    })
    .catch(error=>{
        console.log(error);
    })
   
}
function generarProductosBusqueda(product,p){
    console.log(product.producto);
    document.getElementById("productos-busqueda").innerHTML+=`
    <div class="col-md-3 col-sm-6 col-lg-3 col-xs-6">
        <div class="card">
            <div class="item-producto card-img-top">
                <div class="imagen-producto">
                    <img src="${product.foto}" class="card-img-top" alt="...">
                </div>
                <div class="agregar-fav service-4">
                    <div class="fav-content" type="button" data-toggle="tooltip" data-placement="bottom" title="Añadir a favoritos">
                        <a href="#" class="fa fa-heart" onclick="agregarProductoFav('${product.codigoProducto}')"></a><br>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <h3 class="card-title">${product.producto}</h3>
                <img class="icono-nuevo-producto" src="img/icons8-new-50-2.png" alt="">${product.descuento}
                <center>
                    <a class="button MODAL-BUTTON button-fav-p"  href="#popUp" onclick="generarPopUp('${p}')">
                        ver detalles
                    </a>
                </center>
            </div>
        </div>
    </div>
    `
};

function agregarProductoFav(codP){
    console.log(getCookie("codigoUsuario"));
    var agregarProducto={
        accion:"agregar-producto-fav",
        codigoProducto:codP,
        cliente:getCookie("codigoUsuario")
    }
    axios({
        method:'PUT',
        url:'../BACKEND/api/usuario.php',
        respType:'json',
        data:agregarProducto
    }).then(res=>{
        console.log(res);
    }).catch(error=>{
        console.log(error);
    })
}