<?php
require 'db.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"));
$user = $conn->real_escape_string($data->username);
$pass = $data->password;

$sql = "SELECT id, password, nickname, best_score, total_correct, total_games, total_wrong, total_time, region_stats FROM users WHERE username = '$user'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if (password_verify($pass, $row['password'])) {
        echo json_encode([
            "success" => true,
            "id" => $row['id'],
            "username" => $user,
            "nickname" => $row['nickname'] ?? $user,
            "stats" => [
                "bestScore" => $row['best_score'],
                "totalCorrect" => $row['total_correct'],
                "totalGames" => $row['total_games'],
                "totalWrong" => $row['total_wrong'],
                "totalTime" => $row['total_time'],
                "regionStats" => json_decode($row['region_stats'] ?? '{}')
            ]
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Неверный пароль"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Пользователь не найден"]);
}
$conn->close();
?>