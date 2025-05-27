<?php
class LivroDAO {
    private $conn;
    private $tabela = "livros";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function listar() {
        $query = "SELECT * FROM " . $this->tabela;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function inserir($titulo, $autor, $ano, $isbn) {
        $query = "INSERT INTO " . $this->tabela . " (titulo, autor, ano_publicacao, isbn) VALUES (:titulo, :autor, :ano, :isbn)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":titulo", $titulo);
        $stmt->bindParam(":autor", $autor);
        $stmt->bindParam(":ano", $ano);
        $stmt->bindParam(":isbn", $isbn);
        return $stmt->execute();
    }
}