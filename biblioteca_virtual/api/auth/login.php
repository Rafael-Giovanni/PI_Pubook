<?php
session_start();
require_once '../../config/db.php';

$dados = json_decode(file_get_contents("php://input"), true);

if (!isset($dados['email']) || !isset($dados['senha'])) {
    echo json_encode(['erro' => 'Email e senha são obrigatórios']);
    exit;
}

$db = (new Database())->conectar();
$stmt = $db->prepare("SELECT * FROM usuarios WHERE email = :email");
$stmt->bindParam(":email", $dados['email']);
$stmt->execute();

$usuario = $stmt->fetch(PDO::FETCH_ASSOC);

if ($usuario && password_verify($dados['senha'], $usuario['senha'])) {
    $_SESSION['usuario_id'] = $usuario['id'];
    echo json_encode(['mensagem' => 'Login realizado com sucesso']);
} else {
    http_response_code(401);
    echo json_encode(['erro' => 'Email ou senha inválidos']);
}