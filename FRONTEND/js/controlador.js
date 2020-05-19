var productos=[];
var mis_productos=[]
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
    console.log("data");
    console.log(data);
    for(let i=0;i<data.length;i++){
        productos[i]=data[i][1];
        console.log(productos[i]);
        
    }
    generarPromociones();
    generarListadoEmpresas();
}
getProductos();
function getEmpresas(){//Función para obtener las empresas y usuarios y llenar los array

    axios({
        method:'GET',
        url:'/BACKEND/api/empresa.php',
        responseType:'json',

    })
    .then(res=>{
        this.mis_empresas=Object.entries(res.data);
        console.log(mis_empresas);
        llenarEmpresas(mis_empresas)
        getUsuarios();

    })
    .catch(error=>{
        console.log(error);
    })
}

/********generarpromociones */
function generarPromociones(){
    document.getElementById("row-seccion-landing-page-promociones").innerHTML="";
    console.log("lenght productos: "+productos.length);
    for(let p=0; p<productos.length;p++){

            document.getElementById("row-seccion-landing-page-promociones").innerHTML+=`
            <div class="col-md-3 col-sm-6 col-lg-3 col-xs-6">
            <div class="card">
                <div class="item-producto card-img-top">
                    <div class="imagen-producto">
                        <img src="${productos[p].foto}" class="card-img-top" alt="...">
                    </div>
                    <div class="agregar-fav service-4">
                        <div class="fav-content">
                            <a href="#" class="fa fa-heart"></a> <br>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <h3 class="card-title">${productos[p].producto}</h3>
                    <img class="icono-nuevo-producto" src="img/icons8-new-50-2.png" alt="">${productos[p].descuento}%
                    <center>
                        <a class="button MODAL-BUTTON button-fav-p" href="#popup1" onclick="generarPopUp(${p})">
                            ver detalles
                        </a>
                    </center>
                </div>
            </div>
        </div> 
            `
        };
    }

/**
 * 
 * SEARCH
 */
