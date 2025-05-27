<?php
// backend/classes/Usuario.php

require_once __DIR__ . '/Conexao.php';

class Usuario {
    private $pdo;

    public function __construct() {
        $this->pdo = Conexao::getConexao();
    }

    public function cadastrar($nome, $sobrenome, $email, $senha) {
        // Validação de campos obrigatórios
        if (empty($nome) || empty($sobrenome) || empty($email) || empty($senha)) {
            return ["erro" => "Todos os campos são obrigatórios."];
        }

        // Limpa os dados
        $nome = htmlspecialchars(trim($nome));
        $sobrenome = htmlspecialchars(trim($sobrenome));
        $email = trim($email);

        // Validação de e-mail
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return ["erro" => "Email inválido."];
        }

        // Hash da senha
        $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

        // Verifica se o e-mail já está cadastrado
        $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM usuarios WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetchColumn() > 0) {
            return ["erro" => "Este e-mail já está cadastrado."];
        }

        try {
            $stmt = $this->pdo->prepare(
                "INSERT INTO usuarios (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)"
            );
            $stmt->execute([$nome, $sobrenome, $email, $senhaHash]);
            return ["sucesso" => true];
        } catch (PDOException $e) {
            return ["erro" => "Erro ao cadastrar: " . $e->getMessage()];
        }
    }

    public function login($email, $senha) {
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM usuarios WHERE email = ?");
            $stmt->execute([$email]);
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($usuario && password_verify($senha, $usuario['senha'])) {
                return [
                    "sucesso" => true,
                    "nome" => $usuario['nome'],
                    "email" => $usuario['email']
                ];
            } else {
                return ["erro" => "Email ou senha incorretos."];
            }
        } catch (PDOException $e) {
            return ["erro" => "Erro no servidor: " . $e->getMessage()];
        }
    }
}
