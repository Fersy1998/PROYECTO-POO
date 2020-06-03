<?php
    class Empresa{
        private $nombreEmpresa;
        private $codigoEmpresa;
        private $email;
        private $contrasena;
        private $pais;
        private $direccion;
        private $telefono;
        private $banner;
        private $logoimg;
        private $descripcion;
        private $longitud;
        private $latitud;
        private $sucursales=[];
        private $productos=[];
        public function __construct( 
            $nombreEmpresa,
            $codigoEmpresa,
            $email,
            $contrasena,
            $pais,
            $direccion,
            $telefono,
            $banner,
            $logoimg,
            $descripcion,
            $longitud,
            $latitud,
            $sucursales,
            $productos){
            $this->nombreEmpresa=$nombreEmpresa;
            $this->codigoEmpresa=$codigoEmpresa;
            $this->email=sha1($email);
            $this->contrasena=sha1($contrasena);
            $this->pais=$pais;
            $this->direccion=$direccion;
            $this->telefono=$telefono;
            $this->banner=$banner;
            $this->logoimg=$logoimg;
            $this->descripcion=$descripcion; 
            $this->longitud=$longitud;
            $this->latitud=$latitud;
            $this->sucursales=$sucursales;
            $this->productos=$productos;
     }
        public function getNombreEmpresa(){
            return $this->nombreEmpresa;
        }
    
        public function setNombreEmpresa($nombreEmpresa){
            $this->nombreEmpresa = $nombreEmpresa;
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
        public function getCodigoEmpresa(){
            return $this->codigoEmpresa;
        }
    
        public function setCodigoEmpresa($codigoEmpresa){
            $this->codigoEmpresa = $codigoEmpresa;
        }
        public function getEmail(){
            return $this->email;
        }
    
        public function setEmail($email){
            $this->email = $email;
        }
        
        public function getcontrasena(){
            return $this->contrasena;
        }
    
        public function setcontrasena($contrasena){
            $this->contrasena = $contrasena;
        }
        public function getPais(){
            return $this->pais;
        }
    
        public function setPais($pais){
            $this->pais = $pais;
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
    
        public function getBanner(){
            return $this->banner;
        }
    
        public function setBanner($banner){
            $this->banner = $banner;
        }
    
        public function getLogoimg(){
            return $this->logoimg;
        }
    
        public function setLogoimg($logoimg){
            $this->logoimg = $logoimg;
        }
    
        public function getDescripcion(){
            return $this->descripcion;
        }
    
        public function setDescripcion($descripcion){
            $this->descripcion = $descripcion;
        }
    
        public function getSucursales(){
            return $this->sucursales;
        }
    
        public function setSucursales($sucursales){
            $this->sucursales = $sucursales;
        }
        public static function setSucursal($codigoEmpresa,$codigoSucursal){
            $contenidoArchivo=file_get_contents('../data/empresas.json');
            $empresas=json_decode($contenidoArchivo, true);
            $indice=null;
            for ($i=0;$i<sizeOf($empresas);$i++) {
                if ($empresas[$i]['codigoEmpresa']==$codigoEmpresa) {
                    $empresa=$empresas[$i];
                    $indice=$i;
                    break;
                }
            }
            $sucursales=$empresa["sucursales"];
            $nombreEmpresa=$empresa["nombreEmpresa"];
            echo json_encode($nombreEmpresa);
            echo json_encode($sucursales);
            if($sucursales==null){
                $sucursales=[];
                $sucursales[0]==$codigoSucursal;
            }
            if (array_search($codigoSucursal, $sucursales, false)==false) {
                array_push($sucursales, $codigoSucursal);
            }
                echo json_encode($sucursales);
                $actempresa=array(
                    "nombreEmpresa"=>$empresa['nombreEmpresa'],
                    "codigoEmpresa"=>$empresa['codigoEmpresa'],
                    "email"=>$empresa['email'],
                    "contrasena"=>$empresa['contrasena'],
                    "pais"=>$empresa['pais'],
                    "direccion"=>$empresa['direccion'],
                    "telefono"=>$empresa['telefono'],
                    "banner"=>$empresa['banner'],
                    "logoimg"=>$empresa['logoimg'],
                    "descripcion"=>$empresa['descripcion'],
                    "longitud"=>$empresa['longitud'],
                    "latitud"=>$empresa['latitud'],
                    "sucursales"=>$sucursales,
                    "productos"=>$empresa['productos'],
    
                );
                $empresas[$indice]=$actempresa;
                $archivo=fopen("../data/empresas.json", "w");
                fwrite($archivo, json_encode($empresas));
                fclose($archivo);
            
        }
        public static function deleteSucursal($codigoEmpresa,$codigoSucursal){
            $contenidoArchivo=file_get_contents('../data/empresas.json');
            $empresas=json_decode($contenidoArchivo, true);
            $indice=null;
            for ($i=0;$i<sizeOf($empresas);$i++) {
                if ($empresas[$i]['codigoEmpresa']==$codigoEmpresa) {
                    $empresa=$empresas[$i];
                    $indice=$i;
                    break;
                }
            }
                    $sucursales=$empresa["sucursales"];
                    for($i=0;$i<sizeof($sucursales);$i++){
                        if($sucursales[$i]==$codigoSucursal){
                            array_splice($sucursales,$i,1);
                        break;
                        }
                    }
                    $actempresa=array(
                        "nombreEmpresa"=>$empresa['nombreEmpresa'],
                        "codigoEmpresa"=>$empresa['codigoEmpresa'],
                        "email"=>$empresa['email'],
                        "contrasena"=>$empresa['contrasena'],
                        "pais"=>$empresa['pais'],
                        "direccion"=>$empresa['direccion'],
                        "telefono"=>$empresa['telefono'],
                        "banner"=>$empresa['banner'],
                        "logoimg"=>$empresa['logoimg'],
                        "descripcion"=>$empresa['descripcion'],
                        "longitud"=>$empresa['longitud'],
                        "latitud"=>$empresa['latitud'],
                        "sucursales"=>$sucursales,
                        "productos"=>$empresa['productos']
        
                    );
                    echo json_encode($sucursales);
                    $empresas[$indice]=$actempresa;
                    $archivo=fopen("../data/empresas.json", "w");
                    fwrite($archivo, json_encode($empresas));
                    fclose($archivo);     
        }
    
        public function getProductos(){
            return $this->productos;
        }
    
        public function setProductos($productos){
            $this->productos = $productos;
        }
        public static function setProducto($codigoEmpresa,$codigoProducto){
            $contenidoArchivo=file_get_contents('../data/empresas.json');
            $empresas=json_decode($contenidoArchivo, true);
            $indice=null;
            for ($i=0;$i<sizeOf($empresas);$i++) {
                if ($empresas[$i]['codigoEmpresa']==$codigoEmpresa) {
                    $empresa=$empresas[$i];
                    $indice=$i;
                    break;
                }
            }
            $productos=$empresa["productos"];
            $nombreEmpresa=$empresa["nombreEmpresa"];
            echo json_encode($nombreEmpresa);
            echo json_encode($productos);
            if($productos==null){
                $productos=[];
                $productos[0]==$codigoProducto;
            }
            if (array_search($codigoProducto, $productos, false)==false) {
                array_push($productos, $codigoProducto);
            }
                echo json_encode($productos);
                $actempresa=array(
                    "nombreEmpresa"=>$empresa['nombreEmpresa'],
                    "codigoEmpresa"=>$empresa['codigoEmpresa'],
                    "email"=>$empresa['email'],
                    "contrasena"=>$empresa['contrasena'],
                    "pais"=>$empresa['pais'],
                    "direccion"=>$empresa['direccion'],
                    "telefono"=>$empresa['telefono'],
                    "banner"=>$empresa['banner'],
                    "logoimg"=>$empresa['logoimg'],
                    "descripcion"=>$empresa['descripcion'],
                    "longitud"=>$empresa['longitud'],
                    "latitud"=>$empresa['latitud'],
                    "sucursales"=>$empresa['sucursales'],
                    "productos"=>$productos
    
                );
                $empresas[$indice]=$actempresa;
                $archivo=fopen("../data/empresas.json", "w");
                fwrite($archivo, json_encode($empresas));
                fclose($archivo);
            
        }
        public static function deleteProducto($codigoEmpresa,$codigoProducto){
            $contenidoArchivo=file_get_contents('../data/empresas.json');
            $empresas=json_decode($contenidoArchivo, true);
            $indice=null;
            for ($i=0;$i<sizeOf($empresas);$i++) {
                if ($empresas[$i]['codigoEmpresa']==$codigoEmpresa) {
                    $empresa=$empresas[$i];
                    $indice=$i;
                    break;
                }
            }
                    $productos=$empresa["productos"];
                    for($i=0;$i<sizeof($productos);$i++){
                        if($productos[$i]==$codigoProducto){
                            array_splice($productos,$i,1);
                        break;
                        }
                    }
                    $actempresa=array(
                        "nombreEmpresa"=>$empresa['nombreEmpresa'],
                        "codigoEmpresa"=>$empresa['codigoEmpresa'],
                        "email"=>$empresa['email'],
                        "contrasena"=>$empresa['contrasena'],
                        "pais"=>$empresa['pais'],
                        "direccion"=>$empresa['direccion'],
                        "telefono"=>$empresa['telefono'],
                        "banner"=>$empresa['banner'],
                        "logoimg"=>$empresa['logoimg'],
                        "descripcion"=>$empresa['descripcion'],
                        "longitud"=>$empresa['longitud'],
                        "latitud"=>$empresa['latitud'],
                        "productos"=>$productos,
                        "sucursales"=>$empresa["sucursales"]
        
                    );
                    echo json_encode($productos);
                    $empresas[$indice]=$actempresa;
                    $archivo=fopen("../data/empresas.json", "w");
                    fwrite($archivo, json_encode($empresas));
                    fclose($archivo);     
        }
    
        public static function getEmpresa($codigoEmpresa){
            $contenidoArchivo=file_get_contents("../data/empresas.json");
            $empresas=json_decode($contenidoArchivo, true);
            $encontrado=0;
            for($i=0;$i<sizeof($empresas);$i++){
                if($empresas[$i]['codigoEmpresa']==$codigoEmpresa){
                    $encontrado=1;
                    echo json_encode($empresas[$i]);
                    return json_encode($empresas[$i]);
                }else if($empresas[$i]['email']==$codigoEmpresa){
                    $encontrado=1;
                    echo $empresas[$i]['codigoEmpresa'];
                    return $empresas[$i]['codigoEmpresa'];
                }
            }
            if($encontrado==0){
                echo "null";
                return "null";
            }
        }
        public static function getEmpresas(){     
            $contenidoArchivo = file_get_contents('../data/empresas.json');
            $empresas=json_decode($contenidoArchivo);
            echo json_encode($empresas);
            return $contenidoArchivo;
        }
        public function setEmpresa(){
            $contenidoArchivo = file_get_contents('../data/empresas.json');
            $empresa=json_decode($contenidoArchivo, true);
            $empresa[]=array(
                "nombreEmpresa"=>$this->nombreEmpresa,
                "codigoEmpresa"=>$this->codigoEmpresa,
                "email"=>$this->email,
                "contrasena"=>$this->contrasena,
                "pais"=>$this->pais,
                "direccion"=>$this->direccion,
                "telefono"=>$this->telefono,
                "banner"=>$this->banner,
                "logoimg"=>$this->logoimg,
                "descripcion"=>$this->descripcion,
                "longitud"=>$this->longitud,
                "latitud"=>$this->latitud,
                "sucursales"=>$this->sucursales,
                "productos"=>$this->productos
            );
            $archivo=fopen("../data/empresas.json", "w");
            fwrite($archivo, json_encode($empresa));
            fclose($archivo);
        }
        public static function actualizarEmpresa(
                $nombreEmpresa,
                $codigoEmpresa,
                $pais,
                $direccion,
                $telefono,
                $banner,
                $logoimg,
                $descripcion,
                $longitud,
                $latitud){
            $contenidoArchivo = file_get_contents('../data/empresas.json');
            $empresas=json_decode($contenidoArchivo, true);
            $pos=0;
            for($i=0;$i<sizeOf($empresas);$i++){
                if($empresas[$i]['codigoEmpresa']==$codigoEmpresa){
                    $empresa=$empresas[$i];
                    $pos=$i;
                break;
                }
            }
            $p=[];
            $s=[];
            $p=$empresa['productos'];
            $s=$empresa['sucursales'];
            $empresaact=array(
                "nombreEmpresa"=>$nombreEmpresa,
                "codigoEmpresa"=>$codigoEmpresa,
                "email"=>$empresa['email'],
                "contrasena"=>$empresa['contrasena'],
                "pais"=>$pais,
                "direccion"=>$direccion,
                "telefono"=>$telefono,
                "banner"=>$banner,
                "logoimg"=>$logoimg,
                "descripcion"=>$descripcion,
                "longitud"=>$longitud,
                "latitud"=>$latitud,
                "sucursales"=>$s,
                "productos"=>$p
            );
            $empresas[$pos]=$empresaact;
            $archivo=fopen("../data/empresas.json", "w");
            fwrite($archivo, json_encode($empresas));
            fclose($archivo);
        }
        public static function eliminarEmpresa($codigoEmpresa){
            $contenidoArchivo = file_get_contents('../data/empresas.json');
            $empresas=json_decode($contenidoArchivo, true);
            for($i=0;$i<sizeof($empresas);$i++){
                if($empresas[$i]['codigoEmpresa']==$codigoEmpresa){
                    array_splice($empresas,$i,1);
                break;
                }
            }
            $archivo=fopen("../data/empresas.json", "w");
            fwrite($archivo, json_encode($empresas));
            fclose($archivo);
        }
        public static function verificarCredenciales($email, $contrasena){
            $contenidoArchivo = file_get_contents('../data/empresas.json');
            $empresas=json_decode($contenidoArchivo, true);
            $encontrado=0;
            for($i=0;$i<sizeof($empresas);$i++){
               
                if($empresas[$i]["email"]==sha1($email)&&$empresas[$i]["contrasena"]==sha1($contrasena)){
                    $encontrado=1;
                    return json_encode($empresas[$i]);
                break;
                }
            }
            if($encontrado==0){
                return "nada";
            }
        }
    }
    
?>