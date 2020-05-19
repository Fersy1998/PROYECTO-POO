<?php
    $nombre=$_FILES['logo']['name'];
    $guardado=$_FILES['logo']['tmp_name'];
    $nombre2=$_FILES['banner']['name'];
    $guardado2=$_FILES['banner']['tmp_name'];
    if(!file_exists('img/empresas/logos')&&!file_exists('img/empresas/logos')){
        mkdir('img/empresas/logos', 0777, true);
        mkdir('img/empresas/logos', 0777, true);
        if(file_exists('img/empresas/logos')){
            if(move_uploaded_file($guardado,'img/empresas/logos/'.$nombre)){
                echo 'img/empresas/logos/'.$nombre;
            }else{
                return "No se pudo realizar la acción";
            }
        }
        if(file_exists('img/empresas/banners')){
            if(move_uploaded_file($guardado2,'img/empresas/banners/'.$nombre2)){
                echo 'img/empresas/banners/'.$nombre2;
            }else{
                return "No se pudo realizar la acción";
            }
        }

    }else{
        if(move_uploaded_file($guardado,'img/empresas/logos/'.$nombre)){
            echo 'img/empresas/logos/'.$nombre;
            echo '****************************';
        }
        if(move_uploaded_file($guardado2,'img/empresas/banners/'.$nombre2)){
            echo 'img/empresas/banners/'.$nombre2;
       
        }
    }
  
    
?>