const formulario=document.querySelector("#desplegar");
const resultado=document.querySelector("#resultado-busqueda");
const filtrar= ()=>{
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
    document.getElementById("productos-busqueda").innerHTML+=`
    <div class="col-md-3 col-sm-6 col-lg-3 col-xs-6">
        <div class="card">
            <div class="item-producto card-img-top">
                <div class="imagen-producto">
                    <img src="${productos[product].foto}" class="card-img-top" alt="...">
                </div>
                <div class="agregar-fav service-4">
                    <div class="fav-content">
                        <a href="#" class="fa fa-heart"></a> <br>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <h3 class="card-title">${productos[product].producto}</h3>
                <img class="icono-nuevo-producto" src="img/icons8-new-50-2.png" alt="">${productos[product].descuento}%
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

/****formulario de inscripción usuario */
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
            window.open("cliente.html");
        }
    }
    
};

//para guardar usuario
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
            codigoCliente:uuid.v1(),
            sexo:document.getElementById("sexo").value,
            correo:document.getElementById("correo").value,
            contrasena:document.getElementById("password").value,
            productosFavoritos:[],
            empresasFavoritas:[],
            carrito:[]
        
        }
        axios({
            method:'POST',
            url:'../BACKEND/api/usuario.php',
            respType:'json',
            data:cliente_nuevo
        }).then(res=>{
            console.log(res);
        }).catch(error=>{
            console.log(error);
        })
    
    }).catch(error=>{
        console.log(error);
    })
   
    getUsuarios();
}
function vaciarformulario(){
    document.getElementById("password").value="";
    document.getElementById("correo").value="";
    document.getElementById("first-name").value="";
    document.getElementById("last-name").value="";
    document.getElementById("sexo").value="";
}

/*****generar popUp */
function generarPopUp(p){
    var cs=5-productos[p].valoracion;
    var cods="";
    for(let s=0; s<productos[p].valoracion; s++){
        cods+=`<i class="fa fa-star"></i>`;
    }
    for(let s=0; s<cs; s++){
        cods+=`<i class="fa fa-star-o"></i>`;
    }
    var nuevoprecio= productos[p].precio - ((parseInt(productos[p].descuento , 10))/100)*parseInt(productos[p].precio);    
    console.log(productos[p].codigoEmpresa);
    axios({
        method:'GET',
        url:'../BACKEND/api/empresa.php?id='+productos[p].codigoEmpresa,
        respType:'json',
        
    })
    .then(res=>{
        console.log(res.data);
        const empresa=res.data;
        document.getElementById("popup1").innerHTML=`
        <div class="popup">
                <div class="content">
                    <br>
                    <a class="close" href="#">x</a>
                    <h2>${productos[p].producto}</h2>
                    <div class="container-fluid detalles_producto">
                        <div class="row">
                            <div class="col-6 col-xs-6 col-sm-6 col-md-6 collg-6 col-xl-6">
                                <h3>Empresa: </h3><p class="information">${empresa.nombreEmpresa}</p>
                                <h3>Precio: </h3><p class="information">${productos[p].precio}L</p>
                                <h3>Descuento: </h3><p class="information">${productos[p].descuento}%</p>
                                <h3>Pago total: </h3><p class="information">${nuevoprecio}L</p>
                            </div>
                            <div class="col-6 col-xs-6 col-sm-6 col-md-6 collg-6 col-xl-6">
                                <div class="product-image">
                                    <img src="${productos[p].foto}">
                                </div>
                                <div>
                                    <span class="estrellas" id="">${cods}
                                    </span>
                                </div>
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
   
};
/***generar listado empresas */
function generarListadoEmpresas(){
    document.getElementById("row-empresas-index").innerHTML=""
    for(let e=0; e<this.empresas.length;e++){
        document.getElementById("row-empresas-index").innerHTML+=`
        <div class="empresas-marcas-item col-md-4 col-sm-6 col-lg-3 col-xs-6">
        <div class="VENTAJAS-DE-ALL-PROMO-contenedor">
            <img src="${empresas[e].logo}" alt="">
            <div class="VENTAJAS-DE-ALL-PROMO-overlay">
                <h3>Conoce el perfil de la empresa</h3>
                <a>
                    <button type="button" class="button btn-primary"  onclick="generarEmpresa(${empresas[e].codigoEmpresa})" button" data-toggle="modal" data-target="#">
                    Ir al perfil
                    </button>
                </a>
            </div> 
        </div> 
    </div>
        `;
    };
}
generarListadoEmpresas();


/****abrir empresa */

