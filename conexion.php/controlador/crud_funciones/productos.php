<?php
header("Access-Control-Allow-Origin: *"); // Permite solicitudes desde cualquier origen
header("Access-Control-Allow-Methods: GET"); // Permite solo métodos GET
header("Access-Control-Allow-Headers: Content-Type"); // Permite encabezados de tipo Content-Type
header("Content-Type: application/json"); // Especifica el tipo de contenido

try {
    $conexion = new PDO("mysql:host=localhost;dbname=market_online", "root", "");
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $stmt = $conexion->prepare("SELECT * FROM productos");
        $stmt->execute();
        $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($productos);
    } else {
        http_response_code(405); // Método no permitido
        echo json_encode(["error" => "Method not allowed"]);
    }

} catch (PDOException $e) {
    http_response_code(500); // Error interno del servidor
    echo json_encode(["error" => $e->getMessage()]);
}
?>
