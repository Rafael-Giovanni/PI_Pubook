
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");

require_once("../config/Database.php");

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"), true);
$stmt = $db->prepare("UPDATE livros SET titulo = ?, autor = ?, ano = ? WHERE id = ?");
$stmt->execute([$data['titulo'], $data['autor'], $data['ano'], $data['id']]);

echo json_encode(["message" => "Livro atualizado com sucesso."]);
