<?php
    session_start();
    session_destroy();
    setcookie("token","", time()-1,"/");
    setcookie("codigoUsuario","" , time()-1,"/");
    header("Location: inicio-sesion.html");
?>