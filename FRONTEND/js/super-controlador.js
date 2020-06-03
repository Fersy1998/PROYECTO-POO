var productos=[];
var mis_productos=[];
var mis_empresas=[]
var empresas=[];
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
                            <div class="col-6 col-xs-6 col-sm-6 col-md-6 collg-6 col-xl-6" style="width:100%;">
                                <div class="product-image w-100" style="width:100%;">
                                    <img src="${productos[p].foto}"><hr>
                                    <span class="hint-star"style="width:100%;">${cods}
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
    axios({
        method:'GET',
        url:'../BACKEND/api/empresa.php',
        responseType:'json',

    })
    .then(res=>{
        var empresas=res.data;
        document.getElementById("row-empresas-index").innerHTML=""
        for(e=0; e<empresas.length;e++){
            document.getElementById("row-empresas-index").innerHTML+=`
            <div class="empresas-marcas-item col-md-4 col-sm-6 col-lg-3 col-xs-6">
            <div class="VENTAJAS-DE-ALL-PROMO-contenedor">
                <img src="${empresas[e].logoimg}" alt="">
                <div class="VENTAJAS-DE-ALL-PROMO-overlay">
                    <h3>Conoce el perfil de la empresa</h3>
                    <a>
                        <button type="button" class="button btn-primary"  onclick="generarEmpresa('${empresas[e].codigoEmpresa}')" button" data-toggle="modal" data-target="#">
                        Ir al perfil
                        </button>
                    </a>
                </div> 
            </div> 
        </div>
            `;
        };
    })
    .catch(error=>{
        console.log(error);
    })
   
}
generarListadoEmpresas();


/****abrir empresa */

function generarEmpresa(e){
    var localStorage=window.localStorage;
    var empresaCode;
        empresaCode=`${e}`;
        localStorage.setItem("empresaCode", empresaCode);
        window.open('empresa-perfil.php', '_blank');
  
};
generarListadoEmpresas();


