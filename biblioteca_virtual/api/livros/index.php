<?php
require_once '../auth/protect.php'; // Protege a API
require_once '../../config/db.php';
require_once '../../dao/LivroDAO.php';

$db = (new Database())->conectar();
$dao = new LivroDAO($db);

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $dao->listar();
    $livros = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($livros);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $dados = json_decode(file_get_contents("php://input"), true);

    if (!isset($dados['titulo'], $dados['autor'], $dados['ano'], $dados['isbn'])) {
        echo json_encode(['erro' => 'Dados incompletos']);
        exit;
    }

    $dao->inserir($dados['titulo'], $dados['autor'], $dados['ano'], $dados['isbn']);
    echo json_encode(['mensagem' => 'Livro inserido com sucesso']);
}