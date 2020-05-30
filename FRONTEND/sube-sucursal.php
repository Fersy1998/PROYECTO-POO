<?php

    $nombre=$_FILES['foto']['name'];
    $guardado=$_FILES['foto']['tmp_name'];
    if(!file_exists('img/empresas/sucursales')){
        mkdir('img/empresas/sucursales', 0777, true);
        if(file_exists('img/empresas/sucursales')){
            if(move_uploaded_file($guardado,'img/empresas/sucursales/'.$nombre)){
                echo 'img/empresas/sucursales/'.$nombre;
                return 'img/empresas/sucursales/'.$nombre;
            }else{
                return "No se pudo realizar la acción";
            }
        }
    }else{
        if(move_uploaded_file($guardado,'img/empresas/sucursales/'.$nombre)){
            echo 'img/empresas/sucursales/'.$nombre;
            return 'img/empresas/sucursales/'.$nombre;
        }
    }
?>