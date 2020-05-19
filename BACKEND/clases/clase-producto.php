<?php
class Producto{
    private $producto;
    private $codigoProducto;
    private $code;
    private $codigoEmpresa;
    private $descripcionProducto;
    private $foto;
    private $precio;
    private $descuento;
    private $valoracion;
    private $valoraciones=[];
    private $comentarios=[];
    public function __construct(
        $producto,
        $codigoProducto,
        $descripcionProducto,
        $code,
        $foto,
        $precio,
        $descuento,
        $valoracion,
        $valoraciones,
        $comentarios,
        $codigoEmpresa
    ){
        $this->producto=$producto;
        $this->codigoProducto=$codigoProducto;
        $this->descripcionProducto=$descripcionProducto;
        $this->foto=$foto;
        $this->code=$code;
        $this->precio=$precio;
        $this->descuento=$descuento;
        $this->valoracion=$valoracion;
        $this->valoraciones=$valoraciones;
        $this->comentarios=$comentarios;
        $this->codigoEmpresa=$codigoEmpresa;
    }
    public function getProducto(){
		return $this->producto;
	}

	public function setProducto($producto){
		$this->producto = $producto;
    }
    public function getCode(){
		return $this->code;
	}

	public function setCode($code){
		$this->code = $code;
    }
    

	public function getCodigoProducto(){
		return $this->codigoProducto;
	}

	public function setCodigoEmpresa($codigoEmpresa){
		$this->codigoEmpresa = $codigoEmpresa;
	}
    public function getCodigoEmpresa(){
		return $this->codigoEmpresa;
	}

	public function setCodigoProducto($codigoProducto){
		$this->codigoProducto = $codigoProducto;
	}
	public function getDescripcionProducto(){
		return $this->descripcionProducto;
	}

	public function setDescripcionProducto($descripcionProducto){
		$this->descripcionProducto = $descripcionProducto;
	}

	public function getFoto(){
		return $this->foto;
	}

	public function setFoto($foto){
		$this->foto = $foto;
	}

	public function getPrecio(){
		return $this->precio;
	}

	public function setPrecio($precio){
		$this->precio = $precio;
	}

	public function getDescuento(){
		return $this->descuento;
	}

	public function setDescuento($descuento){
		$this->descuento = $descuento;
	}

	public function getValoracion(){
		return $this->valoracion;
	}

	public function setValoracion($valoracion){
		$this->valoracion = $valoracion;
	}

	public function getValoraciones(){
		return $this->valoraciones;
    }
    

	public function setValoraciones($valoraciones){
		$this->valoraciones = $valoraciones;
    }
   

	public function getComentarios(){
		return $this->comentarios;
	}

