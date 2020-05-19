
var productos=[];
var mis_productos=[]
var comentarioGlobal="nada";
var codigoCliente="cea32440-97be-11ea-b3cc-2fb249f7e1a4";
function getProductos(){
    axios({
        method:'GET',
        url:'../BACKEND/api/producto.php',
        respType:'json',

    })
    .then(res=>{
        this.mis_productos=Object.entries(res.data);
        console.log(mis_productos);
        llenarProductos(mis_productos);
    })
    .catch(error=>{
        console.log(error);
    })
}
function llenarProductos(data){
    for(let i=0;i<data.length;i++){
        productos[i]=data[i][1];
    }
}
getProductos();

/*function getUsuario(){
    axios({
        method:'GET',
        url:'../BACKEND/api/usuario.php?id='+codigoCliente,
        respType:'json',
        
    })
    .then(res=>{
        llenarCliente(res.data);
    })
    .catch(error=>{
        console.log(error);
    })

}
function llenarCliente(client){
    this.cliente[0]=client;
    console.log(cliente[0]);
    console.log(cliente[0].nombreCliente);
    console.log(cliente[0]["apellidoCliente"]);
}
console.log(getUsuario());



console.log("Cliente"+cliente);
console.log(this.cliente);
console.log(cliente[0]["apellidoCliente"]);
console.log(this.cliente[0].nombreCliente);
console.log(cliente);*/
console.log("ooooooooooooooooooooooooooooooooooooooooooooooo");

/*****generar popUp */
function generarPopUp(p){
    var Ccomentario=""; 
    var cs=5-productos[p].valoracion;
    var cods="";
    var c=1;
    for(let s=0; s<productos[p].valoracion; s++){
        console.log(c);
        cods+=`<i class="fa fa-star" onClick="calificar(${c},${p})" data-toggle="tooltip" data-placement="bottom" title="Calificar promoción"></i>`;
        c+=1;
    }
    for(let s=0; s<cs; s++){
        console.log(c);
        cods+=`<i class="fa fa-star-o" onClick="calificar(${c},${p})" data-toggle="tooltip" data-placement="bottom" title="Calificar promoción"> </i>`;
        c+=1;
    }    
    var nuevoprecio= parseInt(productos[p].precio,10) - ((parseInt(productos[p].descuento , 10))/100)*parseInt(productos[p].precio);    
    console.log(productos[p].codigoEmpresa);
    
    var comentarios=productos[p].comentarios;
    
    axios({
        method:'GET',
        url:'../BACKEND/api/empresa.php?id='+productos[p].codigoEmpresa,
        respType:'json',
        
    })
    .then(res=>{
        const empresa=res.data;
        console.log("*************comentarios");
        console.log(comentarios);
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
                                    <div class="comment-avatar col-lg-2 col-md-2 col-sm-2 col-xs-2 col-xl-2"><img src="${usuario.fotoPerfil}" alt=""></div>
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
                console.log(Ccomentario);
            }   
        }else{
            Ccomentario=`<h3 style="color:#ccc;">No hay comentarios para este producto</h3>`;
            words(Ccomentario);
        }
        console.log("comentario global****#$#");
        console.log(comentarioGlobal);
        console.log(Ccomentario);
        document.getElementById("popup1").innerHTML=`
        <div class="popup">
                <div class="content">
                    <br>
                    <a class="close" id="close" onClick="words(null)"href="#">x</a>
                    <h2>${productos[p].producto}</h2>
                    <div class="container-fluid detalles_producto">
                        <div class="row">
                            <div class="col-6 col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                <h3>Empresa: </h3><p class="information">${empresa.nombreEmpresa}</p>
                                <h3>Precio: </h3><p class="information">${productos[p].precio}L</p>
                                <h3>Descuento: </h3><p class="information">${productos[p].descuento}%</p>
                                <h3>Pago total: </h3><p class="information">${nuevoprecio}L</p>
                            </div>
                            <div class="col-6 col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                <div class="product-image">
                                    <img src="${productos[p].foto}">
                                </div>
                                <div>
                                    <span class="estrellas" id="">${cods}
                                    </span>
                                </div>
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
                        <textarea class='autoExpand' rows='3' data-min-rows='3' placeholder='Escribe un comentario' id="comentario"></textarea>
                        </div>
                        <center><button class="button" onClick="comentar(${p})"><i class="fa fa-paper-plane"></i>&nbsp;&nbsp;Dejar un comentario</button></center>
                    </div>
                </div>
            </div>
        `;
    })
    .catch(error=>{
        console.log(error);
    }) 
};
function obtenerComentarioGlobal(){
    console.log("comentario global en obtener");
    console.log(comentarioGlobal);
    document.getElementById("comments-list").innerHTML=comentarioGlobal;
}

