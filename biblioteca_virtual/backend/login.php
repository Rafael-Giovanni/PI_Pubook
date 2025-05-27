<?php
// backend/login.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once __DIR__ . '/classes/Usuario.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!is_array($data) || !isset($data['email'], $data['password'])) {
    echo json_encode(["erro" => "Email ou senha não enviados."]);
    exit();
}

$usuario = new Usuario();
$resultado = $usuario->login($data['email'], $data['password']);

echo json_encode($resultado);
exit();
