<?php
class Comentario{
    private $codigoComentario;
    private $codigoProducto;
    private $codigoUsuario;
    private $contenido;
    public function __construct(
        $codigoComentario,
        $codigoProducto,
        $codigoUsuario,
        $contenido
    ){
        $this->codigoComentario=$codigoComentario;
        $this->codigoProducto=$codigoProducto;
        $this->codigoUsuario=$codigoUsuario;
        $this->contenido=$contenido;
    }
    public function getCodigoProducto(){
		return $this->codigoProducto;
	}

	public function setCodigoProducto($codigoProducto){
		$this->codigoProducto = $codigoProducto;
    }
    public function getCodigoComentario(){
		return $this->codigoComentario;
	}

	public function setCodigoComentario($codigoComentario){
		$this->codigoComentario = $codigoComentario;
	}

	public function getCodigoUsuario(){
		return $this->codigoUsuario;
	}

	public function setCodigoUsuario($codigoUsuario){
		$this->codigoUsuario = $codigoUsuario;
	}

	public function getContenido(){
		return $this->contenido;
	}

	public function setContenido($contenido){
		$this->contenido = $contenido;
    }
    public static function getComentario($indice){
        $contenidoArchivo=file_get_contents("../data/comentarios.json");
        $comentarios=json_decode($contenidoArchivo, true);
        $encontrado=0;
        for($i=0;$i<sizeof($comentarios);$i++){
            if($comentarios[$i]['codigoComentario']==$indice){
                $encontrado=1;
                echo json_encode($comentarios[$i]);
                return json_encode($comentarios[$i]);
            break;
            }
        }
        if($encontrado==0){
            echo "null";
            return "null";
        }
    }
    public static function getcomentarios(){
        $contenidoArchivo = file_get_contents('../data/comentarios.json');
        $comentarios=json_decode($contenidoArchivo, true);
        echo json_encode($comentarios);
    }
    public function setComentario(){
        $contenidoArchivo = file_get_contents('../data/comentarios.json');
        $comentarios=json_decode($contenidoArchivo, true);
        $comentarios[]=array(
            "contenido"=>$this->contenido,
            "codigoComentario"=>$this->codigoComentario,
            "codigoUsuario"=>$this->codigoUsuario,
            "codigoProducto"=>$this->contenido,
            
        );
        $archivo=fopen("../data/comentarios.json", "w");
        fwrite($archivo, json_encode($comentarios));
        fclose($archivo);
    }
    public function actualizarComentario($codigoComentario){
        $contenidoArchivo = file_get_contents('../data/comentarios.json');
        $comentarios=json_decode($contenidoArchivo, true);
        $comentario=array(
            "codigoProducto"=>$this->codigoProducto,
            "codigoComentario"=>$this->codigoComentario,
            "codigoUsuario"=>$this->codigoUsuario,
            "contenido"=>$this->contenido,
        );
        for($i=0;$i<sizeOf($comentarios);$i++){
            if($comentarios[$i]['codigoComentario']==$codigoComentario){
                $comentarios[$i]=$comentario;
            break;
            }
        }
        $archivo=fopen("../data/comentarios.json", "w");
        fwrite($archivo, json_encode($comentarios));
        fclose($archivo);
    }
    public static function eliminarComentario($codigoComentario){
        $contenidoArchivo = file_get_contents('../data/comentarios.json');
        $comentarios=json_decode($contenidoArchivo, true);
        
        for($i=0;$i<sizeof($comentarios);$i++){
            if($comentarios[$i]['codigoComentario']==$codigoComentario){
                array_splice($comentarios,$i,1);
            break;
            }
        }
        $archivo=fopen("../data/comentarios.json", "w");
        fwrite($archivo, json_encode($comentarios));
        fclose($archivo);
    }
}
?>