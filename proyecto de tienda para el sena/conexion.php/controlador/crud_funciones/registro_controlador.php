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

function correoExiste($conexion, $email) {
    try {
        $sql = "SELECT COUNT(*) FROM registro_usuario WHERE email = :email";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        return $stmt->fetchColumn() > 0;
    } catch (PDOException $e) {
        return array('error' => "Error al verificar el correo: " . $e->getMessage());
    }
}

function crearUsuario($conexion, $nombre, $apellidos, $email, $telefono, $password, $direccion, $foto) {
    if (correoExiste($conexion, $email)) {
        return array('error' => "El correo electrónico ya está registrado");
    }

    // Mover la foto al directorio deseado
    $fotoRuta = '';
    if ($foto && $foto['error'] === UPLOAD_ERR_OK) {
        $nombreArchivo = basename($foto['name']);
        $directorioDestino = __DIR__ . '/../../uploads/' . $nombreArchivo;

        // Crear el directorio si no existe
        if (!is_dir(dirname($directorioDestino))) {
            mkdir(dirname($directorioDestino), 0777, true);
        }

        // Verifica si el archivo se movió correctamente
        if (move_uploaded_file($foto['tmp_name'], $directorioDestino)) {
            $fotoRuta = $nombreArchivo; // Solo guarda el nombre del archivo en la base de datos
        } else {
            return array('error' => 'Error al subir la foto de perfil.');
        }
    }

    try {
        $sql = "INSERT INTO registro_usuario (nombre, apellidos, email, telefono, password, direccion, foto) 
                VALUES (:nombre, :apellidos, :email, :telefono, :password, :direccion, :foto)";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':apellidos', $apellidos);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':telefono', $telefono);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':direccion', $direccion);
        $stmt->bindParam(':foto', $fotoRuta);
        $stmt->execute();
        return array('success' => "Usuario creado correctamente");
    } catch (PDOException $e) {
        return array('error' => "Error al crear usuario: " . $e->getMessage());
    }
}

// Manejo de datos y archivos
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $accion = $_POST['accion'] ?? '';

    if ($accion === 'crear_usuario') {
        $nombre = $_POST['nombre'] ?? '';
        $apellidos = $_POST['apellidos'] ?? '';
        $email = $_POST['email'] ?? '';
        $telefono = $_POST['telefono'] ?? '';
        $password = $_POST['password'] ?? '';
        $direccion = $_POST['direccion'] ?? '';
        $foto = $_FILES['foto'] ?? null;

        // Debugging
        // var_dump($foto);

        $response = crearUsuario($conexion, $nombre, $apellidos, $email, $telefono, $password, $direccion, $foto);
    } else {
        $response = array('error' => 'Acción no reconocida');
    }
} else {
    $response = array('error' => 'Método de solicitud no válido');
}

echo json_encode($response);
?>
