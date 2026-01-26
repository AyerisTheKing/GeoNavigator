<?php
require 'db.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"));

if (isset($data->username)) {
    $username = $conn->real_escape_string($data->username);

    // Get new stats
    $bestScore = isset($data->bestScore) ? (int) $data->bestScore : 0;
    $totalCorrect = isset($data->totalCorrect) ? (int) $data->totalCorrect : 0;
    $totalGames = isset($data->totalGames) ? (int) $data->totalGames : 0;
    $totalWrong = isset($data->totalWrong) ? (int) $data->totalWrong : 0;
    $totalTime = isset($data->totalTime) ? (int) $data->totalTime : 0;

    // Region stats - store as JSON string
    $regionStats = isset($data->regionStats) ? json_encode($data->regionStats) : '{}';
    $regionStats = $conn->real_escape_string($regionStats);

    // Check if user exists and get current stats
    $check = $conn->query("SELECT best_score FROM users WHERE username = '$username'");

    if ($check->num_rows > 0) {
        $row = $check->fetch_assoc();

        $currentBest = $row['best_score'];
        $finalBest = max($bestScore, $currentBest);

        $sql = "UPDATE users SET 
                best_score = $finalBest, 
                total_correct = $totalCorrect,
                total_games = $totalGames,
                total_wrong = $totalWrong,
                total_time = $totalTime,
                region_stats = '$regionStats'
                WHERE username = '$username'";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["success" => true]);
        } else {
            // Check for missing columns error?
            echo json_encode(["success" => false, "message" => $conn->error]);
        }
    } else {
        // User not found? Maybe register them implicitly?
        // `register` handles creation. `save_stats` should probably only update.
        echo json_encode(["success" => false, "message" => "User not found"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "No username provided"]);
}
$conn->close();
?>