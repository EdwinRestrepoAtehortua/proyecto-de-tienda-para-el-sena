<?php
include ('../../modelo/conexion.php');

// Establece las cabeceras para que la respuesta sea en formato JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

// Verifica si la solicitud es de tipo POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = $_POST;

    // Verifica que el campo id_usuario esté presente
    if (isset($data['id_usuario'])) {
        try {
            // Prepara la consulta SQL para eliminar el usuario
            $sql = "DELETE FROM `registro_usuario` WHERE `id_usuario` = :id_usuario";

            $preparacion = $conexion->prepare($sql);
            $preparacion->bindParam(':id_usuario', $data['id_usuario']);
            $preparacion->execute();

            // Respuesta exitosa
            echo json_encode(['success' => true, 'message' => 'Cuenta eliminada correctamente']);
        } catch (PDOException $e) {
            // Respuesta de error en caso de que la consulta falle
            echo json_encode(['success' => false, 'message' => 'Error al eliminar cuenta: ' . $e->getMessage()]);
        }
    } else {
        // Respuesta si el campo id_usuario está ausente
        echo json_encode(['success' => false, 'message' => 'Falta el campo id_usuario']);
    }
} else {
    // Respuesta si la solicitud no es POST
    echo json_encode(['success' => false, 'message' => 'Solicitud no válida']);
}
?>
