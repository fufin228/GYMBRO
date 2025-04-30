<?php
include 'connect.php';

$email = $_POST['email'];
$new_password = $_POST['new_password'];


$hashed_password = password_hash($new_password, PASSWORD_DEFAULT);


$check = $conn->prepare("SELECT id FROM users WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    
    $update = $conn->prepare("UPDATE users SET password = ? WHERE email = ?");
    $update->bind_param("ss", $hashed_password, $email);

    if ($update->execute()) {
        echo "Пароль успешно обновлён. <a href='index.html'>Войти</a>";
    } else {
        echo "Ошибка при обновлении пароля: " . $update->error;
    }
} else {
    echo "Пользователь с таким email не найден.";
}

$conn->close();
?>
