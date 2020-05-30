<?php
    header("content-Type:/aplication/json");
    include_once("../clases/clase-sucursal.php");
    switch ($_SERVER['REQUEST_METHOD']){
        case 'GET':
            if(isset($_GET['id'])){
                Sucursal::getSucursal($_GET['id']);
            }else{
                Sucursal::getSucursales();
            }
        break;
        case 'POST':
            $_POST= json_decode(file_get_contents('php://input'), true);
            $sucursal=new Sucursal(
                $_POST["codigoSucursal"],
                $_POST["direccion"],
                $_POST["telefono"],
                $_POST["pais"],
                $_POST["longitud"],
                $_POST["latitud"],
                $_POST["foto"]
            );
            $sucursal->setSucursal();
        break;
        case 'DELETE':
            Sucursal::eliminarSucursal($_GET['id']);
        break;
    }
?>