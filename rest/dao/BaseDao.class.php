<?php

require_once __DIR__ . "/../config.php";

class BaseDao {
    protected $connection;
    private $table;

    public function __construct($table) {
        $this->table = $table;
        try {
            $this->connection = new PDO(
                "mysql:host=" . DBHOST . ";dbname=" . DBNAME . ";port=" . DB_PORT,
                DBUSER,
                DBPASSWORD, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
                ]
            );
        } catch (PDOException $e){
            throw $e;
        }
    }

    function query($query, $params = []) {
        $stmt = $this->connection->prepare($query);
        $stmt->execute($params);
        return $stmt;
    }

    function get_all() {
        $stmt = $this->query("SELECT * FROM " . $this->table);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    function getById($id) {
        $stmt = $this->query("SELECT * FROM " . $this->table . " WHERE id = :id", ["id" => $id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function add($entity) {
        $query = "INSERT INTO " . $this->table . " (" ;
        foreach ($entity as $column => $value) {
            $query .= $column . ", ";
        }
        $query = substr($query, 0, -2);
        $query .= ") VALUES (";
        foreach ($entity as $column => $value) {
            $query .= ":" . $column . ", ";
        }
        $query = substr($query, 0, -2);
        $query .= ")";

        $stmt = $this->connection->prepare($query);
        $stmt->execute($entity); // sql injection prevention
        $entity['id'] = $this->connection->lastInsertId();
        return $entity;
    }

    public function delete($id) {
        $stmt = $this->connection->prepare("DELETE FROM " . $this->table . " WHERE id=:id");
        $stmt->bindParam(':id', $id); // SQL injection prevention
        $stmt->execute();
    }

    public function update($id, $entity, $id_column = "id") {
        $query = "UPDATE " . $this->table . " SET ";
        foreach ($entity as $column => $value) {
            $query .= $column . "= :" . $column . ", ";
        }
        $query = substr($query, 0, -2);
        $query .= " WHERE $id_column = :id";

        $stmt = $this->connection->prepare($query);
        $entity['id'] = $id;
        $stmt->execute($entity);
    }

    protected function query_unique($query, $params) {
        $results = $this->query($query, $params);
        return reset($results);
    }

}