<?php

// Configuración de encabezados CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Enviar respuesta preflight
    http_response_code(200);
    exit();
}

// Incluye el archivo de conexión
include('../../modelo/conexion.php');
global $conexion;

// Verifica que la conexión a la base de datos esté establecida
if (!$conexion) {
    echo json_encode(array('error' => 'Error de conexión a la base de datos'));
    exit();
}

$datos = json_decode(file_get_contents("php://input"), true);

function crearContacto($conexion, $nombre, $apellido, $email, $mensaje) {
    try {
        $sql = "INSERT INTO contacto (nombre, apellido, email, mensaje) 
                VALUES (:nombre, :apellido, :email, :mensaje)";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':apellido', $apellido);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':mensaje', $mensaje);
        $stmt->execute();
        return array('success' => "Mensaje enviado correctamente");
    } catch (PDOException $e) {
        return array('error' => "Error al enviar mensaje: " . $e->getMessage());
    }
}

$response = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($datos['accion']) && $datos['accion'] == 'enviar_contacto') {
        $response = crearContacto($conexion, $datos['nombre'], $datos['apellido'], $datos['email'], $datos['mensaje']);
    }
}

echo json_encode($response);
?>
