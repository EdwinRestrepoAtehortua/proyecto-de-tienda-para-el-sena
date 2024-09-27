<?php
include('conexion.php');
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'error' => 'No autenticado']);
    exit();
}

$datos = json_decode(file_get_contents("php://input"), true);
if (!isset($datos['nombre'], $datos['email'])) {
    echo json_encode(['success' => false, 'error' => 'Datos incompletos']);
    exit();
}

$user_id = $_SESSION['user_id'];
$nombre = $datos['nombre'];
$email = $datos['email'];

$sql = "UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?";
$stmt = $conexion->prepare($sql);

if ($stmt->execute([$nombre, $email, $user_id])) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Error al actualizar perfil']);
}
?>
