<?php
    $nombre=$_FILES['banner']['name'];
    $guardado=$_FILES['banner']['tmp_name'];
    if(!file_exists('img/empresas/banners')){
        mkdir('img/empresas/banners', 0777, true);
        if(file_exists('img/empresas/banners')){
            if(move_uploaded_file($guardado,'img/empresas/banners/'.$nombre)){
                echo 'img/empresas/banners/'.$nombre;
                return 'img/empresas/banners/'.$nombre;
            }else{
                return "No se pudo realizar la acción";
            }
        }
    }else{
        if(move_uploaded_file($guardado,'img/empresas/banners/'.$nombre)){
            echo 'img/empresas/banners/'.$nombre;
            return 'img/empresas/banners/'.$nombre;
        }
    }
?>