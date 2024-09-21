<?php
// Conectar a la base de datos
$mysqli = new mysqli("localhost", "usuario", "contraseña", "base_de_datos");

if ($mysqli->connect_error) {
    die("Error de conexión: " . $mysqli->connect_error);
}

// Obtener datos del formulario
$nombre = $_POST['nombre'];
$descripcion = $_POST['descripcion'];

// Verificar si el nombre ya existe
$result = $mysqli->query("SELECT * FROM productos WHERE nombre = '$nombre'");
if ($result->num_rows > 0) {
    http_response_code(400);
    echo "El nombre ya está en uso.";
    exit();
}

// Guardar producto en la base de datos
$stmt = $mysqli->prepare("INSERT INTO productos (nombre, descripcion) VALUES (?, ?)");
$stmt->bind_param("ss", $nombre, $descripcion);
$stmt->execute();

// Guardar las imágenes (se recomienda implementar la lógica adecuada aquí)

// Cerrar conexión
$stmt->close();
$mysqli->close();

echo "Producto agregado con éxito.";
?>

