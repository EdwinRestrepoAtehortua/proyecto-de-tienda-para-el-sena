<?php

// Configurar encabezados para permitir solicitudes desde otros dominios (CORS)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Access-Control-Allow-Headers");

// Configurar error reporting para ver errores PHP
error_reporting(E_ALL);
ini_set('display_errors', 1);

include('../../modelo/conexion.php');

global $conexion;

// Decodificar los datos JSON recibidos
$datos = json_decode(file_get_contents("php://input"), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['error' => 'Datos JSON inválidos']);
    exit;
}

function verificarUsuario($conexion, $email, $password) {
    try {
        $sql = "SELECT * FROM registro_usuario WHERE email = :email AND password = :password";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        $stmt->execute();
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($usuario) {
            return ['success' => "Inicio de sesión exitoso", 'usuario' => $usuario];
        } else {
            return ['error' => "Usuario o clave incorrectos"];
        }
    } catch (PDOException $e) {
        return ['error' => "Error al verificar usuario: " . $e->getMessage()];
    }
}

function recuperarClave($conexion, $email) {
    try {
        $sql = "SELECT * FROM registro_usuario WHERE email = :email";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario) {
            // Generar un token de restablecimiento
            $token = bin2hex(random_bytes(50));

            // Actualizar el token en la base de datos
            $updateToken = "UPDATE registro_usuario SET reset_token = :token, reset_token_expiry = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE email = :email";
            $stmtToken = $conexion->prepare($updateToken);
            $stmtToken->bindParam(':token', $token);
            $stmtToken->bindParam(':email', $email);
            $stmtToken->execute();

            // Enlace para restablecer la contraseña
            $resetLink = "http://localhost/reset_password.php?token=$token";

            // Enviar el correo electrónico
            $subject = "Recuperación de contraseña";
            $message = "Haga clic en el siguiente enlace para restablecer su contraseña: $resetLink";
            $headers = "From: no-reply@tuproyecto.com";

            // Intenta enviar el correo. Si falla, captura el error y devuelve un mensaje adecuado.
            if (@mail($email, $subject, $message, $headers)) {
                return ['success' => "Se ha enviado un enlace de recuperación a su correo electrónico."];
            } else {
                return ['error' => "No se pudo enviar el correo electrónico. Inténtelo más tarde."];
            }

        } else {
            return ['error' => "El correo no está registrado."];
        }
    } catch (PDOException $e) {
        return ['error' => "Error al recuperar la clave: " . $e->getMessage()];
    }
}

$response = [];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($datos['accion'])) {
        if ($datos['accion'] == 'iniciar_sesion') {
            $response = verificarUsuario($conexion, $datos['email'], $datos['password']);
        } elseif ($datos['accion'] == 'recuperar_clave') {
            $response = recuperarClave($conexion, $datos['email']);
        } else {
            $response = ['error' => 'Acción no válida'];
        }
    } else {
        $response = ['error' => 'Acción no especificada'];
    }
} else {
    $response = ['error' => 'Método de solicitud no permitido'];
}

// Asegúrate de que el JSON sea válido y la salida esté bien formateada
echo json_encode($response);
?>