function generarEmpresa(e){

    var perfil_empresa = document.open("text/html","replace");

    var productosE="";
    for(let p=0;p<productos.length;p++){
        productosE+=`
            <div class="col-md-6 col-sm-6 col-lg-4 col-xs-6">
            <div class="card" style="background-color:transparent">
                <div class="item-producto card-img-top">
                    <div class="imagen-producto">
                        <img src="${productos[p].foto}" class="card-img-top" alt="...">
                    </div>
                    <div class="agregar-fav service-4">
                        <div class="fav-content">
                            <a href="#" class="fa fa-heart"></a> <br>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <h3 class="card-title">${productos[p].producto}</h3>
                    <img class="icono-nuevo-producto" src="img/icons8-new-50-2.png" alt="">${productos[p].descuento}%
                    <ul>
                                <li class="detalle-producto-con-promocion-empresa">
                                    <a href="#" class="fa fa-database"></a>&nbsp;&nbsp;&nbsp;Precio:${productos[p].precio}L
                                </li>
                                <li class="detalle-producto-con-promocion-empresa">
                                    <a href="#" class="fa fa-home"></a>
                                    <span>
                                        &nbsp;&nbsp;&nbsp;Sucursales:
                                        <ol>
                                            <li><a href="#Tienda1">Tienda 1</a></li>
                                            <li><a href="#Tienda2">Tienda 2</a></li>
                                            <li><a href="#Tienda3">Tienda 3</a></li>
                                        </ol>
                                    </span>
                                </li>
                            </ul>
                            <br><br><br><br>
                            <hr>
                            <center>
                                <a class="button MODAL-BUTTON " href="#popup1" onclick="generarPopUp(${e},${p})">
                                    ver detalles
                                </a>
                            </center>
                        </div>
                    </div>
                </div> 
        `;
    };


    var texto =`<!DOCTYPE html>
    <head>
        <meta charset="utf-8">
        <title>ALL PROMO</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css?family=Anton|Berkshire+Swash|Bungee+Inline|Bungee+Shade|Changa|Federo|Geo|Gugi|Kumar+One|Lobster|Monoton|Sen|Sonsie+One|Tomorrow|Vampiro+One|Voltaire&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/font-awesome.css">
        <link rel="stylesheet" href="css/all_promo_style.css">
        <link rel="shortcut icon" type="image/x-icon" href="img/LOGO_ALL_PROMO.ico" />
    </head>
    <body id="empresa-generada">
        <div>
            <div class="encabezado">
                <div class="menu-contenedor">
                    <header>
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
                                            <a href="#promociones-empresaE">Promociones</a>
                                        </li>
                                        <li>
                                            <a href="index.html#VENTAJAS-DE-ALL-PROMO">Ventajas</a>
                                        </li>
                                        <li>
                                            <a href="index.html#Marcas-de-empresas">Empresas</a>
                                        </li>
                                        <li>
                                            <a href="index.html#inscripcion">Suscríbete</a>
                                        </li>
                                        <li>
                                            <a href="inscripcion-empresa.html">Suscribir empresa</a>
                                        </li>
                                        <li>
                                            <a href="inicio-sesion.html">Iniciar sesión</a>
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
                    </header>
                </div>
            </div>
            <div>
                <div class="slider visible-lg visible-md">
                    <div class="flexslider">
                        <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="${banner}" class="d-block w-100 visible-md visible-lg" alt="...">
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
        <div class="seccion container" id="sin-resultados">
            <P class="d-flex text-center">No se han encontrado productos que coincidan con tu búsqueda.</P>
        </div>
        
        <div class="seccion" id="indexsearch">
            <div class="container">
                <div class="row">
                    <div class="cabecera-de-seccion col-md-12 text-center">
                        <h2>RESULTADOS</h2>
                    </div>
                </div>
                <div class="row" id="productos-busqueda">
                </div>

            </div>
        </div>

        <div class="seccion" id="perfil-empresa">
            <div class="container">
                <div class="row">
                    <div class="cabecera-de-seccion col-md-12 text-center">
                        <h2>${nombreEmpresa}</h2>
                    </div> 
                </div>
                <div class="row">
                    <div class="logo-perfil-empresa col-md-3 col-sm-6 col-lg-3">
                        <div class="imagen-empresa-y-datos">
                            <img src="${logo}" alt="">
                            <div class="logo-datos-empresa">
                                <h3>${nombreEmpresa}</h3>
                                <span>Siguenos en nuestras redes sociales</span>
                                <ul class="social">
                                    <li><a href="#" class="fa fa-facebook"></a></li>
                                    <li><a href="#" class="fa fa-twitter"></a></li>
                                    <li><a href="#" class="fa fa-linkedin"></a></li>
                                </ul>
                            </div>
                        </div> 
                    </div>
                    <div class="detalles-empresa col-md-9 col-lg-9 col-sm-6">
                        <div>
                            <h2>Datos generales</h2>
                            <a href="#" class="fa fa-phone">&nbsp;&nbsp;&nbsp; ${telefono}</a><br>
                            <a href="#" class="fa fa-location-arrow">&nbsp;&nbsp;&nbsp;Col. Yisoi, Huendae Prosel</a><br>
                            <a href="#" class="fa fa-external-link">&nbsp;&nbsp;&nbsp;https://xbox.com/</a><br>
                            <a href="#" class="fa fa-external-link">&nbsp;&nbsp;&nbsp;https://xbox.com/it-IT</a><br>
                            <a href="#" class="fa fa-support">&nbsp;&nbsp;&nbsp;CD-R 700MB/DVD 4,7GB</a> <br>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="cabecera-de-seccion col-12 text-center">
                            <h2>Sobre nuestra compañía</h2>
                    </div>
                    <div>
                            <p id="mas-sobre-la-compania">
                            ${descripcion}
                            </p>
                        
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="seccion" id="promociones-empresaE">
            <div class="container">
                <div class="row">
                    <div class="cabecera-de-seccion col-md-12 text-center">
                        <h2>PROMOCIONES</h2>
                    </div>
                </div>
                <div class="row" id="rowPromocionesE">${productosE}
                </div>
            </div>
        </div>



        <div class="seccion" id="#sucursal-seccion">
            <div class="container">
                <div class="row">
                    <div class="cabecera-de-seccion col-md-12 text-center">
                        <h2>SUCURSALES</a></h2>
                    </div>
                </div>
                <div class="row">
                    <div class="sucursal-item col-md-6 col-sm-6 col-lg-3 col-xs-6">
                        <div class="sucursal-item-contenido">
                            <img src="img/Marcas/banofee.jpg" alt="">
                            <div class="sucursal-overlay">
                                <h3>SUCURSAL 1</h3><br>
                                <button type="button" class="btn btn-primary  button" data-toggle="modal" data-target="#">
                                    Ver detalles
                                </button>
                            </div>
                        </div> 
                    </div>
                   
                    <div class="sucursal-item col-md-6 col-sm-6 col-lg-3 col-xs-6">
                        <div class="sucursal-item-contenido">
                            <img src="img/Marcas/Intel.png" alt="">
                            <div class="sucursal-overlay">
                                <h3>SUCURSAL 1</h3><br>
                                <button type="button" class="btn btn-primary  button" data-toggle="modal" data-target="#">
                                    Ver detalles
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="sucursal-item col-md-6 col-sm-6 col-lg-3 col-xs-6">
                        <div class="sucursal-item-contenido">
                            <img src="img/Marcas/the-thing-minimalista-fondo-blanco.jpg" alt="">
                            <div class="sucursal-overlay">
                                <h3>SUCURSAL 1</h3><br>
                                <button type="button" class="btn btn-primary  button" data-toggle="modal" data-target="#">
                                    Ver detalles
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="sucursal-item col-md-6 col-sm-6 col-lg-3 col-xs-6">
                        <div class="sucursal-item-contenido">
                            <img src="img/Marcas/red.jpg" alt="">
                            <div class="sucursal-overlay">
                                <h3>SUCURSAL 1</h3><br>
                                <button type="button" class="btn btn-primary  button" data-toggle="modal" data-target="#">
                                    Ver detalles
                                </button>
                            </div>
                        </div> 
                    </div>
                    
                </div> 
            </div> 
        </div> 
        <footer>
            
                <div class="footer-content">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="col-md-4">
                                <div class="copyright-text">
                                    <p>Copyright &copy; 2020 <a href="#">ALL PROMO</a>
                                    </p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="back-to-top">
                                    <a href="#top"><i class="fa fa-angle-up"></i></a>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="social-icons">
                                    <ul>
                                        <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                                        <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                        <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                                        <li><a href="#"><i class="fa fa-rss"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>
        
        </footer>
        <div id="popup1" class="overlay">
        
        </div>
        



        
        <script src="js/jquery-1.11.0.min.js"></script>
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>

        <script src="js/controlador.js"></script>
        

    </body>
</html>
    `;
    perfil_empresa.write(texto);
    perfil_empresa.close();
};


