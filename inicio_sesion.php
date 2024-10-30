<?php
include 'conexion.php';  // Archivo de conexión a la base de datos

// Verificar si el formulario ha sido enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger los datos del formulario
    $email = $_POST['Email'];
    $contraseña = $_POST['Contraseña'];
    
    // Validar que no estén vacíos
    if (!empty($email) && !empty($contraseña)) {
        // Preparar la consulta para buscar el usuario por email
        $sql = "SELECT * FROM usuarios WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $resultado = $stmt->get_result();

        // Verificar si el email existe en la base de datos
        if ($resultado->num_rows > 0) {
            $usuario = $resultado->fetch_assoc();
            
            // Verificar si la contraseña es correcta
            if (password_verify($contraseña, $usuario['contraseña'])) {
                // Inicio de sesión exitoso
                session_start();
                $_SESSION['usuario'] = $usuario['usuario'];  // Guardar datos en la sesión
                header("Location: index.html");  // Redirigir a una página protegida
                exit();
            } else {
                echo "Contraseña incorrecta. Intenta de nuevo.";
            }
        } else {
            echo "El correo electrónico no está registrado.";
        }
    } else {
        echo "Por favor, rellena todos los campos.";
    }
}

// Cerrar la conexión
$conn->close();
?>
