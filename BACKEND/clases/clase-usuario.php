<?php
class Usuario{
    private $codigoCliente;
    private $nombreCliente;
    private $apellidoCliente;
    private $correo;
    private $fotoPerfil;
    private $contrasena;
    private $sexo;
    private $productosFavoritos=[];
    private $empresasFavoritas=[];
    private $carrito=[];
    public function __construct($codigoCliente,
     $nombreCliente,
     $apellidoCliente,
     $correo,
     $fotoPerfil,
     $contrasena,
     $sexo,
     $productosFavoritos,
     $empresasFavoritas,
     $carrito){
        $this->codigoCliente=$codigoCliente;
        $this->nombreCliente=$nombreCliente;
        $this->apellidoCliente=$apellidoCliente;
        $this->correo=sha1($correo);
        $this->fotoPerfil=$fotoPerfil;
        $this->contrasena=sha1($contrasena);
        $this->sexo=$sexo;
        $this->productosFavoritos=$productosFavoritos; 
        $this->empresasFavoritas=$empresasFavoritas;
        $this->carrito=$carrito;
     }
    public function getCodigoCliente(){
		return $this->codigoCliente;
	}

	public function setCodigoCliente($codigoCliente){
		$this->codigoCliente = $codigoCliente;
	}

	public function getNombreCliente(){
		return $this->nombreCliente;
	}

	public function setNombreCliente($nombreCliente){
		$this->nombreCliente = $nombreCliente;
	}

	public function getapellidoCliente(){
		return $this->apellidoCliente;
	}

	public function setapellidoCliente($apellidoCliente){
		$this->apellidoCliente = $apellidoCliente;
	}

	public function getCorreo(){
		return $this->correo;
	}

	public function setCorreo($correo){
		$this->correo = $correo;
	}

	public function getFotoPerfil(){
		return $this->fotoPerfil;
	}

	public function setFotoPerfil($fotoPerfil){
		$this->fotoPerfil = $fotoPerfil;
	}

	public function getContrasena(){
		return $this->contrasena;
	}

	public function setContrasena($contrasena){
		$this->contrasena = $contrasena;
	}

	public function getSexo(){
		return $this->sexo;
	}

	public function setSexo($sexo){
		$this->sexo = $sexo;
	}

	public function getProductosFavoritos(){
		return $this->productosFavoritos;
	}

	public function setProductosFavoritos($productosFavoritos){
		$this->productosFavoritos = $productosFavoritos;
	}
    public static function setProductoFavorito($idCliente,$productoFavorito){
        $contenidoArchivo=file_get_contents('../data/usuarios.json');
        $usuarios=json_decode($contenidoArchivo, true);
        $indice=null;
        for ($i=0;$i<sizeOf($usuarios);$i++) {
            if ($usuarios[$i]['codigoCliente']==$idCliente) {
                $usuario=$usuarios[$i];
                $indice=$i;
                break;
            }
        }
        $productos=$usuario["productosFavoritos"];
        $nombreCliente=$usuario["nombreCliente"];
        echo json_encode($nombreCliente);
        echo json_encode($productos);
        if($productos==null){
            $productos=[];
            $productos[0]==$productoFavorito;
        }
        if (array_search($productoFavorito, $productos, false)==false) {
            array_push($productos, $productoFavorito);
            echo json_encode($productos);
        }    
            $actusuario=array(
                "codigoCliente"=>$usuario["codigoCliente"],
                "nombreCliente"=>$usuario["nombreCliente"],
                "apellidoCliente"=>$usuario["apellidoCliente"],
                "correo"=>$usuario["correo"],
                "fotoPerfil"=>$usuario["fotoPerfil"],
                "contrasena"=>$usuario["contrasena"],
                "sexo"=>$usuario["sexo"],
                "productosFavoritos"=>$productos,
                "empresasFavoritas"=>$usuario["empresasFavoritas"],
                "carrito"=>$usuario["carrito"]

            );
            $usuarios[$indice]=$actusuario;
            $archivo=fopen("../data/usuarios.json", "w");
            fwrite($archivo, json_encode($usuarios));
            fclose($archivo);
        
    }
    public static function deleteProductoFavorito($cliente,$codProducto){
        $contenidoArchivo=file_get_contents('../data/usuarios.json');
        $usuarios=json_decode($contenidoArchivo, true);
        $indice=null;
        for ($i=0;$i<sizeOf($usuarios);$i++) {
            if ($usuarios[$i]['codigoCliente']==$cliente) {
                $usuario=$usuarios[$i];
                $indice=$i;
                break;
            }
        }
                $productos=$usuario["productosFavoritos"];
                for($i=0;$i<sizeof($productos);$i++){
                    if($productos[$i]==$codProducto){
                        array_splice($productos,$i,1);
                    break;
                    }
                }
                $actusuario=array(
                    "codigoCliente"=>$usuario["codigoCliente"],
                    "nombreCliente"=>$usuario["nombreCliente"],
                    "apellidoCliente"=>$usuario["apellidoCliente"],
                    "correo"=>$usuario["correo"],
                    "fotoPerfil"=>$usuario["fotoPerfil"],
                    "contrasena"=>$usuario["contrasena"],
                    "sexo"=>$usuario["sexo"],
                    "productosFavoritos"=>$productos,
                    "empresasFavoritas"=>$usuario["empresasFavoritas"],
                    "carrito"=>$usuario["carrito"]
    
                );
                echo json_encode($productos);
                $usuarios[$indice]=$actusuario;
                $archivo=fopen("../data/usuarios.json", "w");
                fwrite($archivo, json_encode($usuarios));
                fclose($archivo);
            
            
        
        
        $nombreCliente=$usuario["nombreCliente"];
        echo json_encode($nombreCliente);
        echo json_encode($productos);
            
    }
	public function getEmpresasFavoritas(){
		return $this->empresasFavoritas;
	}

