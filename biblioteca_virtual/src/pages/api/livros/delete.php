
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");

require_once("../config/Database.php");

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"), true);
$stmt = $db->prepare("DELETE FROM livros WHERE id = ?");
$stmt->execute([$data['id']]);

echo json_encode(["message" => "Livro excluído com sucesso."]);
