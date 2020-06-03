<?php
    session_start();
    if(!isset($_SESSION["token"])){
        header("Location: inicio-sesion.html");
    }
    if(!isset($_COOKIE["token"])){
        header("Location: inicio-sesion.html");
    }
    if($_SESSION["token"]!=$_COOKIE["token"]){
        header("Location: inicio-sesion.html");
    }
?>
<!DOCTYPE html>
    <head>
        <meta charset="utf-8">
        <title>ALL PROMO</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
  integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
  crossorigin=""/>
<script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
  integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
  crossorigin=""></script>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"></script>
        <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/leaflet.js"></script>
    <script src="https://cdn.maptiler.com/mapbox-gl-js/v1.5.1/mapbox-gl.js"></script>
    <script src="https://cdn.maptiler.com/mapbox-gl-leaflet/latest/leaflet-mapbox-gl.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/leaflet.css" />
    <link rel="stylesheet" href="https://cdn.maptiler.com/mapbox-gl-js/v1.5.1/mapbox-gl.css" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css?family=Anton|Berkshire+Swash|Bungee+Inline|Bungee+Shade|Changa|Federo|Geo|Gugi|Kumar+One|Lobster|Monoton|Sen|Sonsie+One|Tomorrow|Vampiro+One|Voltaire&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/font-awesome.css">
        <link rel="stylesheet" href="css/all_promo_style.css">
        <link rel="shortcut icon" type="image/x-icon" href="img/LOGO_ALL_PROMO.ico" />
        <style>
      #map {position: absolute; top: 0; right: 0; bottom: 0; left: 0;}
    </style>
    </head>
    <body id="empresa-generada">
        <div>
            <div class="encabezado">
                <div class="menu-contenedor">
                    <header id="opciones">
                        
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
            
                    
                
        </div>

    
        <div class="seccion" id="promociones-empresa">
            <div class="container">
                <div class="row">
                    <div class="cabecera-de-seccion col-md-12 text-center">
                        <h2>PROMOCIONES</h2>
                    </div>
                </div>
                <div class="row" id="row-promociones-empresa">
                    <div class="col-md-4 col-md-4 col-sm-6 col-lg-3 col-xs-6">
                        
                    </div> 
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
                <div class="row" id="sucursales">
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
                            <img src="img/Marcas/casanovy.jpg" alt="">
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
                    <div class="sucursal-item col-md-6 col-sm-6 col-lg-3 col-xs-6">
                        <div class="sucursal-item-contenido">
                            <img src="img/Marcas/mendel.jpg" alt="">
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
                            <img src="img/Marcas/Xbox_logo.png" alt="">
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
                            <img src="img/Marcas/logos-UNAH-11.png" alt="">
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
        <div id="popUp" class="overlay">

        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/node-uuid/1.4.7/uuid.min.js"></script>
        <script src="js/jquery-1.11.0.min.js"></script>
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
        <script src="js/controlador-empresa-perfil.js"></script>
        

    </body>
</html>