	public function setEmpresasFavoritas($empresasFavoritas){
		$this->empresasFavoritas = $empresasFavoritas;
    }
    public static function setEmpresaFavorita($idCliente,$empresaFavorita){
        $contenidoArchivo=file_get_contents('../data/usuarios.json');
        $usuarios=json_decode($contenidoArchivo, true);
        $indice=null;
        for($i=0;$i<sizeOf($usuarios);$i++){
            if($usuarios[$i]['codigoCliente']==$idCliente){
                $usuario=$usuarios[$i];
                $indice=$i;
            break;
            }
        }
        $empresas=$usuario["empresasFavoritas"];
        echo json_encode($empresas);
        if (array_search($empresaFavorita, $empresas, false)==false) {
            array_push($empresas, $empresaFavorita);
            echo json_encode($empresas);
            $empresas=array_unique($empresas);

            $actusuario=array(
                "codigoCliente"=>$usuario["codigoCliente"],
                "nombreCliente"=>$usuario["nombreCliente"],
                "apellidoCliente"=>$usuario["apellidoCliente"],
                "correo"=>$usuario["correo"],
                "fotoPerfil"=>$usuario["fotoPerfil"],
                "contrasena"=>$usuario["contrasena"],
                "sexo"=>$usuario["sexo"],
                "productosFavoritos"=>$usuario["productosFavoritos"],
                "empresasFavoritas"=>$empresas,
                "carrito"=>$usuario["carrito"]

            );
            $usuarios[$indice]=$actusuario;
            $archivo=fopen("../data/usuarios.json", "w");
            fwrite($archivo, json_encode($usuarios));
            fclose($archivo);
        }
}

public static function deleteEmpresaFavorita($cliente,$codEmpresa){
    $contenidoArchivo=file_get_contents('../data/usuarios.json');
    $usuarios=json_decode($contenidoArchivo, true);
    $indice=null;
    for ($i=0;$i<sizeOf($usuarios);$i++) {
        if ($usuarios[$i]['codigoCliente']==$cliente) {
            $usuario=$usuarios[$i];
            $indice=$i;
            break;
        }
    }
            $empresas=$usuario["empresasFavoritas"];
            for($i=0;$i<sizeof($empresas);$i++){
                if($empresas[$i]==$codEmpresa){
                    array_splice($empresas,$i,1);
                break;
                }
            }
            $actusuario=array(
                "codigoCliente"=>$usuario["codigoCliente"],
                "nombreCliente"=>$usuario["nombreCliente"],
                "apellidoCliente"=>$usuario["apellidoCliente"],
                "correo"=>$usuario["correo"],
                "fotoPerfil"=>$usuario["fotoPerfil"],
                "contrasena"=>$usuario["contrasena"],
                "sexo"=>$usuario["sexo"],
                "productosFavoritos"=>$usuario["productosFavoritos"],
                "empresasFavoritas"=>$empresas,
                "carrito"=>$usuario["carrito"]

            );
            echo json_encode($empresas);
            $usuarios[$indice]=$actusuario;
            $archivo=fopen("../data/usuarios.json", "w");
            fwrite($archivo, json_encode($usuarios));
            fclose($archivo);
        
        
    
    
    $nombreCliente=$usuario["nombreCliente"];
    echo json_encode($nombreCliente);
        
}
	public function getCarrito(){
		return $this->carrito;
	}

