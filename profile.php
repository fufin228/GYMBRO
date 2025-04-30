<?php
session_start();
require 'db_connect.php'; 

if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}

$user_id = $_SESSION['user_id'];

$user = $db->prepare("SELECT * FROM users WHERE id = ?");
$user->execute([$user_id]);
$user = $user->fetch();

$profile = $db->prepare("SELECT * FROM user_profiles WHERE user_id = ?");
$profile->execute([$user_id]);
$profile = $profile->fetch();


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $age = isset($_POST['age']) ? (int)$_POST['age'] : 0;
    $height = isset($_POST['height']) ? (float)$_POST['height'] : 0;
    $weight = isset($_POST['weight']) ? (float)$_POST['weight'] : 0;
    $gender = isset($_POST['gender']) ? $_POST['gender'] : 'other';
    $fitness_level = isset($_POST['fitness_level']) ? $_POST['fitness_level'] : 'beginner';
    $equipment = isset($_POST['equipment']) ? $_POST['equipment'] : '';
    $max_bench_press = isset($_POST['max_bench_press']) ? (int)$_POST['max_bench_press'] : NULL;
    $max_squat = isset($_POST['max_squat']) ? (int)$_POST['max_squat'] : NULL;
    $max_deadlift = isset($_POST['max_deadlift']) ? (int)$_POST['max_deadlift'] : NULL;
    $training_goal = isset($_POST['training_goal']) ? $_POST['training_goal'] : 'maintenance';
    $flexibility_level = isset($_POST['flexibility_level']) ? $_POST['flexibility_level'] : 'beginner';
    
    if ($profile) {
        $stmt = $db->prepare("UPDATE user_profiles SET age = ?, height = ?, weight = ?, gender = ?, fitness_level = ?, equipment = ?, `max_bench_press` = ?, `max_squat` = ?, `max_deadlift` = ?, training_goal = ?, flexibility_level = ? WHERE user_id = ?");
        $stmt->execute([$age, $height, $weight, $gender, $fitness_level, $equipment, $max_bench_press, $max_squat, $max_deadlift, $training_goal, $flexibility_level, $user_id]);
    } else {
        $stmt = $db->prepare("INSERT INTO user_profiles (user_id, age, height, weight, gender, equipment, `max_bench_press`, `max_squat`, `max_deadlift`, training_goal, flexibility_level) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$user_id, $age, $height, $weight, $gender, $equipment, $max_bench_press, $max_squat, $max_deadlift, $training_goal, $flexibility_level]);
    }
    
if (!empty($_FILES['avatar']['name'])) {
    $upload_dir = 'uploads/';
    
    if (!file_exists($upload_dir)) {
        mkdir($upload_dir, 0755, true);
    }

    $avatar_name = uniqid() . '_' . preg_replace('/[^a-zA-Z0-9\._\-]/', '', $_FILES['avatar']['name']);
    $target_file = $upload_dir . $avatar_name;

    $allowed_types = ['image/jpeg', 'image/png', 'image/gif'];
    if (!in_array($_FILES['avatar']['type'], $allowed_types)) {
        die('Ошибка: Можно загружать только JPG, PNG или GIF.');
    }

    if (move_uploaded_file($_FILES['avatar']['tmp_name'], $target_file)) {
        $stmt = $db->prepare("UPDATE users SET avatar = ? WHERE id = ?");
        $stmt->execute([$avatar_name, $user_id]);
        
        $user['avatar'] = $avatar_name;
        echo '<div class="alert alert-success">Аватар обновлён!</div>';
    } else {
        echo '<div class="alert alert-danger">Ошибка загрузки файла.</div>';
    }
}
    
    header("Location: profile.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Мой профиль</title>
    <link href="font.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Lobster&family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto:wght@400&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Signika+Negative:wght@300..700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Signika+Negative:wght@300..700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Agdasima:wght@400;700&family=Bebas+Neue&family=Signika+Negative:wght@300..700&display=swap" rel="stylesheet">
    <link rel="icon" href="jpg/favicon.PNG">
    <style>
        
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #111111;
}
        .profile-container { 
            max-width: 800px;
            margin: 30px auto;
            margin-top: 5%;
            box-shadow: rgb(255, 255, 255);
        }
        .profile-card { border-radius: 15px; box-shadow: 0 4px 6px rgb(31, 157, 171); }
        .avatar { width: 150px; height: 150px; object-fit: cover; border: 5px solid white; }
        .workout-card { transition: transform 0.3s; }
        .workout-card:hover { transform: translateY(-5px); }
        


/* Навигация */
nav {
    background-color: #111111;
    padding: 10px;
    font: 1.2rem "Robot", sans-serif;
    text-align: right;
    display: flex;
    justify-content: space-between;
    align-items: center; 
    position: fixed;
    top: 0;
    left: 0;
    width: 100%; 
    background-color: #111111; 
    z-index: 1000; 
    padding: 10px;   
}

.nav-text h1 {
    color: #f1ecec;
    font: 1.2rem "Nitro", sans-serif;
    margin: 0;    
    font-size: 28px;
}

.colortext { 
    color: rgb(17, 133, 148);
}


.nav-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 15px;
}

.nav-links li {
    display: inline;
    margin: 0 15px;
}

.nav-links a {
    color: #ffffff;
    margin-right: 30px;
    text-decoration: none;
    font-size: 15px;
    transition: 0.3s;  
    position: relative;
}

.nav-links a:hover {    
    
    color: #00fff0; 
   text-shadow: 0 0 20px #00fff0, 0 0 30px #00fff0, 0 0 40px #00fff0; 
}

.nav-links a::after {
    content: '';
    bottom: -10px;
    height: 0px;
    width: 10px;
    left: 50%;
    position: absolute;
    background-color: #01fefe;
    border-radius: 50%;
    transition: all 300ms;
}

