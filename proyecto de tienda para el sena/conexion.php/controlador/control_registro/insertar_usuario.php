<?php
include ('../../modelo/conexion.php');




try {
    //code...
        $sql ="INSERT INTO `registro_usuario`(`nombre`, `apellidos`, `correo_electronico`, `telefono`, `clave`) VALUES ('[jesus]','[restre]','[v@gmail.com]','[4555]','[4536]')";

$preparacion = $conexion->prepare($sql);
$preparacion->execute();

echo "Datos insertados correctamente";
} catch (PDOExeption $e) {
    echo "Error al insertar datos" . $e->getMessage();
}



?>