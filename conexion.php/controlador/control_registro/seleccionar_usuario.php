<?php
include ('../../modelo/conexion.php');

$sql ="SELECT * FROM `registro_usuario`";

$preparacion = $conexion->prepare($sql);
$preparacion->execute();
$datos = $preparacion->fetchAll(PDO::FETCH_ASSOC);
//print_r($datos);

foreach ($datos as $registro) {
  
echo $registro ['nombre'];
echo "<br>" ;

}



?>