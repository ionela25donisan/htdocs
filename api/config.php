<?php
// Configurație bază de date
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root'); // implicit în XAMPP
define('DB_PASSWORD', '');     // implicit în XAMPP
define('DB_NAME', 'apartment_management');

try {
    $pdo = new PDO("mysql:host=" . DB_SERVER . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USERNAME, DB_PASSWORD);
    // Setăm modul de eroare la excepție pentru debugging ușor
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    die("EROARE: Conexiunea nu a reușit. " . $e->getMessage());
}
?>