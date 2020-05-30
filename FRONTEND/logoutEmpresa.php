<?php
    session_start();
    session_destroy();
    setcookie("tokenEmpresa","", time()-1,"/");
    setcookie("codigoEmpresa","" , time()-1,"/");
    header("Location: inicio-sesion.html");
?>