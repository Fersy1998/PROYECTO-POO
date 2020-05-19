<?php
class Sucursal{
    private $codigoSucursal;
    private $direccion;
    private $telefono;
    private $pais;
    private $longitud;
    private $latitud; 
    public function __construct(
        $codigoSucursal,
        $direccion,
        $telefono,
        $pais,
        $longitud,
        $latitud
    ){   
        $this->codigoSucursal=$codigoSucursal;
        $this->direccion=$direccion;
        $this->telefono=$telefono;
        $this->pais=$pais;
        $this->longitud=$longitud;
        $this->latitud=$latitud;
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



}

?>