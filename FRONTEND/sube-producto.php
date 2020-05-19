<?php

    $nombre=$_FILES['fotografia']['name'];
    $guardado=$_FILES['fotografia']['tmp_name'];
    if(!file_exists('img/foto-productos')){
        mkdir('img/foto-productos', 0777, true);
        if(file_exists('img/foto-productos')){
            if(move_uploaded_file($guardado,'img/foto-productos/'.$nombre)){
                echo 'img/foto-productos/'.$nombre;
                return 'img/foto-productos/'.$nombre;
            }else{
                return "No se pudo realizar la acción";
            }
        }
    }else{
        if(move_uploaded_file($guardado,'img/foto-productos/'.$nombre)){
            echo 'img/foto-productos/'.$nombre;
            return 'img/foto-productos/'.$nombre;
        }
    }
?>