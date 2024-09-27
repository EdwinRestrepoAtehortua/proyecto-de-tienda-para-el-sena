<?php
include('../../modelo/conexion.php');

// Asegurarse de que la variable $pdo está disponible globalmente
global $conexion;

function crearProducto($conexion, $nombre, $descripcion, $precio, $stock_producto, ) {
    try {
        $sql = "INSERT INTO productos (nombre, descripcion, precio, stock_producto) 
                VALUES (:nombre, :descripcion, :precio, :stock_producto)";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':descripcion', $descripcion);
        $stmt->bindParam(':precio', $precio);
        $stmt->bindParam(':stock_producto', $stock_producto);
        //$stmt->bindParam(':categoria_id_categoria', $categoria_id_categoria);
        $stmt->execute();
        echo "Producto creado correctamente";
    } catch (PDOException $e) {
        echo "Error al crear producto: " . $e->getMessage();
    }
}

function actualizarProducto($conexion, $id, $nombre, $descripcion, $precio, $stock_producto,) {
    try {
        $sql = "UPDATE productos SET nombre = :nombre, descripcion = :descripcion, precio = :precio, stock_producto = :stock_producto WHERE id_producto = :id";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':descripcion', $descripcion);
        $stmt->bindParam(':precio', $precio);
        $stmt->bindParam(':stock_producto', $stock_producto);
        //$stmt->bindParam(':categoria_id_categoria', $categoria_id_categoria);
        $stmt->execute();
        echo "Producto actualizado correctamente";
    } catch (PDOException $e) {
        echo "Error al actualizar producto: " . $e->getMessage();
    }
}

function eliminarProducto($conexion, $id) {
    try {
        $sql = "DELETE FROM productos WHERE id_producto = :id";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        echo "Producto eliminado correctamente";
    } catch (PDOException $e) {
        echo "Error al eliminar producto: " . $e->getMessage();
    }
}

function seleccionarProducto($conexion, $id) {
    try {
        $sql = "SELECT * FROM productos WHERE id_producto = :id";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        echo "Error al seleccionar producto: " . $e->getMessage();
    }
}


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['accion'])) {
        switch ($_POST['accion']) {
            case 'crear':
                crearProducto($conexion, $_POST['nombre'], $_POST['descripcion'], $_POST['precio'], $_POST['stock_producto']);
                break;
            case 'actualizar':
                actualizarProducto($conexion, $_POST['id_producto'], $_POST['nombre'], $_POST['descripcion'], $_POST['precio'], $_POST['stock_producto'],);
                break;
            case 'eliminar':
                eliminarProducto($conexion, $_POST['id_producto']);
                break;
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['accion']) && $_GET['accion'] == 'leer') {
        $producto = seleccionarProducto($conexion, $_GET['id_producto']);
        echo json_encode($producto);
    }
}
?>
