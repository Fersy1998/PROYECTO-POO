<?php //Ejemplo aprenderaprogramar.com, archivo escribir.php
/*$_POST= json_decode(file_get_contents('php://input'), true);
$file = fopen("codigo.txt", "w");
fwrite($file, $_POST['CODIGO'] . PHP_EOL);
fclose($file);*/

    header("content-Type:/aplication/json");
    include_once("../clases/clase-usuario.php");
    include_once("../clases/clase-empresa.php");
        
            $_POST= json_decode(file_get_contents('php://input'), true);
            $codigo;
            $_POST["contrasena"];
            if(Usuario::verificarCredenciales( $_POST["correo"], $_POST["contrasena"])){
            }
    


?>