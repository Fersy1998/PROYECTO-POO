<?php
class Sucursal{
    private $codigoSucursal;
    private $direccion;
    private $telefono;
    private $pais;
    private $longitud;
    private $latitud; 
    private $foto; 
    public function __construct(
        $codigoSucursal,
        $direccion,
        $telefono,
        $pais,
        $longitud,
        $latitud,
        $foto
    ){   
        $this->codigoSucursal=$codigoSucursal;
        $this->direccion=$direccion;
        $this->telefono=$telefono;
        $this->pais=$pais;
        $this->longitud=$longitud;
        $this->latitud=$latitud;
        $this->foto=$foto;
    }
    public function getCodigoSucursal(){
		return $this->codigoSucursal;
	}

	public function setCodigoSucursal($codigoSucursal){
		$this->codigoSucursal = $codigoSucursal;
	}
    public function getDireccion(){
		return $this->direccion;
	}

	public function setDireccion($direccion){
		$this->direccion = $direccion;
	}

    public function getFoto(){
		return $this->foto;
	}

	public function setFoto($foto){
		$this->Foto = $foto;
	}
	public function getTelefono(){
		return $this->telefono;
	}

	public function setTelefono($telefono){
		$this->telefono = $telefono;
	}

	public function getPais(){
		return $this->pais;
	}

	public function setPais($pais){
		$this->pais = $pais;
	}

	public function getLongitud(){
		return $this->longitud;
	}

	public function setLongitud($longitud){
		$this->longitud = $longitud;
	}

	public function getLatitud(){
		return $this->latitud;
	}

	public function setLatitud($latitud){
		$this->latitud = $latitud;
	}
    public static function getSucursal($indice){
        $contenidoArchivo=file_get_contents("../data/sucursales.json");
        $sucursales=json_decode($contenidoArchivo, true);
        $encontrado=0;
        for($i=0;$i<sizeof($sucursales);$i++){
            if($sucursales[$i]['codigoSucursal']==$indice){
                $encontrado=1;
                echo json_encode($sucursales[$i]);
                return json_encode($sucursales[$i]);
            break;
            }
        }
        if($encontrado==0){
            echo "null";
            return "null";
        }
    }
    public static function getSucursales(){
        $contenidoArchivo = file_get_contents('../data/sucursales.json');
        $sucursales=json_decode($contenidoArchivo, true);
        echo json_encode($sucursales);
    }
    public static function eliminarSucursal($codigoSucursal){
        $contenidoArchivo = file_get_contents('../data/sucursales.json');
        $sucursales=json_decode($contenidoArchivo, true);
        
        for($i=0;$i<sizeof($sucursales);$i++){
            if($sucursales[$i]['codigoSucursal']==$codigoSucursal){
                array_splice($sucursales,$i,1);
            break;
            }
        }
        $archivo=fopen("../data/sucursales.json", "w");
        fwrite($archivo, json_encode($sucursales));
        fclose($archivo);
    }
    public function setSucursal(){
        $contenidoArchivo = file_get_contents('../data/sucursales.json');
        $sucursales=json_decode($contenidoArchivo, true);
        $sucursales[]=array(
            "codigoSucursal"=>$this->codigoSucursal,
            "direccion"=>$this->direccion,
            "telefono"=>$this->telefono,
            "pais"=>$this->pais,
            "longitud"=>$this->longitud,
            "latitud"=>$this->latitud,
            "foto"=>$this->foto,
            
        );
        $archivo=fopen("../data/sucursales.json", "w");
        fwrite($archivo, json_encode($sucursales));
        fclose($archivo);
    }

}

?>