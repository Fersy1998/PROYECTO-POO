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

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css?family=Anton|Berkshire+Swash|Bungee+Inline|Bungee+Shade|Changa|Federo|Geo|Gugi|Kumar+One|Lobster|Monoton|Sen|Sonsie+One|Tomorrow|Vampiro+One|Voltaire&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/font-awesome.css">
        <link rel="stylesheet" href="css/all_promo_style.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.4.0/leaflet.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css" />
        <!--<link rel="shortcut icon" type="image/x-icon" href="img/LOGO_ALL_PROMO.ico" />
        <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/leaflet.js"></script>
        <script src="https://cdn.maptiler.com/mapbox-gl-js/v1.5.1/mapbox-gl.js"></script>
        <script src="https://cdn.maptiler.com/mapbox-gl-leaflet/latest/leaflet-mapbox-gl.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/leaflet.css" />
        <link rel="stylesheet" href="https://cdn.maptiler.com/mapbox-gl-js/v1.5.1/mapbox-gl.css" />-->
    </head>
    <body>
        <div>
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
                                        <a href="#Perfil">Perfil</a>
                                    </li>
                                    <li>
                                    <a href="#map" onClick="mostrarMapa()"class="fa fa-globe"></a>
                                    </li>
                                    <li>
                                        <a href="#seccion-promociones-favoritas">Promociones favoritas</a>
                                    </li>
                                    <li>
                                        <a href="#empresas-favoritas">Empresas favoritas</a>
                                    </li>
                                    <li><a href="#miCarrito" class="fa fa-shopping-cart" onclick="miCarrito()"></a></li>
                                    
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
                </header>
                <ul id="resultado-busqueda">
                   
                </ul>

            </div>
        </div>
        <div class="seccion" id="Perfil">
            
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
        <div class="seccion" id="indexMap" style="display:none">
            <div class="container">
                <div class="row">
                    <div class="cabecera-de-seccion col-md-12 text-center">
                        <h2>MAPA</h2>
                    </div>
                </div>
                <div class="row mapa" id="map">
                </div>
                </div>
            </div>
        </div>
        <div class="seccion" id="seccion-promociones-favoritas">
            <div class="container">
                <div class="row">
                    <div class="cabecera-de-seccion col-md-12 text-center">
                        <h2>PROMOCIONES FAVORITAS</h2>
                        <p>Los productos que tienes guardados</p>
                    </div>
                </div>
                <div class="row" id="row-seccion-promociones-favoritas">

                </div>
            </div>
        </div>



        <div class="seccion" id="empresas-favoritas">
            <div class="container cabecera-de-seccion">
                <center>
                    <h2 id="Marcas-de-empresas">EMPRESAS FAVORITAS</h2>
                    <p>Empresas de confianza para ti</p>
                </center>
                <div class="row">
                    
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
            <div id="miCarrito" class="overlay">
                <div class="content">
                    <br>
                   
                    <h2>PRODUCTOS EN TU CARRITO</h2>
                    <div class="builder-content-wrapper" >
                        <a class="close" href="#">x</a>
                        <div class="builder-content-inner">
                      
                            <div class="builder-content builder-content-builder builder-content-builder-custom-text">
                                <div class="builder-content">
                                    <table id="detalles-productos">
                                        <tr>
                                            <th class="visible-lg">
                                                <center>
                                                    <h4>Producto</h4>
                                                </center></th>
                                            <th colspan="2">
                                                <center>
                                                <h4>Detalles</h4>
                                                </center>
                                            </th>
                                        </tr>
                                        <tbody id="cuerpo"></tbody>
                                        <tfoot>
                                            <tr>
                                            <td> Totales</td>
                                            <td class="PrecioTotal"> $23 </td>
                                            <td class="CantidadTotal"> 5 </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    
                                </div>
                            </div>
                            
                        </div>
                        <br>
                        <center>
                            <button class="button"onclick="comprar()">COMPRAR</button>
                           
                        </center>
                    </div>
                        
                </div>
            </div>
            <input id="descripcion-producto" type="text" style="display: none;">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
        <script src="js/jquery-3.4.1.min.js"></script>
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/node-uuid/1.4.7/uuid.min.js"></script>
        
        <script src="js/controlador-cliente.js"></script>
        


    </body>
</html>