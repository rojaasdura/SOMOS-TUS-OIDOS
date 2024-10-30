<?php
include 'conexion.php';

// Verificar si el formulario ha sido enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger los datos del formulario
    $usuario = $_POST['Usuario'];
    $email = $_POST['Email'];
    $contraseña = $_POST['Contraseña'];
    
    // Validar que no estén vacíos
    if (!empty($usuario) && !empty($email) && !empty($contraseña)) {
        // Verificar si el email ya existe
        $sql_verificar = "SELECT * FROM usuarios WHERE email = '$email'";
        $resultado = $conn->query($sql_verificar);

        if ($resultado->num_rows > 0) {
            // Si el email ya está registrado
            echo "Este correo electrónico ya está registrado. Por favor, usa uno diferente.";
        } else {
            // Encriptar la contraseña
            $contraseña_encriptada = password_hash($contraseña, PASSWORD_DEFAULT);
            
            // Insertar los datos en la base de datos
            $sql_insertar = "INSERT INTO usuarios (usuario, email, contraseña) VALUES ('$usuario', '$email', '$contraseña_encriptada')";
            
            if ($conn->query($sql_insertar) === TRUE) {
                header("Location: inicio.html");  // Redirigir si el registro es exitoso
                exit();  // Salir después de redirigir
            } else {
                echo "Error al registrar: " . $conn->error;
            }
        }
    } else {
        echo "Por favor, rellena todos los campos.";
    }
}

// Cerrar la conexión
$conn->close();
?>