function words(comentario){
    comentarioGlobal=comentario;
}
/**autoexpandir comentario */
$(document)
    .one('focus.autoExpand', 'textarea.autoExpand', function(){
        var savedValue = this.value;
        this.value = '';
        this.baseScrollHeight = this.scrollHeight;
        this.value = savedValue;
    })
    .on('input.autoExpand', 'textarea.autoExpand', function(){
        var minRows = this.getAttribute('data-min-rows')|0, rows;
        this.rows = minRows;
        rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 16);
        this.rows = minRows + rows;
    });
/**comentar un producto */
function comentar(p){
    var codigoComent=uuid.v1();
    cont={
        accion: "agregar-comentario",
        codigoProducto: productos[p].code,
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
        codigoProducto:productos[p].codigoProducto,
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
    
    generarProductosFavoritos();
    generarPopUp(p);

}
/**
 * 
 * SEARCH
 */
const resultado=document.querySelector("#resultado-busqueda");
function filtrar(){
    const formulario=document.querySelector("#desplegar");
   
    console.log(formulario.value);
    const texto=formulario.value.toLowerCase();
    document.getElementById("productos-busqueda").innerHTML="";
    var c=0;
    
        for(let p=0;p<productos.length;p++){
            let productol=productos[p].producto.toLowerCase();
            if(productol.indexOf(texto)!==-1){
                document.getElementById("indexsearch").style.visibility="visible";
                document.getElementById("indexsearch").style.display="flex";
                document.getElementById("sin-resultados").style.display="none";
                document.getElementById("sin-resultados").style.visibility="hidden";
                generarProductosBusqueda(p);
                c+=1;
            }
        }
        
    

    if(c==0){
        
        document.getElementById("indexsearch").style.visibility="hidden";
        document.getElementById("indexsearch").style.display="none";
        document.getElementById("sin-resultados").style.display="flex";
        document.getElementById("sin-resultados").style.visibility="visible";
    }
}
function generarProductosBusqueda(product){
    console.log(productos[product].producto);
    document.getElementById("productos-busqueda").innerHTML+=`
    <div class="col-md-3 col-sm-6 col-lg-3 col-xs-6">
        <div class="card">
            <div class="item-producto card-img-top">
                <div class="imagen-producto">
                    <img src="${productos[product].foto}" class="card-img-top" alt="...">
                </div>
                <div class="agregar-fav service-4">
                    <div class="fav-content" type="button" data-toggle="tooltip" data-placement="bottom" title="Añadir a favoritos">
                        <a href="#" class="fa fa-heart" onclick="agregarProductoFav(${product})"></a><br>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <h3 class="card-title">${productos[product].producto}</h3>
                <img class="icono-nuevo-producto" src="img/icons8-new-50-2.png" alt="">${productos[product].descuento}
                <center>
                    <a class="button MODAL-BUTTON button-fav-p"  href="#popup1" onclick="generarPopUp(${product})">
                        ver detalles
                    </a>
                </center>
            </div>
        </div>
    </div>
    `
};

/***Generar datos cliente */

function generarCliente(){
    var usuario;
    axios({
        method:'GET',
        url:'../BACKEND/api/usuario.php?id='+codigoCliente,
        respType:'json',
        
    })
    .then(res=>{
        console.log(res.data);
            const usuario=res.data;
            document.getElementById("Perfil").innerHTML=`
            <div class="container">
            <div class="row">
                <div class="cabecera-de-seccion col-md-12 text-center">
                    <h2>${usuario.nombreCliente}&nbsp&nbsp${usuario.apellidoCliente}</h2>
                    
                </div> 
            </div>
            <div class="row">
                    <div class="perfil-usuario col-md-12  col-lg-12 col-xs-12">
                        <div class="plantilla-usuario text-center">
                            <img src="${usuario.fotoPerfil}" class="img-circle"alt="">
                            <div class="perfil-overlay"><br><br>
                                <a href="#popup1" onclick="editarPerfil()"><h4>Editar Perfil</h4></a>
                            </div>
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
generarCliente();
generarEmpresasFavoritas();
generarProductosFavoritos();

/**GENERAR PRODUCTOS FAV */
function generarProductosFavoritos(){
    var usuario;
    axios({
        method:'GET',
        url:'../BACKEND/api/usuario.php?id='+codigoCliente,
        respType:'json',
        
    })
    .then(res=>{
        usuario=res.data;
    document.getElementById("row-seccion-promociones-favoritas").innerHTML="";
    for(let i=0;i<usuario.productosFavoritos.length;i++){
        for(p=0;p<productos.length;p++){
            if(usuario.productosFavoritos[i]==productos[p].codigoProducto){
                var cs=5-productos[p].valoracion;
                var cods="";
                var c=1;
                for(let s=0; s<productos[p].valoracion; s++){
                    cods+=`<i class="fa fa-star" onClick="calificar(${c},${p})" data-toggle="tooltip" data-placement="bottom" title="Calificar promoción"></i>`;
                    c+=1;
                }
                for(let s=0; s<cs; s++){
                    cods+=`<i class="fa fa-star-o" onClick="calificar(${c},${p})" data-toggle="tooltip" data-placement="bottom" title="Calificar promoción"></i>`;
                    c+=1;
                }    
                document.getElementById("row-seccion-promociones-favoritas").innerHTML+=`
                <div class="col-md-3 col-sm-6 col-lg-3 col-xs-6">
                <div class="card">
                    <div class="item-producto card-img-top" >
                        <div class="imagen-producto">
                            <img src="${productos[p].foto}" class="card-img-top" alt="...">
                    </div>
               
                </div>
            <div class="card-body">
                <h3 class="card-title">${productos[p].producto}</h3>
                <img class="icono-nuevo-producto" src="" alt=""> 30% de descuento
                
                <div class="opciones-producto-fav">
                    <ul>
                        <li ><a href="#" class="fa fa-trash-o" onClick="eliminarProducto(${p})" data-toggle="tooltip" data-placement="bottom" title="Eliminar promoción"> </a></li>
                        <li><a href="#" class="fa fa-shopping-cart" onClick="agregarCarrito(${p})" data-toggle="tooltip" data-placement="bottom" title="Agregar al carrito"></a></li>
                        <li><a href="#popup1"" class="fa fa-comment" onclick="comentarPopUp(${p})" data-toggle="tooltip" data-placement="bottom" title="Comentar promoción"></a></li><br>
                        <li class="calificar-promocion">${cods}</li>
                    </ul><br>
                </div><br>
                <div class="text-cente">
                    <a class="button MODAL-BUTTON button-fav-p"  href="#popup1" onclick="generarPopUp(${p})">
                        ver detalles
                    </a>
                </div>
                
            </div>
        </div>
    </div> 
    `;}
    }
       
        }
    }).catch(error=>{
        console.log(error);
    })
} 


function generarEmpresasFavoritas(){
    var usuario;
    axios({
        method:'GET',
        url:'../BACKEND/api/usuario.php?id='+codigoCliente,
        respType:'json',
        
    })
    .then(res=>{
        usuario=res.data;
        document.querySelector('#empresas-favoritas .row').innerHTML="";
        for(e=0;e<usuario.empresasFavoritas.length;e++){
            console.log(usuario.empresasFavoritas[e]);
            axios({
                method:'GET',
                url:'../BACKEND/api/empresa.php?id='+usuario.empresasFavoritas[e],
                respType:'json',
        
            })
            .then(res=>{
                const empresa=res.data;
                console.log(res.data);
                document.querySelector('#empresas-favoritas .row').innerHTML+=`
                <div class="empresas-marcas-item col-md-4 col-sm-6 col-lg-3     col-xs-6">
                    <div class="VENTAJAS-DE-ALL-PROMO-contenedor">
                        <img src="${empresa.logoimg}" alt="">
                        <div class="VENTAJAS-DE-ALL-PROMO-overlay">
                            <h3><a href="#" class="fa fa-trash-o" onClick="eliminarEmpresa(${empresa.codigoEmpresa})"></a></h3>
                            <a href="empresa-perfil.html">
                                    <button type="button" class="btn btn-primary  button" data-toggle="modal" data-target="#">
                                    Ir al perfil
                                    </button>
                            </a>
                        </div> 
                    </div> 
                </div>
                `;
            })
            .catch(error=>{
                console.log(error);
            })
        }
})
}
function editarPerfil(){
        axios({
            method:'GET',
            url:'../BACKEND/api/usuario.php?id='+codigoCliente,
            respType:'json',
            
        })
        .then(res=>{
            console.log(res.data);
            const usuario=res.data;
            document.getElementById("popup1").innerHTML=`
            <div class="popup special">
                    <div class="" style="width:100%: height:100%">
                        <br>
                        <a class="close" href="#">x</a>
                            <div class="cabecera-de-seccion col-md-12 text-center">
                                <h2>Edición de perfil</h2>
                            </div>
                            <div class="container-fluid detalles_producto" >
                                <div class="inscripcion-form " style="width:100%: height:100%">
                                    <form name="inscripcionform" id="inscripcionform">
                                    <p>
                                    <input name="first-name" class="datos"type="text" id="first-name" placeholder="Nombre" required value="${usuario.nombreCliente}">
                                </p>
                                <p>
                                    <input name="last-name" class="datos"type="text" id="last-name" placeholder="Apellido" required value="${usuario.apellidoCliente}">
                                </p>
                                <p>
                                    <SELECT id="sexo" class="datos" placeholder="Seleccionar género"  style="width: 100%; padding: 1%; color: gray;" value="${usuario.sexo}"> 

                                        <OPTION Value="Mujer">Mujer</OPTION>
                                        <OPTION Value="Hombre">Hombre</OPTION>
                                        <OPTION Value="Otro">Otro</OPTION>
                                        
                                        
                                    </SELECT>
                                </p>
                                <p>
                                    <input name="correo" class="datos"type="text" id="correo" placeholder="Correo electrónico" required > 
                                </p>
                                <p>
                                <h4>Contraseña:</h4>
                                    <input type="password" name="password" id="password" class="datos" required >
                                </p>
                                
                                </form>
                                <form action="post" name="picForm" id="picForm" enctype="multipart/form-data">
                                <p>
                                    Agrega una fotografía a tu perfil
                                    <input type="file" name="fotografia" class="datos" id="fotografia" placeholder="Agrega una fotografía a tu perfil" accept="image/x-png,image/gif,image/jpeg" />
                                </p>
                            </form>
                                </p>
                                <p>
                                    <input type="button"class="button"value="Guardar cambios" onclick="validarCamposIndex()">
                                </p>
                            
                        </div>
                    </div>
                </div>
            </div>
        
            `;
        })
        .catch(error=>{
            console.log(error);
        }) 
       /*<div class="container">
                <div class="row">
                    <div class="cabecera-de-seccion col-md-12 text-center">
                        <h2>REGISTRO DE EMPRESA</h2>
                        <p>Podrás vender tus productos a un mercado mayor en línea</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-8 registro-empresa">
                        <div class="inscripcion-form ">
                            <form name="inscripcionform" id="inscripcionform">
                                <h2>Nombre de la empresa: </h2>
                                <p>
                                    <input name="name-empresa" class="datos"type="text" id="name-empresa" placeholder="Ejemplo: ALL PROMO" required>
                                </p>
                                <h2>Email:</h2>
                                <p>
                                    <input name="email-empresa" class="datos"type="text" id="email-empresa" placeholder="Correo electrónico" required> 
                                </p>
                                <h2>País: </h2>*/
   
}
function agregarProductoFav(codP){
    console.log(codP);
    var codProducto=productos[codP].codigoProducto;
    console.log(codProducto);
    let agregarProducto={
        accion:"agregar-producto-fav",
        codigoProducto:codProducto,
        cliente:codigoCliente
    }
    axios({
        method:'PUT',
        url:'../BACKEND/api/usuario.php?id='+codigoCliente,
        respType:'json',
        data:agregarProducto
    }).then(res=>{
        console.log(res);
        generarProductosFavoritos();
    }).catch(error=>{
        console.log(error);
    })
}

function agregarCarrito(codP){
    console.log(codP);
    var codProducto=productos[codP].codigoProducto;
    console.log(codProducto);
    let agregarProducto={
        accion:"agregar-carrito",
        codigoProducto:codProducto,
        cliente:codigoCliente
    }
    axios({
        method:'PUT',
        url:'../BACKEND/api/usuario.php?id='+codigoCliente,
        respType:'json',
        data:agregarProducto
    }).then(res=>{
        console.log(res);
        window.alert("Has añadido correctamente un producto a tu carrito");
    }).catch(error=>{
        console.log(error);
    })
}
function eliminarProducto(codP){
    console.log(codP);
    const codProducto=productos[codP].codigoProducto;
    console.log(codProducto);
    axios({
        method:'PUT',
        url:'../BACKEND/api/usuario.php?id='+codigoCliente,
        data:{
            accion:"eliminar-producto-fav",
            codigoProducto:codProducto,
            codigoUsuario:codigoCliente
        },
        ResponseType:'json'
    }).then(res=>{
        console.log(res.data);
        generarProductosFavoritos();
    }).catch(error=>{
        console.log(error);
    });
}
function eliminarDeCarrito(codP){
    console.log(codP);
    const codProducto=productos[codP].codigoProducto;
    console.log(codProducto);
    axios({
        method:'PUT',
        url:'../BACKEND/api/usuario.php?id='+codigoCliente,
        data:{
            accion:"eliminar-producto-carrito",
            codigoProducto:codProducto,
            codigoUsuario:codigoCliente
        },
        ResponseType:'json'
    }).then(res=>{
        console.log(res.data);
        miCarrito();
    }).catch(error=>{
        console.log(error);
    });
}
function eliminarEmpresa(codEmpresa){
    console.log(codEmpresa);
    axios({
        method:'PUT',
        url:'../BACKEND/api/usuario.php?id='+codigoCliente,
        data:{
            accion:"eliminar-empresa-fav",
            codigoEmpresa:codEmpresa,
            codigoUsuario:codigoCliente
        },
        ResponseType:'json'
    }).then(res=>{
        console.log(res.data);
        generarEmpresasFavoritas();
    }).catch(error=>{
        console.log(error);
    });
}
/****formulario de Actualizar usuario */
function validarCamposIndex(){
    if(document.getElementById("first-name").value.length==0 || document.getElementById("last-name").value.length==0 ||document.getElementById("sexo").value.length==0 ||document.getElementById("correo").value.length==0 || document.getElementById("password").value.length==0 || document.getElementById("fotografia").value.length==0){
        alert("TODOS LOS CAMPOS SON REQUERIDOS");
    }else{
        let expresionCorreo=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        let expresionContrasena=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;
        if(!expresionCorreo.test(document.getElementById("correo").value)){
            alert("Sintaxis de correo electónico inválida");
        }else if(!expresionContrasena.test(document.getElementById("password").value)){
            alert("Ingrese una contraseña válida: mayúsculas, minúsculas, números y caracteres especiales");
        }else{
            guardarUsuario();
            //window.open("cliente.html");
        }
    }
    
};

//para guardar Actalizar
function guardarUsuario(){
    var picForm=$('#picForm');
    let formData= new FormData(picForm[0]);
    console.log(formData);
    axios.post('http://localhost:8080/pooo/FRONTEND/sube-usuario', formData)
    .then(res=>{console.log(res);
        
        let cliente_nuevo={
            nombreCliente:document.getElementById("first-name").value,
            apellidoCliente:document.getElementById("last-name").value,
            fotoPerfil:res.data,
            codigoCliente:codigoCliente,
            sexo:document.getElementById("sexo").value,
            correo:document.getElementById("correo").value,
            contrasena:document.getElementById("password").value
            
        }
        axios({
            method:'PUT',
            url:'../BACKEND/api/usuario.php?id='+codigoCliente,
            respType:'json',
            data:cliente_nuevo
        }).then(res=>{
            console.log(res);
            generarCliente();
        }).catch(error=>{
            console.log(error);
        })
    
    }).catch(error=>{
        console.log(error);
    })
}
//Mostrar Productos en el carrito
function generarCodigo(){
    return "https://chart.googleapis.com/chart?cht=qr&chl=" + $("#descripcion-producto").val() + "&chs=200x200";
};
function miCarrito(){
    axios({
        method:'GET',
        url:'../BACKEND/api/usuario.php?id='+codigoCliente,
        respType:'json',
        
    })
    .then(res=>{
        var productosCarrito=[]
        console.log(res.data);
        const usuario=res.data;

        productosCarrito=usuario.carrito;
        console.log(productosCarrito);
        document.getElementById("cuerpo").innerHTML="";
        for(let pc=0;pc<productosCarrito.length;pc++){
            console.log(productos.length);
            for(let p=0;p<productos.length;p++){
                console.log(productosCarrito.length);
                console.log("Carrito+++++++");
                console.log(productosCarrito[pc]);
                console.log("Productos+++++++");
                console.log(productos[p].codigoProducto);
                if(productosCarrito[pc]==productos[p].codigoProducto){
                    document.getElementById("descripcion-producto").value=productos[p].descripcion;
                    
                    console.log("***********precio**************");
                    console.log(productos[p].precio);
                    console.log(parseInt(productos[p].precio,10));
                   
                    axios({
                        method:'GET',
                        url:'../BACKEND/api/empresa.php?id='+productos[p].codigoEmpresa,
                        respType:'json',
                        
                    })
                 
                    .then(res=>{
                        var nuevoprecio= productos[p].precio - (productos[p].descuento/100)*productos[p].precio;
                        console.log(nuevoprecio);
                        console.log(res.data);
                        const empresa=res.data;
                        var code=generarCodigo();
                        document.getElementById("cuerpo").innerHTML+=`
                        <tr class="visible-lg visible-md visible-xl">
                            <td rowspan="6" border="1">
                                <img src="${productos[p].foto}" alt="">
                            </td>
                        </tr>
                        <tr>
                            <td><h3>Nombre:</h3></td>
                            <td>${productos[p].producto}</td>
                        </tr>
                        <tr>
                            <td>
                                <h3>Código QR:</h3>
                            </td>
                                <td> <img src="${productos[p].codigoProducto}";
                                class="qr-code img-thumbnail img-responsive">
                            </td>
                        </tr>
                        <tr>
                            <td><h3> Descuento del ${productos[p].descuento}%</h3></td>
                            <td><strike style="color:red">${productos[p].precio}</strike>
                                ${nuevoprecio}
                            </td>
                        </tr>
                        <tr>
                            <td><h3>Unidades:</h3></td>
                            <td> <input class="datos"type="number" name="unidades" id="unidades" min="0"></td>
                        </tr>
                        
                        <tr>
                            <td> <button class="button"onclick="eliminarDeCarrito(${p})">ELIMINAR</button></td>
                            <td><a class="button MODAL-BUTTON button-fav-p"  href="#popup1" onclick="generarPopUp(${p})">
                            ver detalles
                        </a></td>
                        </tr>
                        `;
                    }).catch(error=>{
                        console.log(error);
                    })
                } 
            }
        }
       
    }).catch(error=>{
        console.log(error);
    }) 
  
}
function calificar(calificacion, producto){
    console.log(calificacion);
    datos={
        accion:"agregar-valoracion",
        valor:calificacion,
        code:productos[producto].code
    }
    axios({
        method:'PUT',
        url:'../BACKEND/api/producto.php',
        respType:'json',
        data:datos
    }).then(res=>{
        console.log(res);
        window.alert("Se ha guardado tu calificación correctamente");
        generarProductosFavoritos();

    }).catch(error=>{
        console.log(error);
    })
}   
function comentarPopUp(p){
    document.getElementById("popup1").innerHTML=`
        <div class="popup">
                <div class="content text-center">
                    <br>
                    <a class="close" id="close" onClick="words(null)"href="#">x</a>
                    <h2>${productos[p].producto}</h2>
                    <div class="container-fluid detalles_producto">
                        <div></div>
                            <textarea class='autoExpand' rows='3' data-min-rows='3' placeholder='Escribe un comentario' id="comentario"></textarea>
                        </div>
                        <center>
                            <button class="button" onClick="comentar(${p})"><i class="fa fa-paper-plane"></i>&nbsp;&nbsp;Dejar un comentario</button>
                        </center>
                    </div>
                </div>
        </div>
        `;
}

