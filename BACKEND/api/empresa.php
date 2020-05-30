<?php
    header("content-Type:/aplication/json");
    include_once("../clases/clase-empresa.php");
    switch ($_SERVER['REQUEST_METHOD']){
        case 'GET':
            if(isset($_GET['id'])){
                Empresa::getEmpresa($_GET['id']);
            }else{
                Empresa::getEmpresas();
            }
        break;
        case 'POST':
            $_POST= json_decode(file_get_contents('php://input'), true);
            $empresa=new Empresa(
                $_POST['nombreEmpresa'],
                $_POST['codigoEmpresa'],
                $_POST['email'],
                $_POST['contrasena'],
                $_POST['pais'],
                $_POST['direccion'],
                $_POST['telefono'],
                $_POST['banner'],
                $_POST['logoimg'],
                $_POST['descripcion'],
                $_POST['longitud'],
                $_POST['latitud'],
                $_POST['sucursales'],
                $_POST['productos']
            );
            $empresa->setEmpresa();
        break;
        case 'PUT':
            $_PUT= json_decode(file_get_contents('php://input'), true);
            if ($_PUT["accion"]==="agregar-producto") {
                Empresa::setProducto($_PUT["codigoEmpresa"], $_PUT["codigoProducto"]);
                break;
            } elseif ($_PUT["accion"]==="agregar-sucursal") {
                Empresa::setSucursal($_PUT["codigoEmpresa"], $_PUT["codigoSucursal"]);
                break;
            } elseif ($_PUT['accion']==="eliminar-producto") {
                Empresa::deleteProducto($_PUT['codigoEmpresa'], $_PUT['codigoProducto']);
                break;
            }elseif ($_PUT['accion']==="eliminar-sucursal") {
                Empresa::deleteSucursal($_PUT['codigoEmpresa'], $_PUT['codigoSucursal']);
                break;
            }else{
                Empresa::actualizarEmpresa(
                    $_PUT['nombreEmpresa'],
                    $_PUT['codigoEmpresa'],
                    $_PUT['pais'],
                    $_PUT['direccion'],
                    $_PUT['telefono'],
                    $_PUT['banner'],
                    $_PUT['logoimg'],
                    $_PUT['descripcion'],
                    $_PUT['longitud'],
                    $_PUT['latitud'],
                    $_PUT['sucursales'],
                    $_PUT['productos']
                );
            break;
            }
        break;
        case 'DELETE':
            Empresa::eliminarEmpresa($_GET['id']);
        break;
    }
?>