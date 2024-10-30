<?php
$servername = "localhost";
$username = "root";  // Cambia por tu usuario de base de datos
$password = "";  // Cambia por tu contraseña de base de datos
$dbname = "somos_tus_odios";

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
