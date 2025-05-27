
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once("../config/Database.php");

$database = new Database();
$db = $database->getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $db->prepare("SELECT * FROM livros");
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $db->prepare("INSERT INTO livros (titulo, autor, ano) VALUES (?, ?, ?)");
    $stmt->execute([$data['titulo'], $data['autor'], $data['ano']]);
    echo json_encode(["message" => "Livro criado com sucesso."]);
}
