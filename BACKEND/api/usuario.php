<?php
    header("content-Type:/aplication/json");
    include_once("../clases/clase-usuario.php");
 

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            if (isset($_GET['id'])) {
                Usuario::getUsuario($_GET['id']);
            } else {
                Usuario::getUsuarios();
            }
        break;
        case 'POST':
            $_POST= json_decode(file_get_contents('php://input'), true);
            $usuario=new Usuario(
                $_POST["codigoCliente"],
                $_POST["nombreCliente"],
                $_POST["apellidoCliente"],
                $_POST["correo"],
                $_POST["fotoPerfil"],
                $_POST["contrasena"],
                $_POST["sexo"],
                $_POST["productosFavoritos"],
                $_POST["empresasFavoritas"],
                $_POST["carrito"]
            );
            $usuario->setUsuario();
        break;
        case 'PUT':
            $_PUT= json_decode(file_get_contents('php://input'), true);
            if ($_PUT["accion"]==="agregar-producto-fav") {
                Usuario::setProductoFavorito($_PUT["cliente"], $_PUT["codigoProducto"]);
                break;
            } elseif ($_PUT["accion"]==="agregar-empresa-fav") {
                Usuario::setEmpresaFavorita($_PUT["cliente"], $_PUT["codigoEmpresa"]);
                break;
            } elseif ($_PUT["accion"]==="agregar-carrito") {
                Usuario::setProductoCarrito($_PUT["cliente"], $_PUT["codigoProducto"]);
                break;
            } elseif ($_PUT['accion']==="eliminar-producto-fav") {
                Usuario::deleteProductoFavorito($_PUT['codigoUsuario'], $_PUT['codigoProducto']);
                break;
            }elseif ($_PUT['accion']==="eliminar-producto-carrito") {
                Usuario::deleteCarritoProducto($_PUT['codigoUsuario'], $_PUT['codigoProducto']);
                break;
            }elseif ($_PUT['accion']==="eliminar-empresa-fav") {
                Usuario::deleteEmpresaFavorita($_PUT['codigoUsuario'], $_PUT['codigoEmpresa']);
                break;
            }else{
                
                Usuario::actualizarUsuario(
                    $_PUT["codigoCliente"],
                    $_PUT["nombreCliente"],
                    $_PUT["apellidoCliente"],
                    $_PUT["correo"],
                    $_PUT["fotoPerfil"],
                    $_PUT["contrasena"],
                    $_PUT["sexo"]
                );
            }
        break;
        case 'DELETE':
            
                Usuario::eliminarUsuario($_GET['codigoUsuario'], $_GET('codigoProducto'));
            
            
        break;
    }
?>