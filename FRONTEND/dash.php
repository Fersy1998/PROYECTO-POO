
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
        <script type="text/javascript" src="https://www.google.com/jsapi"></script>
        
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
                                            <a href="empresa.php#perfil-empresa">Perfil</a>
                                        </li>
                                       
                                        <li class="nav-item">
                                            <a href="empresa.php#promociones-empresa">Promociones</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="empresa.php#sucursal-seccion">Sucursales</a>
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
                        <h2>GRÁFICO DE PRODUCTOS MÁS BUSCADOS</h2>
                    </div> 
                </div>
                <div class="row">
                <center><div id="grafico" style="width: 800px; height: 600px; margin:20px;margin-right:90px;" class="col-12 col-sm-12 col-md-12 col-lg-12"></div></center>
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
   
      
        <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
      
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" 
        integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>

        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/node-uuid/1.4.7/uuid.min.js"></script>
        <script src="js/jquery.PrintArea.js"></script>
        <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.3.1/build/ol.js"></script>
     
    <script>
       /* function getCookie(cname) {
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
    var arreglo=['PRODUCTO', 0];
              var c=0;
  function arreglo(){
      google.load("visualization", "1", {packages:["corechart"]});
        google.setOnLoadCallback(dibujarGrafico);
      function dibujarGrafico() {
        axios({
          method:'GET',
          url:'../BACKEND/api/empresa.php?id='+codigoEmpresa,
          respType:'json'
      })
      .then(res=>{
          var empresa=res.data;
          var productos=empresa.productos;
         
          axios({
          method:'GET',
          url:'../BACKEND/api/usuario.php',
          respType:'json'
          })
          .then(res=>{
              var usuarios=res.data;
             
              for(u=0;u<usuarios.length;u++){
                  productosu=usuarios[u].productosFavoritos;
                  for(pe=0;pe<productos.length;pe++){
                    for(pu=0;pu<productosu.length;pu++){
                      if(productosu[pu]==productos[pe]){
                        axios({
                        method:'GET',
                        url:'../BACKEND/api/producto.php?id='+productos[pe],
                        respType:'json'
                        })
                        .then(res=>{
                            var producto=res.data;
                            if(arreglo.length==0){
                              arreglo[c]=[`${producto.producto}`, 1];
                            }else{
                              for(a=0;a<arreglo.length;a++){
                                if(arreglo[i][0]==producto.producto){
                                  arreglo[i][1]+=1;
                                }else{
                                  c+=1;
                                  arreglo[c]=[`${producto.producto}`, 1];
                                }
                              }
                            }
                        }).catch(error=>{
                              console.log(error);
                        })
                      }
                    }
                  }
              }
      return arreglo;
        
       
      }).catch(error=>{
                              console.log(error);
                        })
                      }).catch(error=>{
                              console.log(error);
      })
      }
        // Tabla de datos: valores y etiquetas de la gráfica
        var data = google.visualization.arrayToDataTable(arreglo);
        var options = {
        title: 'Estadísticas'
        }
        // Dibujar el gráfico
        new google.visualization.ColumnChart(
        //ColumnChart sería el tipo de gráfico a dibujar
        document.getElementById('grafico')
        ).draw(data, options);
        }*/

        google.load("visualization", "1", {packages:["corechart"]});
        google.setOnLoadCallback(dibujarGrafico);
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
</script>

    </body>
</html>