.nav-links a:hover::after {
    height: 10px;
    left: 50%;
    transform: translateX(-50%);
}

.workout-card {
    background: #1e1e1e;
    color: #fff;
    border: 1px solid #333;
}
.workout-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
}
.badge {
    background: #0dcaf0 !important;
}
    </style>
</head>
<body>
<header>
        <nav>
            <ul class="nav-text">
                <div>
                    
                    
                    <h1>
                        <a href="home2.html" style="color: #f1ecec; text-decoration: none;">
                            GYM<span class="colortext"> BRO</span>
                        </a>
                    </h1>
                </div>
            </ul>
    
            
            <ul class="nav-links"> 
                <li><a href="home2.html">HOME</a></li>
                <li><a href="programs.html">PROGRAMS</a></li>
                <li><a href="about.html">ABOUT US</a></li>
                <li><a href="profile.php">PROFILE</a></li>   
            </ul>
    
            
        </nav>
    </header>
    <div class="container profile-container">
        <div class="card profile-card mb-4">
            <div class="card-body">
                <div class="d-flex align-items-center mb-4">
                    <img src="<?= !empty($user['avatar']) ? 'uploads/' . htmlspecialchars($user['avatar']) : 'https://via.placeholder.com/150' ?>" 
                         class="avatar rounded-circle me-4">
                    <div>
                        <h2 class="mb-1"><?= htmlspecialchars($user['full_name']) ?></h2>
                        <p class="text-muted"><?= htmlspecialchars($user['email']) ?></p>
                    </div>
                </div>

                <form method="POST" enctype="multipart/form-data">
    <div class="row">
        

    
        <div class="col-md-6">
            <div class="mb-3">
                <label class="form-label">Аватар</label>
                <input type="file" class="form-control" name="avatar" accept="image/*">
            </div>

            <div class="mb-3">
                <label class="form-label">Возраст</label>
                <input type="number" class="form-control" name="age" value="<?= $profile['age'] ?? '' ?>">
            </div>
            
            <div class="mb-3">
                <label class="form-label">Пол</label>
                <select class="form-control" name="gender">
                    <option value="male" <?= isset($profile['gender']) && $profile['gender'] == 'male' ? 'selected' : '' ?>>Мужской</option>
                    <option value="female" <?= isset($profile['gender']) && $profile['gender'] == 'female' ? 'selected' : '' ?>>Женский</option>
                    <option value="other" <?= isset($profile['gender']) && $profile['gender'] == 'other' ? 'selected' : '' ?>>Другой</option>
                </select>
            </div>
            <div class="mb-3">
                <label class="form-label">Рост (см)</label>
                <input type="number" step="0.1" class="form-control" name="height" value="<?= $profile['height'] ?? '' ?>">
            </div>

            <div class="mb-3">
                <label class="form-label">Вес (кг)</label>
                <input type="number" step="0.1" class="form-control" name="weight" value="<?= $profile['weight'] ?? '' ?>">
            </div>

            <div class="mb-3">
                <label class="form-label">Уровень подготовки</label>
                <select class="form-control" name="fitness_level">
                    <option value="beginner" <?= isset($profile['fitness_level']) && $profile['fitness_level'] == 'beginner' ? 'selected' : '' ?>>Начальный</option>
                    <option value="intermediate" <?= isset($profile['fitness_level']) && $profile['fitness_level'] == 'intermediate' ? 'selected' : '' ?>>Средний</option>
                    <option value="advanced" <?= isset($profile['fitness_level']) && $profile['fitness_level'] == 'advanced' ? 'selected' : '' ?>>Продвинутый</option>
                </select>
            </div>
        </div>

        



        <div class="col-md-6">

            <div class="mb-3">
                <label class="form-label">Оборудование</label>
                <input type="text" class="form-control" name="equipment" value="<?= $profile['equipment'] ?? '' ?>">
            </div>

            <div class="mb-3">
                <label class="form-label">Максимальный присед (кг)</label>
                <input type="number" class="form-control" name="max_squat" value="<?= $profile['max_squat'] ?? '' ?>">
            </div>
            
            <div class="mb-3">
                <label class="form-label">Максимальный становая тяга (кг)</label>
                <input type="number" class="form-control" name="max_deadlift" value="<?= $profile['max_deadlift'] ?? '' ?>">
            </div>
            
            <div class="mb-3">
                <label class="form-label">Цель тренировки</label>
                <select class="form-control" name="training_goal">
                    <option value="fat_loss" <?= ($profile['training_goal'] === 'fat_loss') ? 'selected' : '' ?>>Похудение</option>
                    <option value="muscle_gain" <?= ($profile['training_goal'] === 'muscle_gain') ? 'selected' : '' ?>>Увеличение массы</option>
                    <option value="maintenance" <?= ($profile['training_goal'] === 'maintenance') ? 'selected' : '' ?>>Поддержание формы</option>
                </select>
            </div>

            <div class="mb-3">
                <label class="form-label">Уровень гибкости</label>
                <select class="form-control" name="flexibility_level">
                    <option value="beginner" <?= ($profile['flexibility_level'] === 'beginner') ? 'selected' : '' ?>>Новичок</option>
                    <option value="intermediate" <?= ($profile['flexibility_level'] === 'intermediate') ? 'selected' : '' ?>>Средний</option>
                    <option value="advanced" <?= ($profile['flexibility_level'] === 'advanced') ? 'selected' : '' ?>>Продвинутый</option>
                </select>
            </div>
        </div>
    </div>

    <div class="mt-3">
        <button type="submit" class="btn btn-primary">Сохранить изменения</button>
        <a href="logout.php" class="btn btn-outline-danger ms-2">Выйти</a>
    </div>
</form>


            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>