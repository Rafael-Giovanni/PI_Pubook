<?php
// backend/classes/Conexao.php

class Conexao {
    private static $host = "localhost";
    private static $usuario = "root";
    private static $senha = "";
    private static $banco = "biblioteca_virtual";
    private static $pdo;

    public static function getConexao() {
        if (!isset(self::$pdo)) {
            try {
                self::$pdo = new PDO(
                    "mysql:host=" . self::$host . ";dbname=" . self::$banco . ";charset=utf8mb4",
                    self::$usuario,
                    self::$senha
                );
                self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                die(json_encode(["erro" => "Erro na conexão: " . $e->getMessage()]));
            }
        }
        return self::$pdo;
    }
}
