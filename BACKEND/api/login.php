<?php
    session_start();
    header("content-Type:/aplication/json");
    include_once("../clases/clase-usuario.php");
    include_once("../clases/clase-empresa.php");
    $_POST=json_decode(file_get_contents('php://input'), true);

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'POST':
            $usuario=json_decode(Usuario::verificarCredenciales($_POST['email'], $_POST['password']));
            if ($usuario) {
                $result=array(
                    "resultCode"=>1,
                    "mensaje"=>"Usuario autenticado",
                    "token"=>sha1(uniqid(rand(), true))
                );
                $_SESSION["token"]=$result["token"];
                setcookie("token", $result["token"], time()+(60*60*24*31),"/");
                setcookie("codigoUsuario", $usuario->codigoCliente, time()+(60*60*24*31),"/");
                echo json_encode($result);
            }else{
                $empresa=json_decode(Empresa::verificarCredenciales($_POST['email'], $_POST['password']));
                if ($empresa) {
                    $result=array(
                        "resultCode"=>2,
                        "mensaje"=>"Empresa autenticada",
                        "token"=>sha1(uniqid(rand(), true))
                    );
                    $_SESSION["tokenEmpresa"]=$result["token"];
                    setcookie("tokenEmpresa", $result["token"], time()+(60*60*24*31),"/");
                    setcookie("codigoEmpresa", $empresa->codigoEmpresa, time()+(60*60*24*31),"/");
                    echo json_encode($result);
                }else{
                    setcookie("tokenEmpresa","", time()-1,"/");
                    setcookie("token","", time()-1,"/");
                    setcookie("codigoEmpresa","" , time()-1,"/");
                    setcookie("codigoUsuario","" , time()-1,"/");
                    header("Location: inicio-sesion.html");
                }
               
            }
        break;
    }
?>