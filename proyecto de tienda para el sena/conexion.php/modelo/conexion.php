<?php


try {
    //code...
    $conexion = new PDO("mysql:host=localhost;dbname=market_online","root","");
    //echo "conexion exitosa, ";
   //echo"<br>";
} catch (\Throwable $th) {
    //throw $th;
    //echo "fallo conexion $th";
}

?>