	public function setComentarios($comentarios){
		$this->comentarios = $comentarios;
    }
    public static function setUnComentario($codComentario,$codProducto){
        $contenidoArchivo=file_get_contents('../data/productos.json');
        $productos=json_decode($contenidoArchivo, true);
        $indice=null;
        for ($i=0;$i<sizeOf($productos);$i++) {
            if ($productos[$i]['code']==$codProducto) {
                $producto=$productos[$i];
                $indice=$i;
                break;
            }
        }
        $comentarios=$producto["comentarios"];
        if($comentarios==null){
            $comentarios=[];
            $comentarios[0]=$codComentario;
        }else{
            if((array_search($codComentario, $comentarios, false)==false)){
                array_push($comentarios, $codComentario);
            }
           
        }
        echo json_encode($comentarios);
            $actproducto=array(
                "producto"=>$producto["producto"],
                "codigoProducto"=>$producto["codigoProducto"],
                "descripcionProducto"=>$producto["descripcionProducto"],
                "foto"=>$producto["foto"],
                "code"=>$producto["code"],
                "precio"=>$producto["precio"],
                "descuento"=>$producto["descuento"],
                "valoracion"=>$producto["valoracion"],
                "valoraciones"=>$producto["valoraciones"],
                "comentarios"=>$comentarios,
                "codigoEmpresa"=>$producto["codigoEmpresa"]

            );
            $productos[$indice]=$actproducto;
            $archivo=fopen("../data/productos.json", "w");
            fwrite($archivo, json_encode($productos));
            fclose($archivo);
    }
    public static function setUnaValoracion($val,$codProducto){
        $contenidoArchivo=file_get_contents('../data/productos.json');
        $productos=json_decode($contenidoArchivo, true);
        $indice=null;
        $producto=0;
        for ($i=0;$i<sizeOf($productos);$i++) {
            if ($productos[$i]['code']==$codProducto) {
                $producto=$productos[$i];
                $indice=$i;
                break;
            }
        }
        $valoraciones=$producto["valoraciones"];
        $valoracion=0;
        if($valoraciones==null){
            $valoraciones=[];
            $valoraciones[0]=$val;
            $valoracion=$val;
        }else{
            array_push($valoraciones, $val);
            $suma=0;
            foreach ($valoraciones as $numero) {
                $suma += $numero;
            }
            $valoracion=$suma/sizeOf($valoraciones);
        }
        
        echo json_encode($valoraciones);
            $actproducto=array(
                "producto"=>$producto["producto"],
                "codigoProducto"=>$producto["codigoProducto"],
                "descripcionProducto"=>$producto["descripcionProducto"],
                "foto"=>$producto["foto"],
                "code"=>$producto["code"],
                "precio"=>$producto["precio"],
                "descuento"=>$producto["descuento"],
                "valoracion"=>round($valoracion),
                "valoraciones"=>$valoraciones,
                "comentarios"=>$producto["comentarios"],
                "codigoEmpresa"=>$producto["codigoEmpresa"]

            );
            $productos[$indice]=$actproducto;
            $archivo=fopen("../data/productos.json", "w");
            fwrite($archivo, json_encode($productos));
            fclose($archivo);
    }
    public static function getProduct($indice){
        $contenidoArchivo=file_get_contents("../data/productos.json");
        $productos=json_decode($contenidoArchivo, true);
        $encontrado=0;
        for($i=0;$i<sizeof($productos);$i++){
            if($productos[$i]['code']==$indice){
                $encontrado=1;
                echo json_encode($productos[$i]);
                return json_encode($productos[$i]);
            break;
            }
            else if($productos[$i]['codigoProducto']==$indice){
                $encontrado=1;
                echo $productos[$i];
                return $productos[$i];
            break;
            }
        }
        if($encontrado==0){
            echo "null";
            return "null";
        }
    }
    public static function getProductos(){
        $contenidoArchivo = file_get_contents('../data/productos.json');
        $productos=json_decode($contenidoArchivo, true);
        echo json_encode($productos);
    }
    public function setProduct(){
        $contenidoArchivo = file_get_contents('../data/productos.json');
        $productos=json_decode($contenidoArchivo, true);
        $productos[]=array(
            "producto"=>$this->producto,
            "codigoProducto"=>$this->codigoProducto,
            "descripcionProducto"=>$this->descripcionProducto,
            "foto"=>$this->foto,
            "code"=>$this->code,
            "precio"=>$this->precio,
            "descuento"=>$this->descuento,
            "valoracion"=>$this->valoracion,
            "valoraciones"=>$this->valoraciones,
            "comentarios"=>$this->comentarios,
            "codigoEmpresa"=>$this->codigoEmpresa
        );
        $archivo=fopen("../data/productos.json", "w");
        fwrite($archivo, json_encode($productos));
        fclose($archivo);
    }
    public static function actualizarProducto(
            $producto,
            $codigoProducto,
            $code,
            $descripcionProducto,
            $foto,
            $precio,
            $descuento){
        $contenidoArchivo = file_get_contents('../data/productos.json');
        $productos=json_decode($contenidoArchivo, true);
        $pos=0;
        for ($i=0;$i<sizeOf($productos);$i++) {
            if ($productos[$i]['code']==$codigoProducto) {
                $productos=$productos[$i];
                $pos=$i;
                break;
            }
        }
        $productoact=array(
            "producto"=>$producto,
            "codigoProducto"=>$codigoProducto,
            "descripcionProducto"=>$descripcionProducto,
            "foto"=>$foto,
            "code"=>$code,
            "precio"=>$precio,
            "descuento"=>$descuento,
            "valoracion"=>$producto['valoracion'],
            "valoraciones"=>$producto['valoracione'],
            "comentarios"=>$producto['comentarios'],
            "codigoEmpresa"=>$producto['codigoEmpresa']
        );
        $productos[$pos]=$productoact;
        $archivo=fopen("../data/productos.json", "w");
        fwrite($archivo, json_encode($productos));
        fclose($archivo);
    }
    public static function eliminarProducto($codigoProducto){
        $contenidoArchivo = file_get_contents('../data/Productos.json');
        $productos=json_decode($contenidoArchivo, true);
        
        for($i=0;$i<sizeof($productos);$i++){
            if($productos[$i]['code']==$codigoProducto){
                array_splice($productos,$i,1);
            break;
            }
        }
        $archivo=fopen("../data/productos.json", "w");
        fwrite($archivo, json_encode($productos));
        fclose($archivo);
    }
}
?>