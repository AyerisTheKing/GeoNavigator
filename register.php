<?php
require 'db.php';
header('Content-Type: application/json');

// Получаем данные от JS
$data = json_decode(file_get_contents("php://input"));
$user = $conn->real_escape_string($data->username);
$pass = password_hash($data->password, PASSWORD_DEFAULT); // Хэшируем пароль

// Проверяем, есть ли такой ник
$check = $conn->query("SELECT id FROM users WHERE username = '$user'");

if ($check->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Этот никнейм уже занят"]);
} else {
    // Создаем пользователя
    $nick = isset($data->nickname) ? $conn->real_escape_string($data->nickname) : $user;
    $sql = "INSERT INTO users (username, password, nickname) VALUES ('$user', '$pass', '$nick')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Регистрация успешна! Теперь войдите."]);
    } else {
        echo json_encode(["success" => false, "message" => "Ошибка базы данных"]);
    }
}
$conn->close();
?>