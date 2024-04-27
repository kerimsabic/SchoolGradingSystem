<?php


require_once __DIR__ . '/BaseDao.class.php';

class StudentsDao extends BaseDao {
    public function __construct(){
        parent::__construct('students');
    }
    
}