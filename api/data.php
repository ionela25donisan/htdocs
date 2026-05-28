<?php
header('Content-Type: application/json');
require_once __DIR__ . '/db.php';

$entity = $_GET['entity'] ?? $_POST['entity'] ?? '';
$action = $_GET['action'] ?? $_POST['action'] ?? '';
$allowedEntities = [
    'apartments' => ['address', 'area', 'rooms', 'status'],
    'tenants' => ['firstName', 'lastName', 'email', 'phone', 'apartment', 'status'],
    'contracts' => ['apartment', 'type', 'start', 'end'],
    'payments' => ['apartment', 'type', 'amount', 'date'],
    'maintenance' => ['apartment', 'description', 'date', 'priority', 'status', 'cost'],
];

if (!isset($allowedEntities[$entity])) {
    http_response_code(400);
    echo json_encode(['error' => 'Entitate invalidă']);
    exit;
}

if (!in_array($action, ['read', 'create', 'update', 'delete'], true)) {
    http_response_code(400);
    echo json_encode(['error' => 'Acțiune invalidă']);
    exit;
}

$fields = $allowedEntities[$entity];
$table = $entity;

if ($action === 'read') {
    $stmt = $pdo->query("SELECT * FROM `$table` ORDER BY id ASC");
    echo json_encode($stmt->fetchAll());
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    $input = $_POST;
}

$id = isset($input['id']) ? (int)$input['id'] : null;

if ($action === 'create') {
    $columns = [];
    $placeholders = [];
    $values = [];

    foreach ($fields as $field) {
        if (array_key_exists($field, $input)) {
            $columns[] = "`$field`";
            $placeholders[] = ':' . $field;
            $values[$field] = $input[$field];
        }
    }

    if (empty($columns)) {
        http_response_code(400);
        echo json_encode(['error' => 'Nu există date valide pentru inserare']);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO `$table` (" . implode(', ', $columns) . ") VALUES (" . implode(', ', $placeholders) . ")");
    $stmt->execute($values);
    echo json_encode(['id' => $pdo->lastInsertId()]);
    exit;
}

if ($action === 'update') {
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID necesar pentru update']);
        exit;
    }

    $set = [];
    $values = [];
    foreach ($fields as $field) {
        if (array_key_exists($field, $input)) {
            $set[] = "`$field` = :$field";
            $values[$field] = $input[$field];
        }
    }

    if (empty($set)) {
        http_response_code(400);
        echo json_encode(['error' => 'Nu există date valide pentru actualizare']);
        exit;
    }

    $values['id'] = $id;
    $stmt = $pdo->prepare("UPDATE `$table` SET " . implode(', ', $set) . " WHERE id = :id");
    $stmt->execute($values);
    echo json_encode(['updated' => true]);
    exit;
}

if ($action === 'delete') {
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID necesar pentru delete']);
        exit;
    }

    $stmt = $pdo->prepare("DELETE FROM `$table` WHERE id = :id");
    $stmt->execute(['id' => $id]);
    echo json_encode(['deleted' => true]);
    exit;
}
