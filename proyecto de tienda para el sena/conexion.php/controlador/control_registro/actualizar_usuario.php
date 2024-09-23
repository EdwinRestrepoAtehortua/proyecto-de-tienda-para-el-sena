<?php
include ('../../modelo/conexion.php');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Obtener datos de POST
$data = $_POST;

// Verificar que los campos obligatorios estén presentes
if (isset($data['id_usuario'], $data['nombre'], $data['apellidos'], $data['email'], $data['telefono'], $data['Direccion'])) {
    try {
        // Comenzar a construir la consulta SQL
        $sql = "UPDATE `registro_usuario` SET 
                `nombre` = :nombre,
                `apellidos` = :apellidos,
                `email` = :email,
                `telefono` = :telefono,
                `Direccion` = :Direccion";
        
        // Si se ha enviado una foto, agregarla a la consulta
        if (isset($data['Foto']) && !empty($data['Foto'])) {
            $sql .= ", `Foto` = :Foto";
        }

        $sql .= " WHERE `id_usuario` = :id_usuario";

        // Preparar la consulta SQL
        $preparacion = $conexion->prepare($sql);

        // Vincular los parámetros obligatorios
        $preparacion->bindParam(':nombre', $data['nombre']);
        $preparacion->bindParam(':apellidos', $data['apellidos']);
        $preparacion->bindParam(':email', $data['email']);
        $preparacion->bindParam(':telefono', $data['telefono']);
        $preparacion->bindParam(':Direccion', $data['Direccion']);
        $preparacion->bindParam(':id_usuario', $data['id_usuario']);

        // Si se envió una foto, vincularla también
        if (isset($data['Foto']) && !empty($data['Foto'])) {
            $preparacion->bindParam(':Foto', $data['Foto']);
        }

        // Ejecutar la consulta
        $preparacion->execute();

        // Respuesta exitosa
        echo json_encode(['success' => true, 'message' => 'Datos actualizados correctamente']);
    } catch (PDOException $e) {
        // Enviar mensaje de error en caso de excepción
        echo json_encode(['success' => false, 'message' => 'Error al actualizar los datos: ' . $e->getMessage()]);
    }
} else {
    // Si faltan los campos obligatorios
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
}
?>
