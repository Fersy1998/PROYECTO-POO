<?php

    $nombre=$_FILES['x']['name'];
    $guardado=$_FILES['x']['tmp_name'];
    if(!file_exists('img/usuarios-perfil')){
        mkdir('img/usuarios-perfil', 0777, true);
        if(file_exists('img/usuarios-perfil')){
            if(move_uploaded_file($guardado,'img/usuarios-perfil/'.$nombre)){
                echo 'img/usuarios-perfil/'.$nombre;
                return 'img/usuarios-perfil/'.$nombre;
            }else{
                return "No se pudo realizar la acción";
            }
        }
    }else{
        if(move_uploaded_file($guardado,'img/usuarios-perfil/'.$nombre)){
            echo 'img/usuarios-perfil/'.$nombre;
            return 'img/usuarios-perfil/'.$nombre;
        }
    }
?>