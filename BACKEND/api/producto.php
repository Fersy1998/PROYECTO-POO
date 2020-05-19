<?php
    header("content-Type:/aplication/json");
    include_once("../clases/clase-producto.php");
    switch ($_SERVER['REQUEST_METHOD']){
        case 'GET':
            if(isset($_GET['id'])){
                Producto::getProduct($_GET['id']);
            }else{
                Producto::getProductos();
            }
        break;
        case 'POST':
            $_POST= json_decode(file_get_contents('php://input'), true);
            $producto=new Producto(
                $_POST["producto"],
                $_POST["codigoProducto"],
                $_POST["descripcionProducto"],
                $_POST["code"],
                $_POST["foto"],
                $_POST["precio"],
                $_POST["descuento"],
                $_POST["valoracion"],
                $_POST["valoraciones"],
                $_POST["comentarios"],
                $_POST["codigoEmpresa"],
            );
            $producto->setProduct();
        break;
        case 'PUT':
            $_PUT= json_decode(file_get_contents('php://input'), true);
            if ($_PUT["accion"]==="agregar-valoracion") {
                Producto::setUnaValoracion($_PUT["valor"],$_PUT["code"]);
                break;
            }elseif($_PUT["accion"]==="agregar-comentario"){
                Producto::setUnComentario($_PUT["codigoComentario"],$_PUT["codigoProducto"]);
                break;
            }else{
                Producto::actualizarProducto(
                    $_PUT["producto"],
                    $_PUT["codigoProducto"],
                    $_PUT["code"],
                    $_PUT["descripcionProducto"],
                    $_PUT["foto"],
                    $_PUT["precio"],
                    $_PUT["descuento"]
                );
            }
           
        break;
        case 'DELETE':
            Producto::eliminarProducto($_GET['id']);
        break;
    }
?>