	public function setCarrito($carrito){
		$this->carrito= $carrito;
    }
    public static function setProductoCarrito($idCliente,$producto){
        $contenidoArchivo=file_get_contents('../data/usuarios.json');
        $usuarios=json_decode($contenidoArchivo, true);
        $indice=null;
        for($i=0;$i<sizeOf($usuarios);$i++){
            if($usuarios[$i]['codigoCliente']==$idCliente){
                $usuario=$usuarios[$i];
                $indice=$i;
            break;
            }
        }
        $carrito=$usuario["carrito"];
        if($carrito==null){
            $carrito=[];
        }
        if (array_search($producto, $carrito, false)==false) {
            array_push($carrito, $producto);
        }
            $actusuario=array(
                "codigoCliente"=>$usuario["codigoCliente"],
                "nombreCliente"=>$usuario["nombreCliente"],
                "apellidoCliente"=>$usuario["apellidoCliente"],
                "correo"=>$usuario["correo"],
                "fotoPerfil"=>$usuario["fotoPerfil"],
                "contrasena"=>$usuario["contrasena"],
                "sexo"=>$usuario["sexo"],
                "productosFavoritos"=>$usuario["productosFavoritos"],
                "empresasFavoritas"=>$usuario["empresasFavoritas"],
                "carrito"=>$carrito
    
            );
            $usuarios[$indice]=$actusuario;
            $archivo=fopen("../data/usuarios.json","w");
            fwrite($archivo, json_encode($usuarios));
            fclose($archivo);
        
        echo json_encode($carrito);
        
        echo json_encode($carrito);
        
        
    }
    public static function deleteCarritoProducto($cliente,$codProducto){
        $contenidoArchivo=file_get_contents('../data/usuarios.json');
        $usuarios=json_decode($contenidoArchivo, true);
        $indice=null;
        for ($i=0;$i<sizeOf($usuarios);$i++) {
            if ($usuarios[$i]['codigoCliente']==$cliente) {
                $usuario=$usuarios[$i];
                $indice=$i;
                break;
            }
        }
                $carrito=$usuario["carrito"];
                for($i=0;$i<sizeof($carrito);$i++){
                    if($carrito[$i]==$codProducto){
                        array_splice($carrito,$i,1);
                    break;
                    }
                }
                $actusuario=array(
                    "codigoCliente"=>$usuario["codigoCliente"],
                    "nombreCliente"=>$usuario["nombreCliente"],
                    "apellidoCliente"=>$usuario["apellidoCliente"],
                    "correo"=>$usuario["correo"],
                    "fotoPerfil"=>$usuario["fotoPerfil"],
                    "contrasena"=>$usuario["contrasena"],
                    "sexo"=>$usuario["sexo"],
                    "productosFavoritos"=>$usuario["productosFavoritos"],
                    "empresasFavoritas"=>$usuario["empresasFavoritas"],
                    "carrito"=>$carrito
    
                );
                echo json_encode($carrito);
                $usuarios[$indice]=$actusuario;
                $archivo=fopen("../data/usuarios.json", "w");
                fwrite($archivo, json_encode($usuarios));
                fclose($archivo);
            
            
        
        
        $nombreCliente=$usuario["nombreCliente"];
        echo json_encode($nombreCliente);
     
            
    }
    public static function getUsuario($indice){
        $contenidoArchivo=file_get_contents("../data/usuarios.json");
        $usuarios=json_decode($contenidoArchivo, true);
        $encontrado=0;
        for($i=0;$i<sizeof($usuarios);$i++){
            if($usuarios[$i]['codigoCliente']==$indice){
                $encontrado=1;
                echo json_encode($usuarios[$i]);
                return json_encode($usuarios[$i]);
            break;
            }
            else if($usuarios[$i]['correo']==$indice){
                $encontrado=1;
                echo $usuarios[$i]['codigoCliente'];
                return $usuarios[$i]['codigoCliente'];
            break;
            }
        }
        if($encontrado==0){
            echo "null";
            return "null";
        }
    }
    public static function getUsuarios(){     
        $contenidoArchivo = file_get_contents('../data/usuarios.json');
        $usuarios=json_decode($contenidoArchivo, true);
        echo json_encode($usuarios);
    }

