<?php
header('Content-Type: application/json');

try {
    $conexion = new PDO("mysql:host=localhost;dbname=tienda_online", "root", "");

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $data = json_decode(file_get_contents("php://input"));
        $id_producto = $data->id_producto;
        $id_usuario = $data->id_usuario; // El ID del usuario que añade el producto al carrito
        $cantidad = $data->cantidad;

        // Crear carrito si no existe
        $stmt = $conexion->prepare("SELECT id_carrito FROM carrito_de_compras WHERE usuario_id_usuario = ?");
        $stmt->execute([$id_usuario]);
        $carrito = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$carrito) {
            $stmt = $conexion->prepare("INSERT INTO carrito_de_compras (usuario_id_usuario) VALUES (?)");
            $stmt->execute([$id_usuario]);
            $carrito_id = $conexion->lastInsertId();
        } else {
            $carrito_id = $carrito['id_carrito'];
        }

        // Añadir producto al carrito
        $stmt = $conexion->prepare("INSERT INTO producto_has_carritodecompras (id_producto, id_carrito, cantidad) VALUES (?, ?, ?)
                                    ON DUPLICATE KEY UPDATE cantidad = cantidad + VALUES(cantidad)");
        $stmt->execute([$id_producto, $carrito_id, $cantidad]);

        echo json_encode(["success" => true]);
    }

} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
