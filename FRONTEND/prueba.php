<?php
    $nombre=$_FILES['PRUEBA']['name'];
    $guardado=$_FILES['PRUEBA']['tmp_name'];
    if(!file_exists('img/empresas/PRUEBAs')){
        mkdir('img/empresas/PRUEBAs', 0777, true);
        if(file_exists('img/empresas/PRUEBAs')){
            if(move_uploaded_file($guardado,'img/empresas/PRUEBAs/'.$nombre)){
                echo 'img/empresas/PRUEBAs/'.$nombre;
                return 'img/empresas/PRUEBAs/'.$nombre;
            }else{
                return "No se pudo realizar la acción";
            }
        }
    }else{
        if(move_uploaded_file($guardado,'img/empresas/PRUEBAs/'.$nombre)){
            echo 'img/empresas/PRUEBAs/'.$nombre;
            return 'img/empresas/PRUEBAs/'.$nombre;
        }
    }
?>