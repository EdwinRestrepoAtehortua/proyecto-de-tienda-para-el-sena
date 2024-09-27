<?php
// Configuración de CORS
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include('../../modelo/conexion.php');
session_start();

$response = [];

// Verificar si el usuario está autenticado
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'No se ha iniciado sesión.']);
    exit();
}

// Decodificar los datos JSON recibidos
$datos = json_decode(file_get_contents("php://input"), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['error' => 'Datos JSON inválidos', 'detalle' => json_last_error_msg()]);
    exit;
}

if (isset($datos['nombre']) && isset($datos['email'])) {
    $user_id = $_SESSION['user_id'];
    $nombre = $datos['nombre'];
    $email = $datos['email'];

    try {
        // Preparar la consulta para actualizar el usuario
        $sql = "UPDATE usuarios SET nombre = :nombre, email = :email WHERE id = :id";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':id', $user_id);

        // Ejecutar la consulta
        if ($stmt->execute()) {
            $response = ['success' => 'Perfil actualizado correctamente.'];
        } else {
            $response = ['error' => 'No se pudo actualizar el perfil.'];
        }
    } catch (PDOException $e) {
        $response = ['error' => 'Error al actualizar el perfil: ' . $e->getMessage()];
    }
} else {
    $response = ['error' => 'Datos incompletos.'];
}
// Ejemplo de inicio de sesión

session_start();
if ($usuarioAutenticado) {
    $_SESSION['user_id'] = $usuario['id']; // Asegúrate de que 'id' es el ID del usuario autenticado
    echo json_encode(['success' => 'Inicio de sesión exitoso']);
} else {
    echo json_encode(['error' => 'Usuario o clave incorrectos']);
}

// Enviar respuesta en formato JSON
echo json_encode($response);
?>
