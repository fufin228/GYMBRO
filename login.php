<?php
session_start();

$servername = "localhost";
$username = "fufin228";  // Замените на ваш логин
$password = "0955433152aA";  // Замените на ваш пароль
$dbname = "fitness_GB";  // Название вашей базы данных

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Получаем данные из формы
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Проверка пользователя в базе
    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        // Проверка пароля
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['full_name'];
            echo "Login successful! Welcome, " . $_SESSION['username'];
        } else {
            echo "Invalid password!";
        }
    } else {
        echo "No user found with that email!";
    }
}

$conn->close();
?>
