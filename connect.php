<?php
$servername = "localhost";
$username = "root"; // если без пароля
$password = ""; 
$dbname = "fitness_gb"; // название твоей базы

// Создаем соединение
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверяем соединение
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}
?>