    public function setUsuario(){
        $contenidoArchivo = file_get_contents('../data/usuarios.json');
        $usuarios=json_decode($contenidoArchivo, true);
        $usuarios[]=array(
            "codigoCliente"=>$this->codigoCliente,
            "nombreCliente"=>$this->nombreCliente,
            "apellidoCliente"=>$this->apellidoCliente,
            "correo"=>$this->correo,
            "fotoPerfil"=>$this->fotoPerfil,
            "contrasena"=>$this->contrasena,
            "sexo"=>$this->sexo,
            "productosFavoritos"=>$this->productosFavoritos,
            "empresasFavoritas"=>$this->empresasFavoritas,
            "carrito"=>$this->carrito
        );
        $archivo=fopen("../data/usuarios.json", "w");
        fwrite($archivo, json_encode($usuarios));
        fclose($archivo);
    }
    public static function actualizarUsuario(
            $codigoCliente, 
            $nombreCliente,
            $apellidoCliente,
            $correo,
            $fotoPerfil,
            $sexo){
        $contenidoArchivo = file_get_contents('../data/usuarios.json');
        $usuarios=json_decode($contenidoArchivo, true);
        $pos=0;
        for($i=0;$i<sizeOf($usuarios);$i++){
            if($usuarios[$i]['codigoCliente']==$codigoCliente){
                $usuario1=$usuarios[$i];
                $pos=$i;
            break;
            }
        }
        $p=[];
        $e=[];
        $c=[];
        $p=$usuario1['productosFavoritos'];
        $e=$usuario1['empresasFavoritas'];
        $c=$usuario1['carrito'];
        $usuario=array(
            "codigoCliente"=>$codigoCliente,
            "nombreCliente"=>$nombreCliente,
            "apellidoCliente"=>$apellidoCliente,
            "correo"=>sha1($correo),
            "fotoPerfil"=>$fotoPerfil,
            "contrasena"=>$usuario1['contrasena'],
            "sexo"=>$sexo,
            "productosFavoritos"=>$p,
            "empresasFavoritas"=>$e,
            "carrito"=>$c
        );
        $usuarios[$pos]=$usuario;
        echo json_encode($usuarios[$pos]);
        $archivo=fopen("../data/usuarios.json", "w");
        fwrite($archivo, json_encode($usuarios));
        fclose($archivo);
    }
    public static function eliminarUsuario($codigoCliente){
        $contenidoArchivo = file_get_contents('../data/usuarios.json');
        $usuarios=json_decode($contenidoArchivo, true);
        
        for($i=0;$i<sizeof($usuarios);$i++){
            if($usuarios[$i]['codigoCliente']==$codigoCliente){
                array_splice($usuarios,$i,1);
            break;
            }
        }
        $archivo=fopen("../data/usuarios.json", "w");
        fwrite($archivo, json_encode($usuarios));
        fclose($archivo);
    }
    public static function verificarCredenciales($correo, $contrasena){
        $contenidoArchivo = file_get_contents('../data/usuarios.json');
        $usuarios=json_decode($contenidoArchivo, true);
        $encontrado=0;
        for($i=0;$i<sizeof($usuarios);$i++){
            if($usuarios[$i]["correo"]==sha1($correo)&&$usuarios[$i]["contrasena"]==sha1($contrasena)){
                $encontrado=1;
                return json_encode($usuarios[$i]);
            break;
            }
        }
        if($encontrado==0){
            
        }
    }

}
