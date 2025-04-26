<?php
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
    $full_name = $_POST['full_name'];
    $phone_number = $_POST['phone_number'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Хэшируем пароль

    // Проверка на существующего пользователя
    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo "Email already registered!";
    } else {
        // Вставляем данные в таблицу users
        $sql = "INSERT INTO users (full_name, phone_number, email, password) VALUES ('$full_name', '$phone_number', '$email', '$password')";
        
        if ($conn->query($sql) === TRUE) {
            echo "Registration successful!";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
}

$conn->close();
?>
