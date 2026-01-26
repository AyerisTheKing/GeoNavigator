<?php
// Настройки подключения
$servername = "sql303.infinityfree.com"; // ВАШ MySQL Host Name
$username = "if0_40994479";              // ВАШ MySQL User Name
$password = "ayerisking";      // ВАШ Пароль
$dbname = "if0_40994479_geogator";       // ВАШ MySQL Database Name

// Создаем подключение
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверяем
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>