<?php


require_once __DIR__ . '/BaseDao.class.php';

class ProfessorsDao extends BaseDao {
    public function __construct(){
        parent::__construct('professors');
    }
    
}