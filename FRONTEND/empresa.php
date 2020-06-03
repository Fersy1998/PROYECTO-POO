<?php
    session_start();
    if(!isset($_SESSION["tokenEmpresa"])){
        header("Location: inicio-sesion.html");
    }
    if(!isset($_COOKIE["tokenEmpresa"])){
        header("Location: inicio-sesion.html");
    }
    if($_SESSION["tokenEmpresa"]!=$_COOKIE["tokenEmpresa"]){
        header("Location: inicio-sesion.html");
    }
?>

<!DOCTYPE html>
    <head>
        <meta charset="utf-8">
        <title>ALL PROMO</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.3.1/css/ol.css">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css?family=Anton|Berkshire+Swash|Bungee+Inline|Bungee+Shade|Changa|Federo|Geo|Gugi|Kumar+One|Lobster|Monoton|Sen|Sonsie+One|Tomorrow|Vampiro+One|Voltaire&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/font-awesome.css">
        <link rel="stylesheet" href="css/all_promo_style.css">
        
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
  integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
  crossorigin=""/>
<script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
  integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
  crossorigin=""></script>
        <link rel="shortcut icon" type="image/x-icon" href="img/LOGO_ALL_PROMO.ico" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"></script>
        <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/leaflet.js"></script>
    <script src="https://cdn.maptiler.com/mapbox-gl-js/v1.5.1/mapbox-gl.js"></script>
    <script src="https://cdn.maptiler.com/mapbox-gl-leaflet/latest/leaflet-mapbox-gl.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/leaflet.css" />
    <link rel="stylesheet" href="https://cdn.maptiler.com/mapbox-gl-js/v1.5.1/mapbox-gl.css" />
    <style>
      #map {position: absolute; top: 0; right: 0; bottom: 0; left: 0;}
    </style>
    </head>
    <body>
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
                                   
                                        <li class="nav-item">
                                            <a href="#"data-toggle="tooltip" data-placement="bottom" title="Vista de usuarios" onClick="vista()"><img src="img/glasses-solid.svg" style="width:30px; height:30px;  color:#8b4466;"></a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#perfil-empresa">Perfil</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="dash.php">Gráfico</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#promociones-empresa">Promociones</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#sucursal-seccion">Sucursales</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="logoutEmpresa.php">cerrar sesión</a>
                                        </li>
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
                                <div class="carousel-item active" id="bannerEmpresa">

                                </div>
                        </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>

        <div class="seccion" id="perfil-empresa">
            <div class="container">
                <div class="row">
                    <div class="cabecera-de-seccion col-md-12 text-center">
                        <h2>X-BOX</h2>
                    </div> 
                </div>
                <div class="row">
                    <div class="logo-perfil-empresa col-12 col-md-3 col-sm-3 col-lg-3">
                        <div class="imagen-empresa-y-datos">
                           
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
                    <div class="detalles-empresa col-12 col-md-4 col-lg-4 col-sm-4">
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

                    </div>
                      
                </div>
               
               
                    <div class="cabecera-de-seccion col-12 text-center" id="mas-compania">
                       
                    </div>
                <div>
                        <p id="mas-sobre-la-compania">

                        </p>
                    
                </div>
                </div>
            </div>
        </div>

        <div class="seccion" id="promociones-empresa">
            <div class="container">
                <div class="row">
                    <div class="cabecera-de-seccion col-md-12 text-center">
                        <h2 id="agregarPromociones">PROMOCIONES PUBLICADAS&nbsp;&nbsp;&nbsp;<a href="#popup1" class="fa fa-plus-circle" onclick="boton()" data-toggle="tooltip" data-placement="bottom" title="Agregar producto"></a></h2>
                    </div>
                </div>
                <div class="row" id="row-promociones-empresa">

                </div>
            </div>
        </div>



        <div class="seccion" id="#sucursal-seccion">
            <div class="container">
                <div class="row">
                    <div class="cabecera-de-seccion col-md-12 text-center">
                        <h2 id="Tsuc">SUCURSALES &nbsp;&nbsp;&nbsp; <a href="#popup2"class="fa fa-plus-circle" data-toggle="tooltip" data-placement="bottom" title="Agregar sucursal" ></a></h2>
                    </div>
                </div>
                <div class="row">
                    <center>
                        <div class="" id="sucursales">
                            
                        </div>
                    </center>
                   
                     
                </div> 
            </div> 
        </div> 
        <div id="Ficha" style="display:none;">
            
            </div>
            <center><input type="button" id="imprimir"class="button" style="display:none" value="IMPRIMIR" onClick="cambiarValor()"/></center>
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
        <!--<input type="file" name="foto-producto" class="datos-p" id="foto-producto" onloadeddata="mostrarImagen()">-->


        <div id="popUp" class="overlay">

        </div>
        <div id="popup1" class="overlay">
            <div class="inscripcion-form detalles_producto text-left container special w-50 center-block content card">
                <a class="close" href="#" class="float-right row">x</a>
                <h2>AGREGAR UN NUEVO PRODUCTO</h2>
                <form name="add-producto-form" id="add-producto-form">
                    <div class="col-12 col-md-6 col-xs-12 col-lg-6 col-xl-6">
                        <h3>Nombre del producto:</h3>
                        <input name="nombre-producto" class="datos-p"type="text" id="nombre-producto" required>
                        <h3> Descripción:</h3>
                        <p>
                        <input type="text" id="descripcion-producto" class="datos-p" onkeyup="generarCodigo()">
                        </p>
                        
                        <h3>Precio: </h3>
                        <p>
                            <input type="text" id="precio-producto" class="datos-p"name="precio-producto" required>
                        </p>
                        <h3>Descuento: </h3>
                        <p>
                            <input type="text" id="descuento-producto" class="datos-p"name="descuento-producto" required>
                        </p>
                        
                    </div>
                   
                    <div class="col-12 col-md-6 col-xs-12 col-lg-6 col-xl-6">
                    <img id="img1"src="https://chart.googleapis.com/chart?cht=qr&chl=fuera+JOH&chs=200x200"
                    class="qr-code img-thumbnail img-responsive">
                    </div>
                    <div class="col-12 col-md-6 col-xs-12 col-lg-6 col-xl-6" id="imagen-subida" style="width:100px; height:auto;"></div>
                    </form>
                    <form class="form"action="post" name="picForm" id="picForm" enctype="multipart/form-data">
                        <p>
                            <h3>Foto del producto</h3>
                            <input type="file" name="fotografia" class="datos" id="fotografia" placeholder="Agrega una fotografía a tu perfil" accept="image/x-png,image/gif,image/jpeg" />
                        </p>
                    </form>
                    <a id="boton">
                       
                    </a>
                    
                </div>
        </div>
        <div id="popup2" class="overlay">
            <div class="inscripcion-form detalles_producto text-left container special w-50 center-block content card">
                <a class="close" href="#" class="float-right row">x</a>
                <h2>AGREGAR UNA NUEVA SUCURSAL</h2>
                <form name="add-sucursal-form" id="add-sucursal-form">
                    <div class="col-12 col-md-6 col-xs-12 col-lg-6 col-xl-6">
                        <h3>Direccion:</h3>
                        <input name="direccion-sucursal" class="datos-p"type="text" id="direccion-sucursal" required>
                        <h3>Teléfono:</h3>
                        <p>
                        <input type="text" id="telefono-sucursal" name="telefono-sucursal"class="datos-p" >
                        </p>
                        
                        <h3>País: </h3>
                        <p>
                            <input type="text" id="pais-sucursal" class="datos-p"name="pais-sucursal" required>
                        </p>
                        <h3>Longitud: </h3>
                        <p>
                            <input type="text" id="longitud-sucursal" class="datos-p"name="longitud-sucursal" required>
                        </p>
                        <h3>Latitud: </h3>
                        <p>
                            <input type="text" id="latitud-sucursal" class="datos-p"name="latitud-sucursal" required>
                        </p>
                        
                    </div>
                    </form>
                    <form class="form"action="post" name="picForm1" id="picForm1" enctype="multipart/form-data">
                        <p>
                            <h3>Fotografía: </h3>
                            <input type="file" name="foto" class="datos" id="inputSucursal"  accept="image/x-png,image/gif,image/jpeg" />
                        </p>
                    </form>
                    <a id="boton2" >
                       <button class="button" onclick="agregarSucursal()">Guardar Sucursal</button>
                    </a>
                    
                </div>

        </div>
      
        <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
      
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" 
        integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>

        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/node-uuid/1.4.7/uuid.min.js"></script>
        <script src="js/jquery.PrintArea.js"></script>
        <script src="js/controlador-empresa.js"></script>
        <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.3.1/build/ol.js"></script>
      
   
    </body>
</html>