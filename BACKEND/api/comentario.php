<?php
    header("content-Type:/aplication/json");
    include_once("../clases/clase-comentario.php");
    switch ($_SERVER['REQUEST_METHOD']){
        case 'GET':
            if(isset($_GET['id'])){
                Comentario::getComentario($_GET['id']);
            }else{
                Comentario::getComentarios();
            }
        break;
        case 'POST':
            $_POST= json_decode(file_get_contents('php://input'), true);
            $comentario=new Comentario(
                $_POST["codigoComentario"],
                $_POST["codigoProducto"],
                $_POST["codigoUsuario"],
                $_POST["contenido"],
            );
            $comentario->setComentario();
        break;
        case 'PUT':
            $_PUT= json_decode(file_get_contents('php://input'), true);
            $comentario=new Comentario(
                $_PUT["codigoComentario"],
                $_PUT["codigoProducto"],
                $_PUT["codigoUsuario"],
                $_PUT["contenido"]
            );
            $comentario->actualizarComentario($_GET['id']);
        break;
        case 'DELETE':
            Comentario::eliminarComentario($_GET['id']);
        break;
    }
?>